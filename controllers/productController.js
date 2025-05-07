const connection = require('../db/db')


function index(req, res) {

    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const offset = (page - 1) * limit

    const productSql = 'SELECT * FROM products LIMIT ? OFFSET ?'
    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const transactionsSql = 'SELECT * FROM transactions WHERE transactions.product_id = ?'
    const categorySql = 'SELECT * FROM categories WHERE categories.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'

    connection.query(productSql, [limit, offset], (err, product) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        const basicProduct = product[0]

        connection.query(imagesSql, [basicProduct.id], (err, images) => {
            if (err) return res.status(500).json({ state: 'error', message: err.message });
            basicProduct.images = images

            connection.query(transactionsSql, [basicProduct.id], (err, transactions) => {
                if (err) return res.status(500).json({ state: 'error', message: err.message });
                basicProduct.tranactions = transactions

                connection.query(categorySql, [basicProduct.categories_id], (err, category) => {
                    if (err) return res.status(500).json({ state: 'error', message: err.message });
                    basicProduct.categories = category[0]

                    connection.query(licenseSql, [basicProduct.licenses_id], (err, license) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });
                        basicProduct.license = license[0]

                        connection.query(promotionSql, [basicProduct.promotions_id], (err, promotion) => {
                            if (err) return res.status(500).json({ state: 'error', message: err.message });
                            basicProduct.promotion = promotion[0]

                            res.json(basicProduct)
                        })
                    })
                })
            })


        })


    })

}

function show(req, res) {

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