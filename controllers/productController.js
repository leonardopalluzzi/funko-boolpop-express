const connection = require('../db/db');

function index(req, res) {

    console.log(req.query);


    const dateSort = req.query.date;
    const sortBySales = req.query.sales;
    const sortByPrice = Number(req.query.price);
    const trans = Number(req.query.trans) || 0;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const name = req.query.name || '';
    const description = req.query.description || '';
    const category = req.query.category || '';
    const attribute = req.query.attribute || '';
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 1000;
    const promotion = req.query.promotion || '';

    const filters = [];
    const values = [];

    if (typeof name !== 'string') return res.status(400).json({ state: 'error', message: 'Invalid name parameter' });
    if (typeof description !== 'string') return res.status(400).json({ state: 'error', message: 'Invalid description parameter' });
    if (typeof category !== 'string') return res.status(400).json({ state: 'error', message: 'Invalid category parameter' });
    if (typeof attribute !== 'string') return res.status(400).json({ state: 'error', message: 'Invalid attribute parameter' });
    if (typeof minPrice !== 'number') return res.status(400).json({ state: 'error', message: 'Invalid minPrice parameter' });
    if (typeof maxPrice !== 'number') return res.status(400).json({ state: 'error', message: 'Invalid maxPrice parameter' });
    if (typeof promotion !== 'string') return res.status(400).json({ state: 'error', message: 'Invalid promotion parameter' });

    if (name) {
        filters.push('p.name LIKE ?');
        values.push(`%${name}%`);
    }

    if (description) {
        console.log(description);

        filters.push('p.description LIKE ?');
        values.push(`%${description}%`);
    }

    if (category) {
        console.log(category);

        filters.push('c.name LIKE ?');
        values.push(`%${category}%`);
    }

    if (attribute) {
        console.log(attribute);

        filters.push('a.name LIKE ?')
        values.push(`%${attribute}%`)
    }

    if (minPrice) {
        console.log(minPrice);

        filters.push('p.price >= ?')
        values.push(minPrice)
    }

    if (maxPrice) {
        filters.push('p.price <= ?');
        values.push(maxPrice);
    }

    if (promotion) {
        filters.push('promotions.name LIKE ?')
        values.push(`%${promotion}%`)
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const orderClause =
        sortBySales
            ? 'ORDER BY total_quantity_sold DESC'
            : dateSort
                ? 'ORDER BY p.created_at DESC'
                : (minPrice || maxPrice)
                    ? 'ORDER BY p.price ASC'
                    : sortByPrice === 1
                        ? 'ORDER BY p.price ASC'
                        : sortByPrice === -1
                            ? 'ORDER BY p.price DESC'
                            : '';


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
                    ${whereClause}
                    GROUP BY p.id
                    HAVING COALESCE(SUM(pt.quantity), 0) >= ?
                ) AS filtered;
            `;

    const countValues = [...values, trans];



    const productSql = `
        SELECT 
            p.*, 
            COALESCE(SUM(pt.quantity), 0) AS total_quantity_sold
        FROM products p
        JOIN categories c ON p.categories_id = c.id
        LEFT JOIN product_transaction pt ON pt.product_id = p.id
        LEFT JOIN product_attribute pa ON pa.products_id = p.id
        LEFT JOIN attributes a ON pa.attributes_id = a.id
        LEFT JOIN promotions ON p.promotions_id = promotions.id
        ${whereClause}
        GROUP BY p.id
        HAVING total_quantity_sold >= ?
        ${orderClause}
        LIMIT ? OFFSET ?
    `;

    values.push(trans, limit, offset);
    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'

    // const queryParams = [searchName, searchDescription, searchCategory, trans, limit, offset]
    // values.push(trans, limit, offset);

    connection.query(countSql, countValues, (err, countResult) => {
        if (err) return res.status(500).json({ state: 'error', message: err.message });

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        connection.query(productSql, values, (err, products) => {
            if (err) return res.status(500).json({ state: 'error', message: err.message });

            const productList = products

            const productListToSend = (productList.map(product => {
                return new Promise((resolve, reject) => {
                    if (err) return reject(err);


                    connection.query(imagesSql, [product.id], (err, images) => {
                        if (err) return res.status(500).json({ state: 'error', message: err.message });

                        connection.query(promotionSql, [product.promotions_id], (err, promotions) => {
                            if (err) return res.status(500).json({ state: 'error', message: err.message });

                            connection.query(licenseSql, [product.licenses_id], (err, licenses) => {
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
                                    license: licenses[0]

                                }

                                resolve(itemToSend)
                            })
                        })
                    })
                })
            }))

            Promise.all(productListToSend)
                .then(productListToSend => {
                    const searchOnly = req.query.searchOnly === 'true';
                    const hasFilters = name || description || category;

                    if (searchOnly && !hasFilters) {
                        return res.json({
                            currentPage: 1,
                            totalPages: 0,
                            totalResults: 0,
                            results: []
                        });
                    }

                    const getCategory = req.query.getCategory === 'true';

                    if (getCategory) {

                        const getCategorySql = 'SELECT categories.name FROM categories';

                        connection.query(getCategorySql, (err, results) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ state: 'error', message: err.message });
                            }

                            res.json(results);
                        });

                        return;
                    }

                    res.json({
                        currentPage: page,
                        totalPages,
                        totalResults: total,
                        results: productListToSend
                    })
                })
                .catch(err => res.status(500).json({ state: 'error', message: err.message }))
        });
    })


}

function show(req, res) {

    const slug = req.params.slug

    const productSql = 'SELECT * FROM products WHERE products.slug = ?'
    const imagesSql = 'SELECT * FROM images WHERE images.product_id = ?'
    const categorySql = 'SELECT * FROM categories WHERE categories.id = ?'
    const licenseSql = 'SELECT * FROM licenses WHERE licenses.id = ?'
    const promotionSql = 'SELECT * FROM promotions WHERE promotions.id = ?'
    const attributeSql = 'SELECT * FROM attributes JOIN product_attribute ON attributes.id = product_attribute.attributes_id WHERE product_attribute.products_id = ?'

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

            // connection.query(transactionsSql, [pId], (err, transactions) => {
            //     if (err) return res.status(500).json({ state: 'error', message: err.message });
            //     productToSend.transactions = transactions

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

                        connection.query(attributeSql, [pId], (err, attributes) => {
                            if (err) return res.status(500).json({ state: 'error', message: err.message });
                            productToSend.attributes = attributes

                            res.json(productToSend)
                        })
                    })
                })
            })
            // })
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