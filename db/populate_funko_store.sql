-- Categories
INSERT INTO categories (name) VALUES ('pop');
INSERT INTO categories (name) VALUES ('bitty pop');
INSERT INTO categories (name) VALUES ('mini figures');
INSERT INTO categories (name) VALUES ('funko gear');
INSERT INTO categories (name) VALUES ('pins');
INSERT INTO categories (name) VALUES ('apparel');
INSERT INTO categories (name) VALUES ('accessories');

-- Licenses
INSERT INTO licenses (name) VALUES ('disney');
INSERT INTO licenses (name) VALUES ('marvel');
INSERT INTO licenses (name) VALUES ('dc');
INSERT INTO licenses (name) VALUES ('jujutsu kaisen');
INSERT INTO licenses (name) VALUES ('demon slayer');
INSERT INTO licenses (name) VALUES ('attack on titan');
INSERT INTO licenses (name) VALUES ('naruto');
INSERT INTO licenses (name) VALUES ('Dragonball');

-- Attributes
INSERT INTO attributes (name, title, description) VALUES ('glitter', 'Glitter Edition', 'This product has the special attribute: glitter.');
INSERT INTO attributes (name, title, description) VALUES ('jumbo', 'Jumbo Edition', 'This product has the special attribute: jumbo.');
INSERT INTO attributes (name, title, description) VALUES ('glows in the dark', 'Glows In The Dark Edition', 'This product has the special attribute: glows in the dark.');
INSERT INTO attributes (name, title, description) VALUES ('pop! plus', 'Pop! Plus Edition', 'This product has the special attribute: pop! plus.');
INSERT INTO attributes (name, title, description) VALUES ('chance of chase', 'Chance Of Chase Edition', 'This product has the special attribute: chance of chase.');
INSERT INTO attributes (name, title, description) VALUES ('pop! premium', 'Pop! Premium Edition', 'This product has the special attribute: pop! premium.');
INSERT INTO attributes (name, title, description) VALUES ('flocked', 'Flocked Edition', 'This product has the special attribute: flocked.');

-- Promotions
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('Summer Sale', 20, '2025-05-07 15:00:01', '2025-05-13 15:00:01', '2025-05-23');
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('Black Friday', 50, '2025-05-07 15:00:01', '2025-05-07 15:00:01', '2025-05-27');
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('New Year Promo', 30, '2025-05-07 15:00:01', '2025-05-14 15:00:01', '2025-06-04');

-- Products
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (1, 3, 6, 'goku', 'Goku', 39.44, 'Goku is cool', '2025-05-07 15:00:01', 1, 4, '23x21x27 cm', 1579);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (7, 1, 4, 'vegeta', 'Vegeta', 14.77, 'Vegeta is very very cool', '2025-05-07 15:00:01', 2, 8, '15x23x7 cm', 1486);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (1, 2, 7, 'product-3', 'Product 3', 15.33, 'This is the description for Product 3.', '2025-05-07 15:00:01', 3, 7, '25x29x14 cm', 1763);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (7, 2, 4, 'product-4', 'Product 4', 40.25, 'This is the description for Product 4.', '2025-05-07 15:00:01', 4, 5, '20x19x19 cm', 1203);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (4, 1, 8, 'product-5', 'Product 5', 17.78, 'This is the description for Product 5.', '2025-05-07 15:00:01', 5, 8, '13x12x14 cm', 1558);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (5, 1, 2, 'product-6', 'Product 6', 34.5, 'This is the description for Product 6.', '2025-05-07 15:00:01', 6, 6, '30x6x17 cm', 1643);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (7, 1, 8, 'product-7', 'Product 7', 67.94, 'This is the description for Product 7.', '2025-05-07 15:00:01', 7, 10, '8x24x12 cm', 1369);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (2, 3, 7, 'product-8', 'Product 8', 60.0, 'This is the description for Product 8.', '2025-05-07 15:00:01', 8, 6, '25x8x17 cm', 1905);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (5, 1, 2, 'product-9', 'Product 9', 35.13, 'This is the description for Product 9.', '2025-05-07 15:00:01', 9, 10, '12x10x23 cm', 941);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (6, 3, 8, 'product-10', 'Product 10', 71.66, 'This is the description for Product 10.', '2025-05-07 15:00:01', 10, 10, '8x7x8 cm', 715);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (7, 1, 4, 'product-11', 'Product 11', 80.17, 'This is the description for Product 11.', '2025-05-07 15:00:01', 11, 1, '12x7x25 cm', 737);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (5, 1, 5, 'product-12', 'Product 12', 84.06, 'This is the description for Product 12.', '2025-05-07 15:00:01', 12, 5, '14x7x21 cm', 1374);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (3, 1, 6, 'product-13', 'Product 13', 80.25, 'This is the description for Product 13.', '2025-05-07 15:00:01', 13, 7, '7x10x13 cm', 1855);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (4, 1, 2, 'product-14', 'Product 14', 84.37, 'This is the description for Product 14.', '2025-05-07 15:00:01', 14, 5, '19x12x22 cm', 1425);
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES (6, 1, 2, 'product-15', 'Product 15', 46.3, 'This is the description for Product 15.', '2025-05-07 15:00:01', 15, 8, '8x18x22 cm', 1912);

