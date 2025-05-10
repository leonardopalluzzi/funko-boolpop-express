const connection = require('../db/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);
const endpointSecret = process.env.WEB_HOOK_SECRET;


function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {


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

                console.log(products);
                products.forEach(item => {
                    connection.query(updatePivotSql, [item.product_id.id, transactionId, item.product_quantity], (err, results) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });
                        console.log(results);
                    })
                })
            })
            .then(() => {
                //creo payment intent
                return stripe.paymentIntents.create({
                    amount: Math.round(amount * 100),
                    currency: 'eur',
                    metadata: {
                        transaction_id: transactionId,
                        email: useremail
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

    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
        console.error(`webhook error: ${err.message}`)
        return res.status(400).json({ state: 'error', message: err.message })
    }

    if (event.type === 'payment_intent.succeeded') {
        console.log('pagamento riuscito:', paymentIntent.id)
    }

    res.json({ received: true })


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