-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: minibit_study
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pass_phrase` varchar(255) NOT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'ACID LABS','acid_labs_passphrase','acid_labs.jpg');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_content`
--

DROP TABLE IF EXISTS `company_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `content_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_content`
--

LOCK TABLES `company_content` WRITE;
/*!40000 ALTER TABLE `company_content` DISABLE KEYS */;
INSERT INTO `company_content` VALUES (30,1,37),(32,1,39),(33,1,40),(61,1,68),(62,1,69);
/*!40000 ALTER TABLE `company_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `enable` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (68,'Python','3432016090.pdf','1'),(69,'JS','2945066423.pdf',NULL);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `company_id` int NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer_a` varchar(255) NOT NULL,
  `answer_b` varchar(255) NOT NULL,
  `answer_c` varchar(255) NOT NULL,
  `answer_d` varchar(255) NOT NULL,
  `correct_answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1507 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1107,53,1,'','','','','',''),(1108,53,1,'','','','','',''),(1109,53,1,'','','','','',''),(1110,53,1,'','','','','',''),(1111,53,1,'','','','','',''),(1112,53,1,'','','','','',''),(1113,53,1,'','','','','',''),(1114,53,1,'','','','','',''),(1115,53,1,'','','','','',''),(1116,53,1,'','','','','',''),(1117,53,1,'','','','','',''),(1118,53,1,'','','','','',''),(1119,53,1,'','','','','',''),(1120,53,1,'','','','','',''),(1121,53,1,'','','','','',''),(1122,53,1,'','','','','',''),(1123,53,1,'','','','','',''),(1124,53,1,'','','','','',''),(1125,53,1,'','','','','',''),(1126,53,1,'','','','','',''),(1127,53,1,'','','','','',''),(1128,53,1,'','','','','',''),(1129,53,1,'','','','','',''),(1130,53,1,'','','','','',''),(1131,53,1,'','','','','',''),(1132,53,1,'','','','','',''),(1133,53,1,'','','','','',''),(1134,53,1,'','','','','',''),(1135,53,1,'','','','','',''),(1136,53,1,'','','','','',''),(1137,53,1,'','','','','',''),(1138,53,1,'','','','','',''),(1139,53,1,'','','','','',''),(1140,53,1,'','','','','',''),(1141,53,1,'','','','','',''),(1142,53,1,'','','','','',''),(1143,53,1,'','','','','',''),(1144,53,1,'','','','','',''),(1145,53,1,'','','','','',''),(1146,53,1,'','','','','',''),(1147,53,1,'','','','','',''),(1148,53,1,'','','','','',''),(1149,53,1,'','','','','',''),(1150,53,1,'','','','','',''),(1151,53,1,'','','','','',''),(1152,53,1,'','','','','',''),(1153,53,1,'','','','','',''),(1154,53,1,'','','','','',''),(1155,53,1,'','','','','',''),(1156,53,1,'','','','','',''),(1157,53,1,'','','','','',''),(1158,53,1,'','','','','',''),(1159,53,1,'','','','','',''),(1160,53,1,'','','','','',''),(1161,53,1,'','','','','',''),(1162,53,1,'','','','','',''),(1163,53,1,'','','','','',''),(1164,53,1,'','','','','',''),(1165,53,1,'','','','','',''),(1166,53,1,'','','','','',''),(1167,53,1,'','','','','',''),(1168,53,1,'','','','','',''),(1169,53,1,'','','','','',''),(1170,53,1,'','','','','',''),(1171,53,1,'','','','','',''),(1172,53,1,'','','','','',''),(1173,53,1,'','','','','',''),(1174,53,1,'','','','','',''),(1175,53,1,'','','','','',''),(1176,53,1,'','','','','',''),(1177,53,1,'','','','','',''),(1178,53,1,'','','','','',''),(1179,53,1,'','','','','',''),(1180,53,1,'','','','','',''),(1181,53,1,'','','','','',''),(1182,53,1,'','','','','',''),(1183,53,1,'','','','','',''),(1184,53,1,'','','','','',''),(1185,53,1,'','','','','',''),(1186,53,1,'','','','','',''),(1187,53,1,'','','','','',''),(1188,53,1,'','','','','',''),(1189,53,1,'','','','','',''),(1190,53,1,'','','','','',''),(1191,53,1,'','','','','',''),(1192,53,1,'','','','','',''),(1193,53,1,'','','','','',''),(1194,53,1,'','','','','',''),(1195,53,1,'','','','','',''),(1196,53,1,'','','','','',''),(1197,53,1,'','','','','',''),(1198,53,1,'','','','','',''),(1199,53,1,'','','','','',''),(1200,53,1,'','','','','',''),(1201,53,1,'','','','','',''),(1202,53,1,'','','','','',''),(1203,53,1,'','','','','',''),(1204,53,1,'','','','','',''),(1205,53,1,'','','','','',''),(1206,53,1,'','','','','',''),(1407,68,1,'PP1','PP1 A','PP1 B','PP1 C','PP1 D','A'),(1408,68,1,'PP2 ','PP2   11','PP2 22','PP2 333','PP2 444','A'),(1409,68,1,'','','','','',''),(1410,68,1,'','','','','',''),(1411,68,1,'','','','','',''),(1412,68,1,'','','','','',''),(1413,68,1,'','','','','',''),(1414,68,1,'','','','','',''),(1415,68,1,'','','','','',''),(1416,68,1,'','','','','',''),(1417,68,1,'','','','','',''),(1418,68,1,'','','','','',''),(1419,68,1,'','','','','',''),(1420,68,1,'','','','','',''),(1421,68,1,'','','','','',''),(1422,68,1,'','','','','',''),(1423,68,1,'','','','','',''),(1424,68,1,'','','','','',''),(1425,68,1,'','','','','',''),(1426,68,1,'','','','','',''),(1427,68,1,'','','','','',''),(1428,68,1,'','','','','',''),(1429,68,1,'','','','','',''),(1430,68,1,'','','','','',''),(1431,68,1,'','','','','',''),(1432,68,1,'','','','','',''),(1433,68,1,'','','','','',''),(1434,68,1,'','','','','',''),(1435,68,1,'','','','','',''),(1436,68,1,'','','','','',''),(1437,68,1,'','','','','',''),(1438,68,1,'','','','','',''),(1439,68,1,'','','','','',''),(1440,68,1,'','','','','',''),(1441,68,1,'','','','','',''),(1442,68,1,'','','','','',''),(1443,68,1,'','','','','',''),(1444,68,1,'','','','','',''),(1445,68,1,'','','','','',''),(1446,68,1,'','','','','',''),(1447,68,1,'','','','','',''),(1448,68,1,'','','','','',''),(1449,68,1,'','','','','',''),(1450,68,1,'','','','','',''),(1451,68,1,'','','','','',''),(1452,68,1,'','','','','',''),(1453,68,1,'','','','','',''),(1454,68,1,'','','','','',''),(1455,68,1,'','','','','',''),(1456,68,1,'','','','','',''),(1457,69,1,'JS 1','JS 1 aaa','JS 1 bbb','JS 1ccc','ddddJS 1','A'),(1458,69,1,'JS 2','JS 2 aaa','JS 2 bb','JS 2 ccc','JS 2 ddd','A'),(1459,69,1,'','','','','',''),(1460,69,1,'','','','','',''),(1461,69,1,'','','','','',''),(1462,69,1,'','','','','',''),(1463,69,1,'','','','','',''),(1464,69,1,'','','','','',''),(1465,69,1,'','','','','',''),(1466,69,1,'','','','','',''),(1467,69,1,'','','','','',''),(1468,69,1,'','','','','',''),(1469,69,1,'','','','','',''),(1470,69,1,'','','','','',''),(1471,69,1,'','','','','',''),(1472,69,1,'','','','','',''),(1473,69,1,'','','','','',''),(1474,69,1,'','','','','',''),(1475,69,1,'','','','','',''),(1476,69,1,'','','','','',''),(1477,69,1,'','','','','',''),(1478,69,1,'','','','','',''),(1479,69,1,'','','','','',''),(1480,69,1,'','','','','',''),(1481,69,1,'','','','','',''),(1482,69,1,'','','','','',''),(1483,69,1,'','','','','',''),(1484,69,1,'','','','','',''),(1485,69,1,'','','','','',''),(1486,69,1,'','','','','',''),(1487,69,1,'','','','','',''),(1488,69,1,'','','','','',''),(1489,69,1,'','','','','',''),(1490,69,1,'','','','','',''),(1491,69,1,'','','','','',''),(1492,69,1,'','','','','',''),(1493,69,1,'','','','','',''),(1494,69,1,'','','','','',''),(1495,69,1,'','','','','',''),(1496,69,1,'','','','','',''),(1497,69,1,'','','','','',''),(1498,69,1,'','','','','',''),(1499,69,1,'','','','','',''),(1500,69,1,'','','','','',''),(1501,69,1,'','','','','',''),(1502,69,1,'','','','','',''),(1503,69,1,'','','','','',''),(1504,69,1,'','','','','',''),(1505,69,1,'','','','','',''),(1506,69,1,'','','','','','');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tech_skills`
--

DROP TABLE IF EXISTS `user_tech_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tech_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `score` int NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content_id` int NOT NULL,
  `safety_save` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tech_skills`
--

LOCK TABLES `user_tech_skills` WRITE;
/*!40000 ALTER TABLE `user_tech_skills` DISABLE KEYS */;
INSERT INTO `user_tech_skills` VALUES (145,35,100,'2025-07-27 14:23:59',68,NULL),(147,34,0,'2025-07-28 14:35:54',68,NULL);
/*!40000 ALTER TABLE `user_tech_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (34,'mateo@gmail.com','123456',1,'2025-07-27 14:01:01'),(35,'mateoscarafia@gmail.com','123456',1,'2025-07-27 14:01:13'),(36,'catu@gmail.com','123456',1,'2025-07-27 14:13:38'),(38,'dfsdg','fgdfgdfgd',1,'2025-07-27 14:22:47'),(39,'mat@gmail.com','123456',1,'2025-07-27 14:23:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-28 18:49:38