-- Images
INSERT INTO images (product_id, image) VALUES (1, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (1, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (2, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (2, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (3, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (3, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (4, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (4, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (5, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (5, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (6, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (6, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (7, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (7, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (8, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (8, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (9, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (9, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (10, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (10, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (11, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (11, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (12, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (12, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (13, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (13, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (14, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (14, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (15, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (15, 'https://picsum.photos/200/300');

-- Product Attributes
INSERT INTO product_attribute (products_id, attributes_id) VALUES (1, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (1, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (2, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (2, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (3, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (3, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (4, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (4, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (5, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (5, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (6, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (6, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (7, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (7, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (8, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (8, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (9, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (9, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (10, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (10, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (11, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (11, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (12, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (12, 3);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (13, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (13, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (14, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (14, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (15, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (15, 6);

-- Transactions
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (1, 'user_1_0', 'user_1_0@example.com', 55.23, 'pending', 'pi_102895', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (1, 'user_1_1', 'user_1_1@example.com', 55.23, 'pending', 'pi_119311', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (2, 'user_2_0', 'user_2_0@example.com', 29.63, 'completed', 'pi_201321', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (2, 'user_2_1', 'user_2_1@example.com', 29.63, 'completed', 'pi_212625', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (3, 'user_3_0', 'user_3_0@example.com', 32.96, 'pending', 'pi_303031', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (3, 'user_3_1', 'user_3_1@example.com', 32.96, 'pending', 'pi_312126', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (4, 'user_4_0', 'user_4_0@example.com', 52.28, 'completed', 'pi_408259', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (4, 'user_4_1', 'user_4_1@example.com', 52.28, 'pending', 'pi_412749', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (5, 'user_5_0', 'user_5_0@example.com', 33.36, 'pending', 'pi_502708', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (5, 'user_5_1', 'user_5_1@example.com', 33.36, 'completed', 'pi_514846', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (6, 'user_6_0', 'user_6_0@example.com', 50.93, 'pending', 'pi_608124', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (6, 'user_6_1', 'user_6_1@example.com', 50.93, 'completed', 'pi_618827', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (7, 'user_7_0', 'user_7_0@example.com', 81.63, 'pending', 'pi_702383', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (7, 'user_7_1', 'user_7_1@example.com', 81.63, 'pending', 'pi_716473', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (8, 'user_8_0', 'user_8_0@example.com', 79.05, 'completed', 'pi_808645', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (8, 'user_8_1', 'user_8_1@example.com', 79.05, 'completed', 'pi_815655', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (9, 'user_9_0', 'user_9_0@example.com', 44.54, 'pending', 'pi_903917', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (9, 'user_9_1', 'user_9_1@example.com', 44.54, 'completed', 'pi_914298', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (10, 'user_10_0', 'user_10_0@example.com', 78.81, 'completed', 'pi_1007048', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (10, 'user_10_1', 'user_10_1@example.com', 78.81, 'pending', 'pi_1016479', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (11, 'user_11_0', 'user_11_0@example.com', 87.54, 'pending', 'pi_1107741', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (11, 'user_11_1', 'user_11_1@example.com', 87.54, 'pending', 'pi_1118288', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (12, 'user_12_0', 'user_12_0@example.com', 97.80, 'pending', 'pi_1204831', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (12, 'user_12_1', 'user_12_1@example.com', 97.80, 'completed', 'pi_1212854', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (13, 'user_13_0', 'user_13_0@example.com', 98.80, 'pending', 'pi_1306546', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (13, 'user_13_1', 'user_13_1@example.com', 98.80, 'pending', 'pi_1313867', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (14, 'user_14_0', 'user_14_0@example.com', 98.62, 'pending', 'pi_1408785', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (14, 'user_14_1', 'user_14_1@example.com', 98.62, 'pending', 'pi_1412498', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (15, 'user_15_0', 'user_15_0@example.com', 65.42, 'completed', 'pi_1503861', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (15, 'user_15_1', 'user_15_1@example.com', 65.42, 'completed', 'pi_1514592', '2025-05-07 15:00:01');














-- Categories
INSERT INTO categories (name) VALUES ('pop');
INSERT INTO categories (name) VALUES ('bitty pop');
INSERT INTO categories (name) VALUES ('mini figures');
INSERT INTO categories (name) VALUES ('funko gear');
INSERT INTO categories (name) VALUES ('pins');
INSERT INTO categories (name) VALUES ('apparel');
INSERT INTO categories (name) VALUES ('accessories');

-- Licenses
INSERT INTO licenses (name) VALUES ('disney');
INSERT INTO licenses (name) VALUES ('marvel');
INSERT INTO licenses (name) VALUES ('dc');
INSERT INTO licenses (name) VALUES ('jujutsu kaisen');
INSERT INTO licenses (name) VALUES ('demon slayer');
INSERT INTO licenses (name) VALUES ('attack on titan');
INSERT INTO licenses (name) VALUES ('naruto');
INSERT INTO licenses (name) VALUES ('Dragonball');

-- Attributes
INSERT INTO attributes (name, title, description) VALUES ('glitter', 'Glitter Edition', 'This product has the special attribute: glitter.');
INSERT INTO attributes (name, title, description) VALUES ('jumbo', 'Jumbo Edition', 'This product has the special attribute: jumbo.');
INSERT INTO attributes (name, title, description) VALUES ('glows in the dark', 'Glows In The Dark Edition', 'This product has the special attribute: glows in the dark.');
INSERT INTO attributes (name, title, description) VALUES ('pop! plus', 'Pop! Plus Edition', 'This product has the special attribute: pop! plus.');
INSERT INTO attributes (name, title, description) VALUES ('chance of chase', 'Chance Of Chase Edition', 'This product has the special attribute: chance of chase.');
INSERT INTO attributes (name, title, description) VALUES ('pop! premium', 'Pop! Premium Edition', 'This product has the special attribute: pop! premium.');
INSERT INTO attributes (name, title, description) VALUES ('flocked', 'Flocked Edition', 'This product has the special attribute: flocked.');

-- Promotions
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('Summer Sale', 20, '2025-05-07 15:00:01', '2025-05-13 15:00:01', '2025-05-23');
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('Black Friday', 50, '2025-05-07 15:00:01', '2025-05-07 15:00:01', '2025-05-27');
INSERT INTO promotions (name, discount, creation_date, start_date, end_date) VALUES ('New Year Promo', 30, '2025-05-07 15:00:01', '2025-05-14 15:00:01', '2025-06-04');

-- Products
INSERT INTO products (categories_id, promotions_id, licenses_id, slug, name, price, description, created_at, item_number, quantity, dimensions, shipping_price) VALUES 
(1, 3, 6, 'eren-jaeger-scout-uniform', 'Eren Jaeger (Scout Uniform)', 39.44, 'Funko Pop di Eren Jaeger in uniforme da ricognizione. Dettagli curati e posa dinamica.', '2025-05-07 15:00:01', 1, 4, '23x21x27 cm', 1579),
(7, 1, 4, 'megumi-fushiguro-divine-dogs', 'Megumi Fushiguro with Divine Dogs', 14.77, 'Funko Pop di Megumi con le evocazioni dei Cani Divini. Da Jujutsu Kaisen.', '2025-05-07 15:00:01', 2, 8, '15x23x7 cm', 1486),
(1, 2, 7, 'sasuke-uchiha-sharingan', 'Sasuke Uchiha (Sharingan)', 15.33, 'Versione Funko Pop di Sasuke con Sharingan attivo. Pose minacciose e stile anime.', '2025-05-07 15:00:01', 3, 7, '25x29x14 cm', 1763),
(7, 2, 4, 'nobara-kugisaki-hammer', 'Nobara Kugisaki with Hammer', 40.25, 'Pop di Nobara in posizione da combattimento con martello e chiodi.', '2025-05-07 15:00:01', 4, 5, '20x19x19 cm', 1203),
(4, 1, 8, 'gohan-super-saiyan2', 'Gohan (Super Saiyan 2)', 17.78, 'Gohan in Super Saiyan 2 con effetti elettrici e aura visibile. Dettagli spettacolari.', '2025-05-07 15:00:01', 5, 8, '13x12x14 cm', 1558),
(5, 1, 2, 'spider-man-black-suit', 'Spider-Man (Black Suit)', 34.5, 'Spider-Man nella famosa tuta nera simbiotica. Un must per i fan Marvel.', '2025-05-07 15:00:01', 6, 6, '30x6x17 cm', 1643),
(7, 1, 8, 'piccolo-with-cape', 'Piccolo with Cape', 67.94, 'Versione Funko Pop di Piccolo con mantello bianco e turbante. Classico look Namecciano.', '2025-05-07 15:00:01', 7, 10, '8x24x12 cm', 1369),
(2, 3, 7, 'naruto-rasengan', 'Naruto Uzumaki (Rasengan)', 60.0, 'Naruto mentre lancia il Rasengan. Dettagli energetici e dinamici.', '2025-05-07 15:00:01', 8, 6, '25x8x17 cm', 1905),
(5, 1, 2, 'iron-man-snap', 'Iron Man (Snap)', 35.13, 'Tony Stark nel momento iconico dello Snap. Dettagli metallici e pietre dell\'infinito.', '2025-05-07 15:00:01', 9, 10, '12x10x23 cm', 941),
(6, 3, 8, 'vegeta-galick-gun', 'Vegeta (Galick Gun)', 71.66, 'Funko Pop di Vegeta con effetto Galick Gun. Pose epiche e colori intensi.', '2025-05-07 15:00:01', 10, 10, '8x7x8 cm', 715),
(7, 1, 4, 'satoru-gojo-infinity', 'Satoru Gojo (Infinity)', 80.17, 'Gojo con la tecnica Infinity attiva. Maschera, capelli bianchi e posa minacciosa.', '2025-05-07 15:00:01', 11, 1, '12x7x25 cm', 737),
(5, 1, 5, 'tanjiro-water-style', 'Tanjiro Kamado (Water Style)', 84.06, 'Tanjiro esegue la Prima Forma dell\'Acqua. Splendidi effetti traslucidi.', '2025-05-07 15:00:01', 12, 5, '14x7x21 cm', 1374),
(3, 1, 6, 'levi-ackerman-cleaning-ver', 'Levi Ackerman (Cleaning Ver.)', 80.25, 'Pop divertente di Levi in versione pulizie. Per veri fan di Attack on Titan.', '2025-05-07 15:00:01', 13, 7, '7x10x13 cm', 1855),
(4, 1, 2, 'thor-love-and-thunder', 'Thor (Love and Thunder)', 84.37, 'Thor con Stormbreaker dalla pellicola Love and Thunder. Look cosmico.', '2025-05-07 15:00:01', 14, 5, '19x12x22 cm', 1425),
(6, 1, 2, 'black-panther-legacy', 'Black Panther (Legacy)', 46.3, 'Edizione speciale Funko Pop di Black Panther per commemorare la saga.', '2025-05-07 15:00:01', 15, 8, '8x18x22 cm', 1912);


-- Images
INSERT INTO images (product_id, image) VALUES (1, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (1, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (2, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (2, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (3, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (3, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (4, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (4, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (5, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (5, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (6, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (6, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (7, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (7, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (8, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (8, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (9, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (9, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (10, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (10, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (11, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (11, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (12, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (12, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (13, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (13, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (14, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (14, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (15, 'https://picsum.photos/200/300');
INSERT INTO images (product_id, image) VALUES (15, 'https://picsum.photos/200/300');

-- Product Attributes
INSERT INTO product_attribute (products_id, attributes_id) VALUES (1, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (1, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (2, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (2, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (3, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (3, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (4, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (4, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (5, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (5, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (6, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (6, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (7, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (7, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (8, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (8, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (9, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (9, 6);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (10, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (10, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (11, 5);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (11, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (12, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (12, 3);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (13, 2);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (13, 1);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (14, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (14, 7);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (15, 4);
INSERT INTO product_attribute (products_id, attributes_id) VALUES (15, 6);

-- Transactions
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (1, 'user_1_0', 'user_1_0@example.com', 55.23, 'pending', 'pi_102895', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (1, 'user_1_1', 'user_1_1@example.com', 55.23, 'pending', 'pi_119311', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (2, 'user_2_0', 'user_2_0@example.com', 29.63, 'completed', 'pi_201321', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (2, 'user_2_1', 'user_2_1@example.com', 29.63, 'completed', 'pi_212625', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (3, 'user_3_0', 'user_3_0@example.com', 32.96, 'pending', 'pi_303031', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (3, 'user_3_1', 'user_3_1@example.com', 32.96, 'pending', 'pi_312126', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (4, 'user_4_0', 'user_4_0@example.com', 52.28, 'completed', 'pi_408259', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (4, 'user_4_1', 'user_4_1@example.com', 52.28, 'pending', 'pi_412749', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (5, 'user_5_0', 'user_5_0@example.com', 33.36, 'pending', 'pi_502708', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (5, 'user_5_1', 'user_5_1@example.com', 33.36, 'completed', 'pi_514846', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (6, 'user_6_0', 'user_6_0@example.com', 50.93, 'pending', 'pi_608124', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (6, 'user_6_1', 'user_6_1@example.com', 50.93, 'completed', 'pi_618827', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (7, 'user_7_0', 'user_7_0@example.com', 81.63, 'pending', 'pi_702383', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (7, 'user_7_1', 'user_7_1@example.com', 81.63, 'pending', 'pi_716473', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (8, 'user_8_0', 'user_8_0@example.com', 79.05, 'completed', 'pi_808645', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (8, 'user_8_1', 'user_8_1@example.com', 79.05, 'completed', 'pi_815655', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (9, 'user_9_0', 'user_9_0@example.com', 44.54, 'pending', 'pi_903917', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (9, 'user_9_1', 'user_9_1@example.com', 44.54, 'completed', 'pi_914298', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (10, 'user_10_0', 'user_10_0@example.com', 78.81, 'completed', 'pi_1007048', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (10, 'user_10_1', 'user_10_1@example.com', 78.81, 'pending', 'pi_1016479', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (11, 'user_11_0', 'user_11_0@example.com', 87.54, 'pending', 'pi_1107741', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (11, 'user_11_1', 'user_11_1@example.com', 87.54, 'pending', 'pi_1118288', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (12, 'user_12_0', 'user_12_0@example.com', 97.80, 'pending', 'pi_1204831', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (12, 'user_12_1', 'user_12_1@example.com', 97.80, 'completed', 'pi_1212854', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (13, 'user_13_0', 'user_13_0@example.com', 98.80, 'pending', 'pi_1306546', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (13, 'user_13_1', 'user_13_1@example.com', 98.80, 'pending', 'pi_1313867', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (14, 'user_14_0', 'user_14_0@example.com', 98.62, 'pending', 'pi_1408785', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (14, 'user_14_1', 'user_14_1@example.com', 98.62, 'pending', 'pi_1412498', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (15, 'user_15_0', 'user_15_0@example.com', 65.42, 'completed', 'pi_1503861', '2025-05-07 15:00:01');
INSERT INTO transactions (product_id, username, useremail, amount, status, stripe_payment_id, created_at) VALUES (15, 'user_15_1', 'user_15_1@example.com', 65.42, 'completed', 'pi_1514592', '2025-05-07 15:00:01');