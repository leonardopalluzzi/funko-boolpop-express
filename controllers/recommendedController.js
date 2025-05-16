const connection = require('../db/db');


function index(req, res) {
    const slug = req.query.slug
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;


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

        const countSql = `
                SELECT COUNT(*) AS total
                FROM (
                    SELECT p.id
                    FROM products p
                    JOIN categories c ON p.categories_id = c.id
                    LEFT JOIN product_transaction pt ON pt.product_id = p.id
                    LEFT JOIN product_attribute pa ON pa.products_id = p.id
                    LEFT JOIN attributes a ON pa.attributes_id = a.id
                    LEFT JOIN promotions ON p.promotions_id = promotions.id
                    GROUP BY p.id
                ) AS filtered;
            `;
        // Query per la paginazione
        connection.query(countSql, (err, countResults) => {
            if (err) return res.status(500).json({ state: 'error', message: err.message });


            const total = countResults[0].total;
            const totalPages = Math.ceil(total / limit);


        })


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