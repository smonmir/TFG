-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: servigo
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `contrasena` varchar(64) DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (31,'usu4','usu4@gmail.com',NULL,'$2b$10$wM8Bp3Soj5wjZA0i/MqRYeVzUddqBYoSvfuIkQotVMNNRphgeF2YO',2),(33,'usu1@gmail.com','usu1@gmail.com',NULL,'$2b$10$mK.YSr93xguynaKvhzVWkuUCVsqZPAIZLLaqlv//F53CAwoX4l1IO',2),(34,'usu3','usu3@gmail.com',NULL,'$2b$10$d391nJD69RG/vNwHigYl8.EaY7F0MgQIVV75PNE.nCJDh65vxNuDW',2),(35,'usu2','usu2@gmail.com',NULL,'$2b$10$EK.vTODYC33BpL.eWbbOoOz4QaU6XPD.5J7uGo1Zt2q1aVODnzuP6',3),(36,'usu','usu@gmail.com','123456789','$2b$10$jQgpUih/9guF5h7uS47ubOQI9FGesRpls9S/GbQyvyAwdL83lY39i',2),(42,'vendedor1','vendedor1@gmail.com','123456789','$2b$10$gb5sIpPCnXCXOroZofaM9el1ox4KCMYfZAwJchHNy6hGdDX6.D4JS',3),(43,'vendedor2','vendedor2@gmail.com',NULL,'$2b$10$79.m..MMTX.s7uGIyrlyjOpaTeqlgHr5C1XLlb.u15BTzVZdOukwK',3),(44,'santi','monroux.miranda@gmail.com',NULL,'$2b$10$aksmILBcp5KYZC1RJK0YbefkNwIfvbiibF9pFp6SwLHnkcqg7DaQi',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13  0:42:04
