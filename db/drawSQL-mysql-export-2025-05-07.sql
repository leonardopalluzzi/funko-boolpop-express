CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categories_id` INT NOT NULL,
    `promotions_id` INT NOT NULL,
    `licenses_id` INT NOT NULL,
    `slug` VARCHAR(60) NOT NULL,
    `name` VARCHAR(50) NULL,
    `price` DECIMAL(10, 2) NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `item_number` SMALLINT UNSIGNED NULL UNIQUE KEY,
    `quantity` TINYINT NOT NULL,
    `dimensions` TINYINT NOT NULL,
    `shipping_price` BIGINT NOT NULL
);
ALTER TABLE
    `products` ADD UNIQUE `products_slug_unique`(`slug`);
CREATE TABLE `attributes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `title` VARCHAR(50) NULL,
    `description` TEXT NULL
);
CREATE TABLE `product_attribute`(
    `(prodcuts_id, attributes_id)` INT NOT NULL,
    `products_id` INT UNSIGNED NOT NULL,
    `attributes_id` INT NOT NULL,
    PRIMARY KEY(`(prodcuts_id, attributes_id)`)
);
CREATE TABLE `licenses`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(25) NULL
);
CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);
CREATE TABLE `images`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `image` VARCHAR(255) NULL
);
CREATE TABLE `promotions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NULL,
    `discount` TINYINT NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATE NOT NULL
);
CREATE TABLE `transactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `useremail` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(25) NOT NULL,
    `stripe_payment_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL
);
ALTER TABLE
    `transactions` ADD CONSTRAINT `transactions_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_promotions_id_foreign` FOREIGN KEY(`promotions_id`) REFERENCES `promotions`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_categories_id_foreign` FOREIGN KEY(`categories_id`) REFERENCES `categories`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_licenses_id_foreign` FOREIGN KEY(`licenses_id`) REFERENCES `licenses`(`id`);
ALTER TABLE
    `images` ADD CONSTRAINT `images_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `product_attribute` ADD CONSTRAINT `product_attribute_products_id_foreign` FOREIGN KEY(`products_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `product_attribute` ADD CONSTRAINT `product_attribute_attributes_id_foreign` FOREIGN KEY(`attributes_id`) REFERENCES `attributes`(`id`);