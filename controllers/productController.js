const connection = require('../db/db')
const { connect } = require('../routers/productRouter')


function index(req, res) {


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const offset = (page - 1) * limit

    const productSql = 'SELECT * FROM products LIMIT ? OFFSET ?'
    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'

    connection.query(productSql, [limit, offset], (err, products) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        const productList = products

        const productListToSend = (productList.map(product => {
            return new Promise((resolve, reject) => {
                if (err) return reject(err);

                connection.query(imagesSql, [product.id], (err, images) => {
                    if (err) return res.status(500).json({ state: 'error', message: err.message });

                    const itemToSend = {
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        created_at: product.created_at,
                        item_number: product.item_number,
                        quantity: product.quantity,
                        images: images
                    }
                    resolve(itemToSend)
                })
            })
        }))

        Promise.all(productListToSend)
            .then(productListToSend => {
                res.json(productListToSend)
            })
            .catch(err => res.status(500).json({ state: 'error', message: err.message }))
    });
}

function show(req, res) {

    const slug = req.params.slug

    const productSql = 'SELECT * FROM products WHERE products.slug = ?'
    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const transactionsSql = 'SELECT * FROM transactions WHERE transactions.product_id = ?'
    const categorySql = 'SELECT * FROM categories WHERE categories.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'
    const attirbuteSql = 'SELECT * FROM attributes JOIN product_attribute ON attributes.id = product_attribute.attributes_id WHERE product_attribute.products_id = ?'

    connection.query(productSql, [slug], (err, product) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        const productToSend = {
            slug: product[0].slug,
            name: product[0].name,
            price: product[0].price,
            description: product[0].description,
            created_at: product[0].created_at,
            item_number: product[0].item_number,
            quantity: product[0].quantity,
        }

        const pId = product[0].id

        connection.query(imagesSql, [pId], (err, images) => {
            if (err) return res.status(500).json({ state: 'error', message: err.message });
            productToSend.images = images

            connection.query(transactionsSql, [pId], (err, transactions) => {
                if (err) return res.status(500).json({ state: 'error', message: err.message });
                productToSend.transactions = transactions

                connection.query(categorySql, [product[0].categories_id], (err, category) => {
                    if (err) return res.status(500).json({ state: 'error', message: err.message });

                    if (category.length > 0) {
                        productToSend.category = category[0].name
                    } else {
                        productToSend.category = []
                    }

                    connection.query(licenseSql, [product[0].licenses_id], (err, license) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });

                        if (category.length > 0) {
                            productToSend.license = license[0].name
                        } else {
                            productToSend.license = []
                        }

                        connection.query(promotionSql, [product[0].promotions_id], (err, promotion) => {
                            if (err) return res.status(500).json({ state: 'error', message: err.message });
                            productToSend.promotion = promotion

                            connection.query(attirbuteSql, [pId], (err, attributes) => {
                                if (err) return res.status(500).json({ state: 'error', message: err.message });
                                productToSend.attributes = attributes

                                res.json(productToSend)
                            })
                        })
                    })
                })
            })
        })
    })

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