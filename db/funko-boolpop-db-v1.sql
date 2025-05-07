-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: funko_boolpop_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attributes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1,'glitter','Glitter Edition','This product has the special attribute: glitter.'),(2,'jumbo','Jumbo Edition','This product has the special attribute: jumbo.'),(3,'glows in the dark','Glows In The Dark Edition','This product has the special attribute: glows in the dark.'),(4,'pop! plus','Pop! Plus Edition','This product has the special attribute: pop! plus.'),(5,'chance of chase','Chance Of Chase Edition','This product has the special attribute: chance of chase.'),(6,'pop! premium','Pop! Premium Edition','This product has the special attribute: pop! premium.'),(7,'flocked','Flocked Edition','This product has the special attribute: flocked.');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'pop'),(2,'bitty pop'),(3,'mini figures'),(4,'funko gear'),(5,'pins'),(6,'apparel'),(7,'accessories');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_product_id_foreign` (`product_id`),
  CONSTRAINT `images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'https://picsum.photos/200/300'),(2,1,'https://picsum.photos/200/300'),(3,2,'https://picsum.photos/200/300'),(4,2,'https://picsum.photos/200/300'),(5,3,'https://picsum.photos/200/300'),(6,3,'https://picsum.photos/200/300'),(7,4,'https://picsum.photos/200/300'),(8,4,'https://picsum.photos/200/300'),(9,5,'https://picsum.photos/200/300'),(10,5,'https://picsum.photos/200/300'),(11,6,'https://picsum.photos/200/300'),(12,6,'https://picsum.photos/200/300'),(13,7,'https://picsum.photos/200/300'),(14,7,'https://picsum.photos/200/300'),(15,8,'https://picsum.photos/200/300'),(16,8,'https://picsum.photos/200/300'),(17,9,'https://picsum.photos/200/300'),(18,9,'https://picsum.photos/200/300'),(19,10,'https://picsum.photos/200/300'),(20,10,'https://picsum.photos/200/300'),(21,11,'https://picsum.photos/200/300'),(22,11,'https://picsum.photos/200/300'),(23,12,'https://picsum.photos/200/300'),(24,12,'https://picsum.photos/200/300'),(25,13,'https://picsum.photos/200/300'),(26,13,'https://picsum.photos/200/300'),(27,14,'https://picsum.photos/200/300'),(28,14,'https://picsum.photos/200/300'),(29,15,'https://picsum.photos/200/300'),(30,15,'https://picsum.photos/200/300');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licenses`
--

DROP TABLE IF EXISTS `licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licenses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licenses`
--

LOCK TABLES `licenses` WRITE;
/*!40000 ALTER TABLE `licenses` DISABLE KEYS */;
INSERT INTO `licenses` VALUES (1,'disney'),(2,'marvel'),(3,'dc'),(4,'jujutsu kaisen'),(5,'demon slayer'),(6,'attack on titan'),(7,'naruto'),(8,'Dragonball');
/*!40000 ALTER TABLE `licenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_attribute`
--

DROP TABLE IF EXISTS `product_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attribute` (
  `products_id` int unsigned NOT NULL,
  `attributes_id` int unsigned NOT NULL,
  PRIMARY KEY (`products_id`,`attributes_id`),
  KEY `product_attribute_attributes_id_foreign` (`attributes_id`),
  CONSTRAINT `product_attribute_attributes_id_foreign` FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`),
  CONSTRAINT `product_attribute_products_id_foreign` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attribute`
--

LOCK TABLES `product_attribute` WRITE;
/*!40000 ALTER TABLE `product_attribute` DISABLE KEYS */;
INSERT INTO `product_attribute` VALUES (2,1),(6,1),(8,1),(9,1),(10,1),(11,1),(13,1),(4,2),(6,2),(7,2),(13,2),(12,3),(1,4),(3,4),(7,4),(8,4),(12,4),(14,4),(15,4),(2,5),(5,5),(10,5),(11,5),(1,6),(3,6),(9,6),(15,6),(4,7),(5,7),(14,7);
/*!40000 ALTER TABLE `product_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categories_id` int unsigned NOT NULL,
  `promotions_id` int unsigned NOT NULL,
  `licenses_id` int unsigned NOT NULL,
  `slug` varchar(60) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `item_number` smallint unsigned DEFAULT NULL,
  `quantity` tinyint NOT NULL,
  `dimensions` varchar(50) NOT NULL,
  `shipping_price` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `unique_item_number` (`item_number`),
  KEY `products_promotions_id_foreign` (`promotions_id`),
  KEY `products_categories_id_foreign` (`categories_id`),
  KEY `products_licenses_id_foreign` (`licenses_id`),
  CONSTRAINT `products_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_licenses_id_foreign` FOREIGN KEY (`licenses_id`) REFERENCES `licenses` (`id`),
  CONSTRAINT `products_promotions_id_foreign` FOREIGN KEY (`promotions_id`) REFERENCES `promotions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,3,6,'eren-jaeger-scout-uniform','Eren Jaeger (Scout Uniform)',39.44,'Funko Pop di Eren Jaeger in uniforme da ricognizione. Dettagli curati e posa dinamica.','2025-05-07 15:00:01',1,4,'23x21x27 cm',1579),(2,7,1,4,'megumi-fushiguro-divine-dogs','Megumi Fushiguro with Divine Dogs',14.77,'Funko Pop di Megumi con le evocazioni dei Cani Divini. Da Jujutsu Kaisen.','2025-05-07 15:00:01',2,8,'15x23x7 cm',1486),(3,1,2,7,'sasuke-uchiha-sharingan','Sasuke Uchiha (Sharingan)',15.33,'Versione Funko Pop di Sasuke con Sharingan attivo. Pose minacciose e stile anime.','2025-05-07 15:00:01',3,7,'25x29x14 cm',1763),(4,7,2,4,'nobara-kugisaki-hammer','Nobara Kugisaki with Hammer',40.25,'Pop di Nobara in posizione da combattimento con martello e chiodi.','2025-05-07 15:00:01',4,5,'20x19x19 cm',1203),(5,4,1,8,'gohan-super-saiyan2','Gohan (Super Saiyan 2)',17.78,'Gohan in Super Saiyan 2 con effetti elettrici e aura visibile. Dettagli spettacolari.','2025-05-07 15:00:01',5,8,'13x12x14 cm',1558),(6,5,1,2,'spider-man-black-suit','Spider-Man (Black Suit)',34.50,'Spider-Man nella famosa tuta nera simbiotica. Un must per i fan Marvel.','2025-05-07 15:00:01',6,6,'30x6x17 cm',1643),(7,7,1,8,'piccolo-with-cape','Piccolo with Cape',67.94,'Versione Funko Pop di Piccolo con mantello bianco e turbante. Classico look Namecciano.','2025-05-07 15:00:01',7,10,'8x24x12 cm',1369),(8,2,3,7,'naruto-rasengan','Naruto Uzumaki (Rasengan)',60.00,'Naruto mentre lancia il Rasengan. Dettagli energetici e dinamici.','2025-05-07 15:00:01',8,6,'25x8x17 cm',1905),(9,5,1,2,'iron-man-snap','Iron Man (Snap)',35.13,'Tony Stark nel momento iconico dello Snap. Dettagli metallici e pietre dell\'infinito.','2025-05-07 15:00:01',9,10,'12x10x23 cm',941),(10,6,3,8,'vegeta-galick-gun','Vegeta (Galick Gun)',71.66,'Funko Pop di Vegeta con effetto Galick Gun. Pose epiche e colori intensi.','2025-05-07 15:00:01',10,10,'8x7x8 cm',715),(11,7,1,4,'satoru-gojo-infinity','Satoru Gojo (Infinity)',80.17,'Gojo con la tecnica Infinity attiva. Maschera, capelli bianchi e posa minacciosa.','2025-05-07 15:00:01',11,1,'12x7x25 cm',737),(12,5,1,5,'tanjiro-water-style','Tanjiro Kamado (Water Style)',84.06,'Tanjiro esegue la Prima Forma dell\'Acqua. Splendidi effetti traslucidi.','2025-05-07 15:00:01',12,5,'14x7x21 cm',1374),(13,3,1,6,'levi-ackerman-cleaning-ver','Levi Ackerman (Cleaning Ver.)',80.25,'Pop divertente di Levi in versione pulizie. Per veri fan di Attack on Titan.','2025-05-07 15:00:01',13,7,'7x10x13 cm',1855),(14,4,1,2,'thor-love-and-thunder','Thor (Love and Thunder)',84.37,'Thor con Stormbreaker dalla pellicola Love and Thunder. Look cosmico.','2025-05-07 15:00:01',14,5,'19x12x22 cm',1425),(15,6,1,2,'black-panther-legacy','Black Panther (Legacy)',46.30,'Edizione speciale Funko Pop di Black Panther per commemorare la saga.','2025-05-07 15:00:01',15,8,'8x18x22 cm',1912);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `discount` tinyint NOT NULL,
  `creation_date` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'Summer Sale',20,'2025-05-07 15:00:01','2025-05-13 15:00:01','2025-05-23'),(2,'Black Friday',50,'2025-05-07 15:00:01','2025-05-07 15:00:01','2025-05-27'),(3,'New Year Promo',30,'2025-05-07 15:00:01','2025-05-14 15:00:01','2025-06-04');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `username` varchar(50) NOT NULL,
  `useremail` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(25) NOT NULL,
  `stripe_payment_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_product_id_foreign` (`product_id`),
  CONSTRAINT `transactions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,'user_1_0','user_1_0@example.com',55.23,'pending','pi_102895','2025-05-07 15:00:01'),(2,1,'user_1_1','user_1_1@example.com',55.23,'pending','pi_119311','2025-05-07 15:00:01'),(3,2,'user_2_0','user_2_0@example.com',29.63,'completed','pi_201321','2025-05-07 15:00:01'),(4,2,'user_2_1','user_2_1@example.com',29.63,'completed','pi_212625','2025-05-07 15:00:01'),(5,3,'user_3_0','user_3_0@example.com',32.96,'pending','pi_303031','2025-05-07 15:00:01'),(6,3,'user_3_1','user_3_1@example.com',32.96,'pending','pi_312126','2025-05-07 15:00:01'),(7,4,'user_4_0','user_4_0@example.com',52.28,'completed','pi_408259','2025-05-07 15:00:01'),(8,4,'user_4_1','user_4_1@example.com',52.28,'pending','pi_412749','2025-05-07 15:00:01'),(9,5,'user_5_0','user_5_0@example.com',33.36,'pending','pi_502708','2025-05-07 15:00:01'),(10,5,'user_5_1','user_5_1@example.com',33.36,'completed','pi_514846','2025-05-07 15:00:01'),(11,6,'user_6_0','user_6_0@example.com',50.93,'pending','pi_608124','2025-05-07 15:00:01'),(12,6,'user_6_1','user_6_1@example.com',50.93,'completed','pi_618827','2025-05-07 15:00:01'),(13,7,'user_7_0','user_7_0@example.com',81.63,'pending','pi_702383','2025-05-07 15:00:01'),(14,7,'user_7_1','user_7_1@example.com',81.63,'pending','pi_716473','2025-05-07 15:00:01'),(15,8,'user_8_0','user_8_0@example.com',79.05,'completed','pi_808645','2025-05-07 15:00:01'),(16,8,'user_8_1','user_8_1@example.com',79.05,'completed','pi_815655','2025-05-07 15:00:01'),(17,9,'user_9_0','user_9_0@example.com',44.54,'pending','pi_903917','2025-05-07 15:00:01'),(18,9,'user_9_1','user_9_1@example.com',44.54,'completed','pi_914298','2025-05-07 15:00:01'),(19,10,'user_10_0','user_10_0@example.com',78.81,'completed','pi_1007048','2025-05-07 15:00:01'),(20,10,'user_10_1','user_10_1@example.com',78.81,'pending','pi_1016479','2025-05-07 15:00:01'),(21,11,'user_11_0','user_11_0@example.com',87.54,'pending','pi_1107741','2025-05-07 15:00:01'),(22,11,'user_11_1','user_11_1@example.com',87.54,'pending','pi_1118288','2025-05-07 15:00:01'),(23,12,'user_12_0','user_12_0@example.com',97.80,'pending','pi_1204831','2025-05-07 15:00:01'),(24,12,'user_12_1','user_12_1@example.com',97.80,'completed','pi_1212854','2025-05-07 15:00:01'),(25,13,'user_13_0','user_13_0@example.com',98.80,'pending','pi_1306546','2025-05-07 15:00:01'),(26,13,'user_13_1','user_13_1@example.com',98.80,'pending','pi_1313867','2025-05-07 15:00:01'),(27,14,'user_14_0','user_14_0@example.com',98.62,'pending','pi_1408785','2025-05-07 15:00:01'),(28,14,'user_14_1','user_14_1@example.com',98.62,'pending','pi_1412498','2025-05-07 15:00:01'),(29,15,'user_15_0','user_15_0@example.com',65.42,'completed','pi_1503861','2025-05-07 15:00:01'),(30,15,'user_15_1','user_15_1@example.com',65.42,'completed','pi_1514592','2025-05-07 15:00:01');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-07 17:22:56
