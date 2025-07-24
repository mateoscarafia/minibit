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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_content`
--

LOCK TABLES `company_content` WRITE;
/*!40000 ALTER TABLE `company_content` DISABLE KEYS */;
INSERT INTO `company_content` VALUES (30,1,37),(32,1,39),(33,1,40),(40,1,47),(48,1,55);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (47,'JAVA','4806648293.pdf'),(55,'WWWWW','2337294342.pdf');
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
) ENGINE=InnoDB AUTO_INCREMENT=1307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1107,53,1,'','','','','',''),(1108,53,1,'','','','','',''),(1109,53,1,'','','','','',''),(1110,53,1,'','','','','',''),(1111,53,1,'','','','','',''),(1112,53,1,'','','','','',''),(1113,53,1,'','','','','',''),(1114,53,1,'','','','','',''),(1115,53,1,'','','','','',''),(1116,53,1,'','','','','',''),(1117,53,1,'','','','','',''),(1118,53,1,'','','','','',''),(1119,53,1,'','','','','',''),(1120,53,1,'','','','','',''),(1121,53,1,'','','','','',''),(1122,53,1,'','','','','',''),(1123,53,1,'','','','','',''),(1124,53,1,'','','','','',''),(1125,53,1,'','','','','',''),(1126,53,1,'','','','','',''),(1127,53,1,'','','','','',''),(1128,53,1,'','','','','',''),(1129,53,1,'','','','','',''),(1130,53,1,'','','','','',''),(1131,53,1,'','','','','',''),(1132,53,1,'','','','','',''),(1133,53,1,'','','','','',''),(1134,53,1,'','','','','',''),(1135,53,1,'','','','','',''),(1136,53,1,'','','','','',''),(1137,53,1,'','','','','',''),(1138,53,1,'','','','','',''),(1139,53,1,'','','','','',''),(1140,53,1,'','','','','',''),(1141,53,1,'','','','','',''),(1142,53,1,'','','','','',''),(1143,53,1,'','','','','',''),(1144,53,1,'','','','','',''),(1145,53,1,'','','','','',''),(1146,53,1,'','','','','',''),(1147,53,1,'','','','','',''),(1148,53,1,'','','','','',''),(1149,53,1,'','','','','',''),(1150,53,1,'','','','','',''),(1151,53,1,'','','','','',''),(1152,53,1,'','','','','',''),(1153,53,1,'','','','','',''),(1154,53,1,'','','','','',''),(1155,53,1,'','','','','',''),(1156,53,1,'','','','','',''),(1157,53,1,'','','','','',''),(1158,53,1,'','','','','',''),(1159,53,1,'','','','','',''),(1160,53,1,'','','','','',''),(1161,53,1,'','','','','',''),(1162,53,1,'','','','','',''),(1163,53,1,'','','','','',''),(1164,53,1,'','','','','',''),(1165,53,1,'','','','','',''),(1166,53,1,'','','','','',''),(1167,53,1,'','','','','',''),(1168,53,1,'','','','','',''),(1169,53,1,'','','','','',''),(1170,53,1,'','','','','',''),(1171,53,1,'','','','','',''),(1172,53,1,'','','','','',''),(1173,53,1,'','','','','',''),(1174,53,1,'','','','','',''),(1175,53,1,'','','','','',''),(1176,53,1,'','','','','',''),(1177,53,1,'','','','','',''),(1178,53,1,'','','','','',''),(1179,53,1,'','','','','',''),(1180,53,1,'','','','','',''),(1181,53,1,'','','','','',''),(1182,53,1,'','','','','',''),(1183,53,1,'','','','','',''),(1184,53,1,'','','','','',''),(1185,53,1,'','','','','',''),(1186,53,1,'','','','','',''),(1187,53,1,'','','','','',''),(1188,53,1,'','','','','',''),(1189,53,1,'','','','','',''),(1190,53,1,'','','','','',''),(1191,53,1,'','','','','',''),(1192,53,1,'','','','','',''),(1193,53,1,'','','','','',''),(1194,53,1,'','','','','',''),(1195,53,1,'','','','','',''),(1196,53,1,'','','','','',''),(1197,53,1,'','','','','',''),(1198,53,1,'','','','','',''),(1199,53,1,'','','','','',''),(1200,53,1,'','','','','',''),(1201,53,1,'','','','','',''),(1202,53,1,'','','','','',''),(1203,53,1,'','','','','',''),(1204,53,1,'','','','','',''),(1205,53,1,'','','','','',''),(1206,53,1,'','','','','',''),(1207,47,1,'AAAA','ss','ss','ss','sss','B'),(1208,47,1,'','','','','',''),(1209,47,1,'CCCCCC','cc','cc','cc','ccc','B'),(1210,47,1,'','','','','',''),(1211,47,1,'','','','','',''),(1212,47,1,'','','','','',''),(1213,47,1,'','','','','',''),(1214,47,1,'','','','','',''),(1215,47,1,'','','','','',''),(1216,47,1,'','','','','',''),(1217,47,1,'','','','','',''),(1218,47,1,'','','','','',''),(1219,47,1,'','','','','',''),(1220,47,1,'','','','','',''),(1221,47,1,'','','','','',''),(1222,47,1,'','','','','',''),(1223,47,1,'','','','','',''),(1224,47,1,'','','','','',''),(1225,47,1,'','','','','',''),(1226,47,1,'','','','','',''),(1227,47,1,'','','','','',''),(1228,47,1,'','','','','',''),(1229,47,1,'','','','','',''),(1230,47,1,'','','','','',''),(1231,47,1,'','','','','',''),(1232,47,1,'','','','','',''),(1233,47,1,'','','','','',''),(1234,47,1,'','','','','',''),(1235,47,1,'','','','','',''),(1236,47,1,'','','','','',''),(1237,47,1,'','','','','',''),(1238,47,1,'','','','','',''),(1239,47,1,'','','','','',''),(1240,47,1,'','','','','',''),(1241,47,1,'','','','','',''),(1242,47,1,'','','','','',''),(1243,47,1,'','','','','',''),(1244,47,1,'','','','','',''),(1245,47,1,'','','','','',''),(1246,47,1,'','','','','',''),(1247,47,1,'','','','','',''),(1248,47,1,'','','','','',''),(1249,47,1,'','','','','',''),(1250,47,1,'','','','','',''),(1251,47,1,'','','','','',''),(1252,47,1,'','','','','',''),(1253,47,1,'','','','','',''),(1254,47,1,'','','','','',''),(1255,47,1,'','','','','',''),(1256,47,1,'','','','','',''),(1257,55,1,'WWWWW','11','222','333','4444','B'),(1258,55,1,'\"\"\"','2222','22','222','222','B'),(1259,55,1,'','','','','',''),(1260,55,1,'','','','','',''),(1261,55,1,'','','','','',''),(1262,55,1,'','','','','',''),(1263,55,1,'','','','','',''),(1264,55,1,'','','','','',''),(1265,55,1,'','','','','',''),(1266,55,1,'','','','','',''),(1267,55,1,'','','','','',''),(1268,55,1,'','','','','',''),(1269,55,1,'','','','','',''),(1270,55,1,'','','','','',''),(1271,55,1,'','','','','',''),(1272,55,1,'','','','','',''),(1273,55,1,'','','','','',''),(1274,55,1,'','','','','',''),(1275,55,1,'','','','','',''),(1276,55,1,'','','','','',''),(1277,55,1,'','','','','',''),(1278,55,1,'','','','','',''),(1279,55,1,'','','','','',''),(1280,55,1,'','','','','',''),(1281,55,1,'','','','','',''),(1282,55,1,'','','','','',''),(1283,55,1,'','','','','',''),(1284,55,1,'','','','','',''),(1285,55,1,'','','','','',''),(1286,55,1,'','','','','',''),(1287,55,1,'','','','','',''),(1288,55,1,'','','','','',''),(1289,55,1,'','','','','',''),(1290,55,1,'','','','','',''),(1291,55,1,'','','','','',''),(1292,55,1,'','','','','',''),(1293,55,1,'','','','','',''),(1294,55,1,'','','','','',''),(1295,55,1,'','','','','',''),(1296,55,1,'','','','','',''),(1297,55,1,'','','','','',''),(1298,55,1,'','','','','',''),(1299,55,1,'','','','','',''),(1300,55,1,'','','','','',''),(1301,55,1,'','','','','',''),(1302,55,1,'','','','','',''),(1303,55,1,'','','','','',''),(1304,55,1,'','','','','',''),(1305,55,1,'','','','','',''),(1306,55,1,'','','','','','');
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tech_skills`
--

LOCK TABLES `user_tech_skills` WRITE;
/*!40000 ALTER TABLE `user_tech_skills` DISABLE KEYS */;
INSERT INTO `user_tech_skills` VALUES (131,32,0,'2025-07-24 19:23:29',47,'is_for_safety'),(133,32,0,'2025-07-24 19:24:02',55,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (24,'chancho@gmail.com','123456',1,'2025-07-22 17:54:20'),(26,'sdasdasdas','sdsdasdasd',1,'2025-07-23 21:54:30'),(28,'germo@aaa.com','123456',1,'2025-07-24 19:00:04'),(30,'maa@gmail.com','123456',1,'2025-07-24 19:02:35'),(32,'aaa','aaaa',1,'2025-07-24 19:23:11');
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

-- Dump completed on 2025-07-24 18:04:35
