const connection = require('../db/db');


function index(req, res) {
    const slug = req.query.slug;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    console.log(slug);


    // Recupero il prodotto di partenza con category e license dirette
    const countSql = `
SELECT COUNT(DISTINCT p2.id) AS total
FROM products p1
JOIN categories c1 ON p1.categories_id = c1.id
JOIN licenses l1 ON p1.licenses_id = l1.id
LEFT JOIN product_attribute pa1 ON p1.id = pa1.products_id
LEFT JOIN attributes a1 ON pa1.attributes_id = a1.id
JOIN products p2 ON p2.id != p1.id
JOIN categories c2 ON p2.categories_id = c2.id
JOIN licenses l2 ON p2.licenses_id = l2.id
LEFT JOIN product_attribute pa2 ON p2.id = pa2.products_id
LEFT JOIN attributes a2 ON pa2.attributes_id = a2.id
WHERE p1.slug = ?
AND (
    c2.name LIKE CONCAT('%', c1.name, '%')
    OR l2.name LIKE CONCAT('%', l1.name, '%')
    OR a2.name LIKE CONCAT('%', a1.name, '%')
)
`;

    // Query paginata
    const paginatedSql = `
SELECT DISTINCT p2.*
FROM products p1
JOIN categories c1 ON p1.categories_id = c1.id
JOIN licenses l1 ON p1.licenses_id = l1.id
LEFT JOIN product_attribute pa1 ON p1.id = pa1.products_id
LEFT JOIN attributes a1 ON pa1.attributes_id = a1.id
JOIN products p2 ON p2.id != p1.id
JOIN categories c2 ON p2.categories_id = c2.id
JOIN licenses l2 ON p2.licenses_id = l2.id
LEFT JOIN product_attribute pa2 ON p2.id = pa2.products_id
LEFT JOIN attributes a2 ON pa2.attributes_id = a2.id
WHERE p1.slug = ?
AND (
    c2.name LIKE CONCAT('%', c1.name, '%')
    OR l2.name LIKE CONCAT('%', l1.name, '%')
    OR a2.name LIKE CONCAT('%', a1.name, '%')
)
LIMIT ? OFFSET ?;
`;

    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'
    const categorySql = 'SELECT * FROM categories WHERE categories.id = ?'
    const attributeSql = ` SELECT a.* 
                            FROM attributes a 
                            JOIN product_attribute pa ON a.id = pa.attributes_id 
                            WHERE pa.products_id = ?`


    connection.query(countSql, [slug], (err, countResults) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });

        const total = countResults[0].total
        const totalPages = Math.ceil(total / limit)

        connection.query(paginatedSql, [slug, limit, offset], (err, results) => {
            if (err) return res.status(500).json({ state: 'error, message: err.message' });
            const productList = results

            const listToSend = (productList.map(product => {
                return new Promise((resolve, reject) => {
                    if (err) return reject(err);

                    connection.query(imagesSql, [product.id], (err, images) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });

                        connection.query(promotionSql, [product.promotions_id], (err, promotions) => {
                            if (err) return res.status(500).json({ state: 'error', message: err.message });

                            connection.query(licenseSql, [product.licenses_id], (err, licenses) => {
                                if (err) return res.status(500).json({ state: 'error', message: err.message });

                                connection.query(categorySql, [product.categories_id], (err, categories) => {
                                    if (err) return res.status(500).json({ state: 'error', message: err.message });

                                    connection.query(attributeSql, [product.id], (err, attributes) => {
                                        if (err) return res.status(500).json({ state: 'error', message: err.message });

                                        const itemToSend = {
                                            slug: product.slug,
                                            name: product.name,
                                            price: product.price,
                                            description: product.description,
                                            created_at: product.created_at,
                                            banner: product.banner,
                                            item_number: product.item_number,
                                            quantity: product.quantity,
                                            transaction_count: product.transaction_count,
                                            images: images,
                                            promotions: promotions,
                                            license: licenses[0],
                                            category: categories,
                                            attribute: attributes,
                                            discounted_price: product.discounted_price
                                        }
                                        resolve(itemToSend)

                                    })
                                })


                            })
                        })
                    })
                })
            }))

            Promise.all(listToSend)
                .then(listToSend => {
                    res.json({
                        currentPage: page,
                        totalPages,
                        totalResults: total,
                        results: listToSend
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