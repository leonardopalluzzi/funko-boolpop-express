const connection = require('../db/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
const endpointSecret = process.env.WEB_HOOK_SECRET;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {

    const cart = req.body.cart


    //calcolo amount
    let total = 0;

    const priceArr = cart.map(item => {

        const basePrice = Number(item.price)
        const discount = Array.isArray(item.promotion) && item.promotion.length > 0 ? Number(item.promotion[0].discount) : 100
        const quantity = Number(item.cartQuantity)

        let price = (basePrice * discount / 100) * quantity;

        console.log(price);

        return Number(price)
    })

    priceArr.forEach(item => {
        total = total + item
    })


    function getCurrentMySQLDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mesi da 0 a 11
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const currentDate = getCurrentMySQLDateTime()
    req.body.created_at = currentDate

    const { products_info, username, useremail, amount, status, stripe_payment_id, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap } = req.body

    if (!useremail) return res.status(400).json({ state: 'error', message: 'email required' });
    if (amount.toFixed(2) !== total.toFixed(2)) return res.status(400).json({ state: 'error', message: 'error in defining amount' })


    const values = [username, useremail, amount, status, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap]


    const saveIntentSql = `INSERT INTO transactions (username, useremail, amount, status, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const recoverProdIdSql = 'SELECT products.id FROM products WHERE products.slug = ?'
    const updatePivotSql = 'INSERT INTO product_transaction (product_id, transaction_id, quantity) VALUES (?, ?, ?)'

    connection.query(saveIntentSql, values, (err, results) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        const transactionId = results.insertId

        //recupero i product id dallo slug
        const prodIds = products_info.map(item => {
            return new Promise((resolve, reject) => {
                connection.query(recoverProdIdSql, [item.item_slug], (err, prodId) => {
                    if (err) return reject(err);
                    if (!prodId.length) return reject(new Error(`Prodotto non trovato: ${item.item_slug}`));
                    resolve(
                        {
                            product_id: prodId[0],
                            product_quantity: item.item_quantity
                        }
                    )
                })
            })
        })

        //aggiornare pivot
        Promise.all(prodIds)
            .then(products => {

                products.forEach(item => {
                    connection.query(updatePivotSql, [item.product_id.id, transactionId, item.product_quantity], (err, results) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });
                    })
                })
                return products
            })
            .then(prodIds => {
                const orderInfoData = [...prodIds]
                return orderInfoData
            })
            .then((orderInfoData) => {
                //creo payment intent
                return stripe.paymentIntents.create({
                    amount: Math.round(total * 100),
                    currency: 'eur',
                    receipt_email: useremail,
                    metadata: {
                        orderInfo: JSON.stringify(orderInfoData),
                        transaction_id: transactionId,
                        email: useremail,
                        usefirst_name: username,
                        amount: amount,
                        shipping: 10
                    },
                })

            })
            //aggiorno i campi della transazione
            .then(paymentIntent => {

                const updateSql = 'UPDATE transactions SET stripe_payment_id = ?, status = ? WHERE transactions.id = ?'
                const values = [paymentIntent.id, paymentIntent.status, transactionId]
                connection.query(updateSql, values, (err, results) => {
                    if (err) return res.status(500).json({ state: 'error', message: err.message });
                    console.log(results);
                })
                return paymentIntent
            })
            .then(paymentIntent => {

                res.json({ clientSecret: paymentIntent.client_secret })
            })
            .catch(err => res.status(500).json({ state: 'error', message: err.message }))
    })
}

function payment(req, res) {
    // rotta per ricevere il webhook di stripe e l'esito della transazione e aggiornare la righa del db
    const sig = req.headers['stripe-signature']
    console.log('log inizio rotta payment');


    let event


    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
        console.error(`webhook error: ${err.message}`)
        return res.status(400).json({ state: 'error', message: err.message })
    }

    if (event.type === 'payment_intent.succeeded') {

        console.log('ciao chicco');

        const paymentIntent = event.data.object;
        console.log('payment intent ciao:' + JSON.stringify(paymentIntent));

        const orderInfo = JSON.parse(paymentIntent.metadata.orderInfo);

        console.log('orderinfo ciao:' + JSON.stringify(orderInfo));


        const pIds = orderInfo.map(item => item)

        console.log('log di pids' + JSON.stringify(pIds));


        //aggiornare db
        const updateDbSql = 'UPDATE transactions SET status = ? WHERE transactions.stripe_payment_id = ?'
        const updateQuantitySql = 'UPDATE products SET quantity = quantity - ? WHERE products.id = ?'
        pIds.forEach(item => {
            console.log(item.product_quantity);

            connection.query(updateQuantitySql, [item.product_quantity, item.product_id.id], (err, results) => {
                if (err) return res.status(500).json({ state: 'error', message: err.message })

            })
        })


        connection.query(updateDbSql, ['succeeded', paymentIntent.id], (err, results) => {
            if (err) return res.satatus(500).json({ state: 'error', message: err.message });

            res.status(200).json(results)



        })

        const htmlItems = pIds.map(item => {
            return `<p>Prodotto: ${item.product_id}, Quantità: ${item.product_quantity}</p>`;
        }).join('');


        const msg = {
            to: paymentIntent.metadata.useremail, // Change to your recipient
            from: 'lp.palluzzi@gmail.com', // Change to your verified sender
            subject: 'You purchase is confirmed',
            templateId: 'd-185cf24d10d445ef961b4729ac77f8f0',
            dynamicTemplateData: {
                first_name: paymentIntent.metadata.username,
                email: paymentIntent.metadata.useremail,
                amount: paymentIntent.metadata.amount,
                shipping: paymentIntent.metadata.shipping
            }
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        const msgSeller = {
            to: 'lp.palluzzi@gmail.com', // Change to your recipient
            from: 'lp.palluzzi@gmail.com', // Change to your verified sender
            subject: `New purchase by ${paymentIntent.metadata.username}`,
            templateId: 'd-22cafe66b217464f90a5c2c2a33594ce',
            dynamicTemplateData: {
                cart: htmlItems,
                first_name: paymentIntent.metadata.username,
                email: paymentIntent.metadata.useremail,
                amount: paymentIntent.metadata.amount,
                shipping: paymentIntent.metadata.shipping
            }
        }
        sgMail
            .send(msgSeller)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function update(req, res) {

}

function modify(req, res) {

}

function destroy(req, res) {

}

module.exports = {
    index,
    show,
    store,
    payment,
    update,
    modify,
    destroy
}