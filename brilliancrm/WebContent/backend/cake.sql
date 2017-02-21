-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2014 at 05:20 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cake`
--

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `GROUP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `PROFESSOR_ID` int(11) NOT NULL,
  PRIMARY KEY (`GROUP_ID`),
  KEY `GROUP_ID` (`GROUP_ID`),
  KEY `PROFESSOR_ID` (`PROFESSOR_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`GROUP_ID`, `GROUP_NAME`, `PROFESSOR_ID`) VALUES
(3, 'WIBI11B', 17), (0, 'Public', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FIRST_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `LAST_NAME` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `ROLE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `GROUP` int(10) DEFAULT NULL,
  `REG_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `GENDER` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = MALE, 0 = FEMALE',
  PRIMARY KEY (`USER_ID`),
  KEY `GROUP` (`GROUP`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`USER_ID`, `EMAIL`, `FIRST_NAME`, `LAST_NAME`, `PASSWORD`, `ROLE`, `GROUP`, `REG_DATE`, `GENDER`) VALUES
(16, 'admin@brilliancrm.com', 'Dorothea', 'Langer', '$shiro1$SHA-256$500000$8grVZBv2uzF67vH1QnvmYw==$9BXSCdaMW79wi0rfeRbHR80hlguzVVLWy9Zi/R95Pbo=', 'admin', NULL, '2014-05-07 15:19:51', 0),
(17, 'dozent@brilliancrm.com', 'Lukas', 'Steigerwald', '$shiro1$SHA-256$500000$8grVZBv2uzF67vH1QnvmYw==$9BXSCdaMW79wi0rfeRbHR80hlguzVVLWy9Zi/R95Pbo=', 'professor', NULL, '2014-04-13 05:13:08', 1),
(18, 'student@brilliancrm.com', 'Fred', 'Feuerstein', '$shiro1$SHA-256$500000$8grVZBv2uzF67vH1QnvmYw==$9BXSCdaMW79wi0rfeRbHR80hlguzVVLWy9Zi/R95Pbo=', 'student', 3, '2014-04-21 14:45:32', 1),
(0, 'public@brilliancrm.com', 'Public', 'Public', '$shiro1$SHA-256$500000$8grVZBv2uzF67vH1QnvmYw==$9BXSCdaMW79wi0rfeRbHR80hlguzVVLWy9Zi/R95Pbo=', 'professor', NULL, '2014-04-21 14:45:32', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE IF NOT EXISTS `user_progress` (
  `USER_ID` int(11) NOT NULL,
  `COST` int(11) NOT NULL,
  `QUALITY` int(11) NOT NULL,
  `TIME` int(11) NOT NULL,
  `PATH` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `USER_ID` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_progress`
--

INSERT INTO `user_progress` (`USER_ID`, `COST`, `QUALITY`, `TIME`, `PATH`) VALUES
(18, 0, 0, 0, 'l000e000');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_ibfk_1` FOREIGN KEY (`PROFESSOR_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`GROUP`) REFERENCES `group` (`GROUP_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
