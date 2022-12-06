DROP DATABASE IF EXISTS `blog`;
CREATE DATABASE `blog`;
USE `blog`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(45) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `img` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5;
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `desc` longtext NOT NULL,
    `img` varchar(255) NOT NULL,
    `cat` varchar(255) NOT NULL,
    `date` datetime NOT NULL,
    `uid` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FK_USER_ID FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE = InnoDB;