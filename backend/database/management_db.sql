-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: management_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `note_diary`
--

DROP TABLE IF EXISTS `note_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_diary` (
  `noted_id` int NOT NULL AUTO_INCREMENT,
  `noted_date` date NOT NULL,
  `noted_title` text NOT NULL,
  `noted_content` text NOT NULL,
  `noted_image` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`noted_id`),
  KEY `fk_note_diary_user_id` (`user_id`),
  CONSTRAINT `fk_note_diary_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_diary`
--

LOCK TABLES `note_diary` WRITE;
/*!40000 ALTER TABLE `note_diary` DISABLE KEYS */;
INSERT INTO `note_diary` VALUES (2,'2023-04-02','Eat all around','It was close to a decade ago. A man was having Thanksgiving dinner at a breakfast diner alone… even pausing right there, no one should be eating Thanksgiving alone. He could not quite get comfy in the booth, and he could not quite figure out when asking for another refill of coffee was too much. The waitress came up to him and asked, “Can I get you anything else, Sir?” At that moment he realized that none of the people around him even knew his name. The depth of the relationship he had with anyone present in that room was displayed as being called “sir.” A formality for those who are anonymous guests in a diner. ','\\uploads\\note_img_edit-1684664772927.jpeg',2),(8,'2023-05-22','Enjoy your life','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?','\\uploads\\note_img_edit-1684677728285.jpeg',1),(9,'2023-05-22','Memory about web pro','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?','\\uploads\\note_img_edit-1684677732185.jpeg',1),(10,'2023-05-22','Go to my world','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?','\\uploads\\note_img_edit-1684677748185.jpeg',1),(11,'2023-05-22','Swimming first time!!','My First Swimming Class A True story.\r\nAt the start of term last year, mum said, “It’s time you learnt to swim. I’ll book you into swimming lessons.” I was worried that the water might be too deep. “What am I going to do?” I thought. Then I had an idea. “I know. I’ll hide.”\r\nWhen the next week arrived I hid in the shed but my mum found me. “The water will be shallow and soon you’ll swim like a fish in our pool at the new house that we’re building.” said mum.\r\nI was not convinced and was still worried but I remembered that my teacher would help me. “Oh no! I don’t even know the teacher. He or she might be mean. Oh but my mum will tell the teacher off if she or he is mean, I thought so I’m not worried any more. Wait! I don’t have goggles. “Mum,” I said, “I don’t have goggles!” “Mum, I don’t have goggles!” “They sell them there at the pool, dear,” mum replied. “0h ok.”','\\uploads\\note_img-1684664806157.jpeg',2),(12,'2023-05-22','I am very happyyy','It’s raining heavily. My dad is holding a lamp and anxiously keeping an eye on the sky and the courtyard. He makes a rough calculation on how much time he has before the study room is flooded. The study room is filled with books, magazines and scripts. Many of them are lying on the floor. He must remove them before the room is flooded. He dips is finger in the pool of water accumulating in the courtyard to assess the gap between rising water and the floor. Two more inches….if he waits till dawn, everything will be lost.\r\n\r\n০০০\r\n\r\n“Just pour two inches of Soda, I will take care of the rest” That’s my friend Aneerbaan. Our parents used to be neighbors. He has come to my house from Assam. More like an in transit stay. Tomorrow morning he would leave for Goa.','\\uploads\\grey.png',2),(13,'2023-05-22','Crazy travel','Now, if you’ve ever ridden this windy bus leg, you know it’s almost impossible not at least feel a little ill. Honestly, if you’re only a bit queasy and not puking out the window, you’re lucky.\r\n\r\nSomehow I actually didn’t feel that unwell, though at one point I did need to use the restroom. Luckily, this bus had a toilet in the back.\r\n\r\nOr maybe that was unlucky, because as I walked down the aisle, a man stood in the center, blocking me.','\\uploads\\note_img-1684664995129.png',2);
/*!40000 ALTER TABLE `note_diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `schedule_date` date NOT NULL,
  `schedule_act` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `fk_schedule_user_id` (`user_id`),
  CONSTRAINT `fk_schedule_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'2023-03-18','Do Homework',1),(2,'2023-03-19','Travel with family',1),(3,'2023-03-21','Go musuem',1),(4,'2023-03-21','Go home',1),(5,'2023-04-01','Exam math mideterm',2),(6,'2023-04-03','Travel with my friend',2),(7,'2023-05-19','DSC Final',1),(9,'2023-05-20','End of semester',1),(10,'2023-06-01','Go home',1),(12,'2023-05-21','Travel with boyfriend',1),(13,'2023-05-22','Present Web Pro',1),(15,'2023-05-22','Go to pattaya',1),(21,'2023-05-22','Swimming with turtles',1),(22,'2023-05-22','Present webpro Project',2),(23,'2023-05-19','Final exam DB',2),(24,'2023-05-30','Present ISAD Project',2),(25,'2023-06-09','Travel with family',2),(26,'2023-05-08','Eng Commu Final',1),(27,'2023-05-09','SE Final',1),(28,'2023-05-10','ISAD Final',1),(29,'2023-05-11','Prob&Stats Final',1),(30,'2023-05-15','Web Pro Final',1),(32,'2023-05-18','Do Web Pro project',1),(33,'2023-05-23','Meeting ISAD',1),(35,'2023-04-28','Submit Eng Commu project',1),(36,'2023-04-05','Study DSC online',1),(37,'2023-04-12','Study DSC online',1),(38,'2023-04-30','Submit ISAD project',1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `to_do_list`
--

DROP TABLE IF EXISTS `to_do_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `to_do_list` (
  `list_id` int NOT NULL AUTO_INCREMENT,
  `list_create_date` date NOT NULL,
  `list_date` date NOT NULL,
  `list_act` text NOT NULL,
  `list_status` tinyint(1) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`list_id`),
  KEY `fk_list_id_user_id` (`user_id`),
  CONSTRAINT `fk_list_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `to_do_list`
--

LOCK TABLES `to_do_list` WRITE;
/*!40000 ALTER TABLE `to_do_list` DISABLE KEYS */;
INSERT INTO `to_do_list` VALUES (1,'2023-02-08','2023-05-22','Do homework',0,1),(2,'2023-02-10','2023-05-22','Clean my room',0,1),(3,'2023-02-15','2023-05-22','Read for exam',0,1),(4,'2023-03-11','2023-03-15','Watch video for exam',0,2),(5,'2023-03-28','2023-03-30','Do webpro Lab',1,2),(12,'2023-05-19','2023-05-19','Do web pro',1,1),(16,'2023-05-21','2023-05-22','Go Home',0,1),(17,'2023-05-21','2023-05-22','Go to market',0,2),(18,'2023-05-21','2023-05-22','Watch series on Netfix',0,2),(19,'2023-05-21','2023-05-22','Go to university',0,2),(20,'2023-05-21','2023-05-21','Meeting web pro',1,1);
/*!40000 ALTER TABLE `to_do_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `fk_tokens_user_id` (`user_id`),
  CONSTRAINT `fk_tokens_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (2,1,'KXuDtA*1/HrRJSMA15p1E&zBQtqHp/g4M1UFN70VTHuWN1dCdDF5vVTg2ufMuy&1RQoqhKQwW=etRbG&/Ew5lTmaifzl!G#QQq3B'),(4,2,'I//XtcqqrCYgp5B85$=dtNxnKWD02rLI/5@V5FPm75$Rf&IeSOs7!9yffO&fF^sEyGd&2lidSc8hZOhq$$VDz/gUp1FNA6ZCpi4c');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Narakorn','Kongsakban','narakornmind@gmail.com','MindNara','$2b$05$wyRzG/XhclRIHRKB99pZ2ehQYdXeRvTAIU2dmfMpoFaOMQ0q7Kzgm','\\uploads\\user_img-1683962683553.png'),(2,'Busabawan','Prasertsuk','modeiei@gmail.com','modeiei','$2b$05$BgpzEneui76aJ6dBraLOCONixBD3qwIuluCK8wK1xWR63reUz5b/K','\\uploads\\user_img-1684664668005.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-21 22:18:54
