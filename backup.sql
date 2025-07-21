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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_content`
--

LOCK TABLES `company_content` WRITE;
/*!40000 ALTER TABLE `company_content` DISABLE KEYS */;
INSERT INTO `company_content` VALUES (19,1,26),(20,1,27),(21,1,28),(22,1,29),(23,1,30);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (26,'javascript','4931872380.pdf'),(27,'Python','7904296560.pdf'),(28,'JAVA','9565407869.pdf'),(29,'C·','5606421837.pdf'),(30,'GO Lang','9721680531.pdf');
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
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (157,19,1,'JS1111111','AA','BB','CC','DDD','D'),(158,19,1,'uuuuuu','','','','',''),(159,19,1,'JS 344444444','AA','BB','CC','DD','A'),(160,19,1,'','','','','',''),(161,19,1,'','','','','',''),(162,19,1,'','','','','',''),(163,19,1,'','','','','',''),(164,19,1,'','','','','',''),(165,19,1,'','','','','',''),(166,19,1,'','','','','',''),(167,19,1,'JS 11','AA','BB','CC','DDD','A'),(168,19,1,'','','','','',''),(169,19,1,'','','','','',''),(170,19,1,'','','','','',''),(171,19,1,'','','','','',''),(172,19,1,'','','','','',''),(173,19,1,'','','','','',''),(174,19,1,'','','','','',''),(175,19,1,'','','','','',''),(176,19,1,'','','','','',''),(177,19,1,'uuuuuuuuuuu','','','','',''),(178,19,1,'','','','','',''),(179,19,1,'','','','','',''),(180,19,1,'','','','','',''),(181,19,1,'','','','','',''),(182,19,1,'','','','','',''),(183,19,1,'','','','','',''),(184,19,1,'','','','','',''),(185,19,1,'','','','','',''),(186,19,1,'','','','','',''),(187,19,1,'','','','','',''),(188,19,1,'','','','','',''),(189,19,1,'','','','','',''),(190,19,1,'','','','','',''),(191,19,1,'','','','','',''),(192,19,1,'','','','','',''),(193,19,1,'','','','','',''),(194,19,1,'','','','','',''),(195,19,1,'','','','','',''),(196,19,1,'','','','','',''),(197,19,1,'','','','','',''),(198,19,1,'','','','','',''),(199,19,1,'','','','','',''),(200,19,1,'','','','','',''),(201,19,1,'','','','','',''),(202,19,1,'','','','','',''),(203,19,1,'','','','','',''),(204,19,1,'','','','','',''),(205,19,1,'','','','','',''),(206,19,1,'','','','','','');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tech_skills`
--

LOCK TABLES `user_tech_skills` WRITE;
/*!40000 ALTER TABLE `user_tech_skills` DISABLE KEYS */;
INSERT INTO `user_tech_skills` VALUES (35,16,100,'2025-07-21 01:45:45',19,NULL),(36,16,0,'2025-07-21 01:46:24',21,'is_for_safety');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'mateo@gmail.com','123456',1,'2025-07-17 21:27:41');
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

-- Dump completed on 2025-07-21  8:21:08
