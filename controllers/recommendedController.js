const connection = require('../db/db');


function index(req, res) {
    const slug = req.query.slug
    const limit = Number(req.query.limit) || 4;


    const getAttributesSql = `
        SELECT a.id
        FROM attributes a
        JOIN product_attribute pa ON a.id = pa.attributes_id
        JOIN products p ON pa.products_id = p.id
        WHERE p.slug LIKE ?
        `;

    connection.query(getAttributesSql, [slug], (err, results) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });
        if (!results.length) return res.json({ recommended: [] });
        const attrIds = results.map(a => a.id);

        const recommendedSql = `
            SELECT DISTINCT p.*
            FROM products p
            JOIN product_attribute pa ON pa.products_id = p.id
            WHERE pa.attributes_id IN (${attrIds.map(() => '?').join(',')})
              AND p.slug != ?
            LIMIT ?
        `;

        connection.query(recommendedSql, [...attrIds, slug, limit], (err, products) => {
            if (err) return res.status(500).json({ state: 'error', message: err.message });
            if (products.length === 0) {
                return res.status(200).json({ state: 'empty', recommended: products })
            } else {
                return res.json({ state: 'success', recommended: products });

            }
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