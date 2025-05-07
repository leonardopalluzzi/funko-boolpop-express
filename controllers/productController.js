const connection = require('../db/db')


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

        console.log(productListToSend);

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