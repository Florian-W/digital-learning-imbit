/* This Script should be executed by the database admin (e.g. root) to create the database for brillianCRM. */
-- <<Reset database>>
-- Danger!! if the the following statements are uncommented the database and connection user will be reset. Any exising content is lost! Use this in case you want to start with the initial database.
-- DROP USER brilliancrm@localhost;
-- DROP database cake; 

-- <<General Configuration>>
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- <<Create database>>
CREATE DATABASE cake;
USE cake;


-- <<Create tables>>
-- 'group' Table
CREATE TABLE IF NOT EXISTS `group` (
  GROUP_ID int(11) NOT NULL AUTO_INCREMENT,
  GROUP_NAME varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PROFESSOR_ID int(11) NOT NULL,
  PRIMARY KEY (GROUP_ID),
  KEY GROUP_ID (GROUP_ID),
  KEY PROFESSOR_ID (PROFESSOR_ID)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- 'user' Table
CREATE TABLE IF NOT EXISTS user (
  USER_ID int(11) NOT NULL AUTO_INCREMENT,
  EMAIL varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  FIRST_NAME varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  LAST_NAME varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PASSWORD varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  ROLE varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `GROUP` int(10) DEFAULT NULL,
  REG_DATE timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  GENDER tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = MALE, 0 = FEMALE',
  PRIMARY KEY (USER_ID),
  KEY `GROUP` (`GROUP`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

-- 'user_progress' Table 
CREATE TABLE IF NOT EXISTS user_progress (
  USER_ID int(11) NOT NULL,
  COST int(11) NOT NULL,
  QUALITY int(11) NOT NULL,
  TIME int(11) NOT NULL,
  PATH text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (USER_ID),
  KEY USER_ID (USER_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 'settings' Table 
CREATE TABLE IF NOT EXISTS settings (
  ID TINYINT(1) NOT NULL,
  AUDIO BOOLEAN NOT NULL,
  VIDEO BOOLEAN NOT NULL,
  TTS BOOLEAN NOT NULL,
  SUBTITLES BOOLEAN NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- <<Create initial table content>>
-- 'group' Table Content
INSERT INTO `group` (GROUP_ID, GROUP_NAME, PROFESSOR_ID) VALUES
(3, 'WIBI11B', 17), (0, 'Public', 0);

-- 'user' table content
INSERT INTO user (USER_ID, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, ROLE, `GROUP`, REG_DATE, GENDER) VALUES
(16, 'admin@brilliancrm.com', 'Dorothea', 'Langer', '$shiro1$SHA-256$500000$DhdIuSNhEvqrvOmyfIfcuw==$AzmajwrcT/UxrYO50+zkTIFxjyazOhiiAY1xsSyPxBI=', 'admin', NULL, '2014-05-07 15:19:51', 0),
(17, 'dozent@brilliancrm.com', 'Lukas', 'Steigerwald', '$shiro1$SHA-256$500000$DhdIuSNhEvqrvOmyfIfcuw==$AzmajwrcT/UxrYO50+zkTIFxjyazOhiiAY1xsSyPxBI=', 'professor', NULL, '2014-04-13 05:13:08', 1),
(18, 'student@brilliancrm.com', 'Fred', 'Feuerstein', '$shiro1$SHA-256$500000$DhdIuSNhEvqrvOmyfIfcuw==$AzmajwrcT/UxrYO50+zkTIFxjyazOhiiAY1xsSyPxBI=', 'student', 3, '2014-04-21 14:45:32', 1),
(0, 'public@brilliancrm.com', 'Public', 'Public', '$shiro1$SHA-256$500000$DhdIuSNhEvqrvOmyfIfcuw==$AzmajwrcT/UxrYO50+zkTIFxjyazOhiiAY1xsSyPxBI=', 'professor', NULL, '2014-04-21 14:45:32', 1);

-- 'user_progress' content
INSERT INTO user_progress (USER_ID, COST, QUALITY, TIME, PATH) VALUES
(18, 0, 0, 0, 'l000e000');

-- 'settings' content
INSERT INTO settings (ID, AUDIO, VIDEO, TTS, SUBTITLES) VALUES
(1, true, true, true, true);


-- <<Create Constraints>>
-- for table 'group'
ALTER TABLE `group`
  ADD CONSTRAINT group_ibfk_1 FOREIGN KEY (PROFESSOR_ID) REFERENCES user (USER_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- for table 'user'
ALTER TABLE user
  ADD CONSTRAINT user_ibfk_1 FOREIGN KEY (`GROUP`) REFERENCES `group` (GROUP_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- for table 'user_progress'
ALTER TABLE user_progress
  ADD CONSTRAINT user_progress_ibfk_1 FOREIGN KEY (USER_ID) REFERENCES user (USER_ID) ON DELETE CASCADE ON UPDATE CASCADE;

  
-- <<Create Users>>
CREATE USER brilliancrm@localhost identified by 'crm@IMBIT'; -- //TODO remove password

GRANT ALL PRIVILEGES ON cake.* TO brilliancrm@localhost;