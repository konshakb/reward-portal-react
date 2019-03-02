CREATE TABLE `poke_user` (
  `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `region` INT(11)
  UNIQUE INDEX `email` (`email`)
) ENGINE = InnoDB;

CREATE TABLE `poke_address` (
  `address_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `street` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `zipcode` VARCHAR(100) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `customer_id` INT(11) DEFAULT NULL,
    CONSTRAINT `fk_address_user`
    FOREIGN KEY (`customer_id`) REFERENCES `poke_user` (`user_id`)
) ENGINE = InnoDB;

CREATE TABLE `region` (
    `region_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `region_name` VARCHAR(20)
);

CREATE TABLE `award_type` (
    `award_type_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `award_name` VARCHAR(20)
);


CREATE TABLE `admin` (
    `admin_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `password` VARCHAR(30)
);

CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    UNIQUE INDEX `email` (`email`),
    `password` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR (50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `region_id` INT(11) NOT NULL,
    CONSTRAINT `fk_region_id`
    FOREIGN KEY(`region_id`) REFERENCES `region` (`region_id`),
    `created_on` DATE NOT NULL,
    `signature_path` VARCHAR(50),
    `created_by_admin_id` INT(11) NOT NULL,
    CONSTRAINT `fk_created_by_admin_id`
    FOREIGN KEY(`created_by_admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE = InnoDB;

CREATE TABLE `awards` (
    `award_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `recipient_id` INT(11) NOT NULL,
    CONSTRAINT `fk_recipient_id`
    FOREIGN KEY(`recipient_id`) REFERENCES `user` (`user_id`),
    `sender_id` INT(11) NOT NULL,
    CONSTRAINT `fk_sender_id`
    FOREIGN KEY(`sender_id`) REFERENCES `user` (`user_id`),
    `type` INT(11) NOT NULL,
    CONSTRAINT `fk_type`
    FOREIGN KEY(`type`) REFERENCES `award_type` (`award_type_id`),
    `award_date` DATE NOT NULL
);