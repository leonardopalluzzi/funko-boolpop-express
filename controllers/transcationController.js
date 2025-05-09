const connection = require('../db/db')
const stripe = require('stripe')('sk_test_...');


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

    console.log(req.body);

    const { products_info, username, useremail, amount, status, stripe_payment_id, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap } = req.body

    //rotta per creare con stripe l'intent della transazione, salvare nel db l'intent e restituire la secret alla front
    // salvo in db il payment intent
    const saveIntentSql = `INSERT INTO transactions (username, useremail, amount, status, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const recoverProdIdSql = 'SELECT products.id FROM products WHERE products.slug = ?'

    const updatePivotSql = 'INSERT INTO product_transaction (product_id, transaction_id, quantity) VALUES (?, ?, ?)'

    const values = [username, useremail, amount, status, created_at, user_last_name, city, province, nation, street, civic, cap, billing_city, billing_province, billing_nation, billing_street, billing_civic, billing_cap]

    connection.query(saveIntentSql, values, (err, results) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });

        const transactionId = results.insertId
        const prodIds = products_info.map(item => {
            return new Promise((resolve, reject) => {
                if (err) return reject(err)
                connection.query(recoverProdIdSql, [item.item_slug], (err, prodId) => {
                    if (err) return res.status(500).json({ state: 'error', message: err.message });
                    const prod = {
                        product_id: prodId[0],
                        product_quantity: item.item_quantity
                    }
                    resolve(prod)
                })
            })
        })

        //aggiornare pivot
        Promise.all(prodIds)
            .then(prodIds => {

                console.log(prodIds);
                prodIds.forEach(item => {
                    connection.query(updatePivotSql, [item.product_id.id, transactionId, item.product_quantity], (err, results) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });
                        console.log(results);
                    })
                })
            })
    })

    //recupero e definisco i dati necessari alla transaction intent
    const metadata = {
        promotion: req.body.cupon || '',
    }

    const currency = 'eur'

    //creo payment intent
    const paymentIntent = stripe.paymentIntent.create({
        amount,
        currency,
        metadata,
    })

}

function payment(req, res) {
    // rotta per ricevere il webhook di stripe e l'esito della transazione e aggiornare la righa del db

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