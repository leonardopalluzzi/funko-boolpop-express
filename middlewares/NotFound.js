const connection = require('../db/db')

function error_404(req, res, next) {
    const slug = req.params.slug

    const productSql = 'SELECT * FROM products WHERE products.slug = ?'

    connection.query(productSql, [slug], (err, product) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });

        if (product.length === 0) {
            return res.json({
                error: '404 Not Found',
                message: 'Product Not Found'
            })
        } else {
            next()
        }
    })
}

module.exports = error_404