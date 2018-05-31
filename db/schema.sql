/*Create burgers_db database*/
CREATE DATABASE IF NOT EXISTS `foodfficiency`;

USE `foodfficiency`

/*Create items table*/
CREATE TABLE `foodfficiency`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*Create items table*/
CREATE TABLE `foodfficiency`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `upc` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `expires` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
