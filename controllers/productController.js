const connection = require('../db/db')


function index(req, res) {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const offset = (page - 1) * limit

    const productSql = 'SELECT * FROM products LIMIT ? OFFSET ?'

    connection.query(productSql, [limit, offset], (err, products) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        const productsList = products

        const productListToSend = productsList.map(product => {
            return itemToSend = {
                slug: product.slug,
                name: product.name,
                price: product.price,
                description: product.description,
                created_at: product.created_at,
                item_number: product.item_number,
                quantity: product.quantity,
            }
        })

        res.json(productListToSend)
    })
}

function show(req, res) {

    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const transactionsSql = 'SELECT * FROM transactions WHERE transactions.product_id = ?'
    const categorySql = 'SELECT * FROM categories WHERE categories.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'

}

function store(req, res) {

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
    update,
    modify,
    destroy
}