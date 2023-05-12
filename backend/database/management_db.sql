-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2023 at 10:40 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `management_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `note_diary`
--

CREATE TABLE `note_diary` (
  `noted_id` int(11) NOT NULL,
  `noted_date` date NOT NULL,
  `noted_title` text NOT NULL,
  `noted_content` text NOT NULL,
  `noted_image` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `note_diary`
--

INSERT INTO `note_diary` (`noted_id`, `noted_date`, `noted_title`, `noted_content`, `noted_image`, `user_id`) VALUES
(1, '2023-04-01', 'Enjoy with life', 'None of us are immune from witnessing change in our own lives or in the lives of others. Change is constant. We make it easiest on ourselves by accepting that fact. Our ability in letting go of the need for control, giving up the insistence that things have to be a certain way, is a courageous gift of freedom.', '', 1),
(2, '2023-04-02', 'Eat all around', 'It was close to a decade ago. A man was having Thanksgiving dinner at a breakfast diner alone… even pausing right there, no one should be eating Thanksgiving alone. He could not quite get comfy in the booth, and he could not quite figure out when asking for another refill of coffee was too much. The waitress came up to him and asked, “Can I get you anything else, Sir?” At that moment he realized that none of the people around him even knew his name. The depth of the relationship he had with anyone present in that room was displayed as being called “sir.” A formality for those who are anonymous guests in a diner. ', '', 2),
(3, '2023-04-03', 'When We Look Like Our Heavenly Father', 'Many of us resemble our parents, whether we take that as a compliment or not! Maybe you say certain phrases they do, or you do a routine chore in a specific and quirky way. Hopefully, we can take the good and learn from the rest when it comes to resembling our parents. But how about our heavenly Father? How do we resemble God? One of the ways we resemble the Father is when we are peacemakers.', '', 1),
(4, '2023-05-02', 'Happy Are the Unhappy', '“Happy are the unhappy” is the irony of Matthew 5:4, which instead of being an oxymoron, it’s a powerful realization of the promised reversal of our sorrows.', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `schedule_date` date NOT NULL,
  `schedule_act` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `schedule_date`, `schedule_act`, `user_id`) VALUES
(1, '2023-03-18', 'Do Homework', 1),
(2, '2023-03-19', 'Travel with family', 1),
(3, '2023-03-21', 'Go musuem', 1),
(4, '2023-03-21', 'Go home', 1),
(5, '2023-04-01', 'Exam math mideterm', 2),
(6, '2023-04-03', 'Travel with my friend', 2);

-- --------------------------------------------------------

--
-- Table structure for table `to-do-list`
--

CREATE TABLE `to-do-list` (
  `list_id` int(11) NOT NULL,
  `list_create_date` date NOT NULL,
  `list_date` date NOT NULL,
  `list_act` text NOT NULL,
  `list_status` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `to-do-list`
--

INSERT INTO `to-do-list` (`list_id`, `list_create_date`, `list_date`, `list_act`, `list_status`, `user_id`) VALUES
(1, '2023-02-08', '2023-02-09', 'Do homework', 0, 1),
(2, '2023-02-10', '2023-02-10', 'Clean my room', 0, 1),
(3, '2023-02-15', '2023-03-01', 'Read for exam', 1, 1),
(4, '2023-03-11', '2023-03-15', 'Watch video for exam', 0, 2),
(5, '2023-03-28', '2023-03-30', 'Do webpro Lab', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `image_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `fname`, `lname`, `email`, `username`, `password`, `image_user`) VALUES
(1, 'Narakorn', 'Kongsakban', 'narakornmind@gmail.com', 'mindnara', '1234', '\\uploads\\user_img-1680624890624.png'),
(2, 'Busabawan', 'Prasertsuk', 'modeiei@gmail.com', 'modeiei', '1234', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note_diary`
--
ALTER TABLE `note_diary`
  ADD PRIMARY KEY (`noted_id`),
  ADD KEY `fk_note_diary_user_id` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_schedule_user_id` (`user_id`);

--
-- Indexes for table `to-do-list`
--
ALTER TABLE `to-do-list`
  ADD PRIMARY KEY (`list_id`),
  ADD KEY `fk_list_id_user_id` (`user_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `fk_tokens_user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note_diary`
--
ALTER TABLE `note_diary`
  MODIFY `noted_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `to-do-list`
--
ALTER TABLE `to-do-list`
  MODIFY `list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note_diary`
--
ALTER TABLE `note_diary`
  ADD CONSTRAINT `fk_note_diary_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_schedule_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `to-do-list`
--
ALTER TABLE `to-do-list`
  ADD CONSTRAINT `fk_list_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `fk_tokens_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
