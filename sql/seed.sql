-- Region table
CREATE TABLE `region` (
    `region_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `region_name` VARCHAR(20)
);

-- Seed data for region table
INSERT INTO region (region_name) VALUES
('North Ameriaca'),
('South America'),
('Asia');

-- Award type table
CREATE TABLE `award_type` (
    `award_type_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `award_name` VARCHAR(50)
);

-- Seed data for award_type
INSERT INTO award_type (award_name) VALUES
('Employee of the Month'),
('Employee of the Year'),
('Employee of Century');

-- Admin table
CREATE TABLE `admin` (
    `admin_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    UNIQUE INDEX `email` (`email`),
    `password` VARCHAR(30) NOT NULL
);

-- Seed data for admin
INSERT INTO admin (email, password) VALUES
('admin@admin.com', 'admin');

-- User table
CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    UNIQUE INDEX `email` (`email`),
    `password` VARCHAR(50) NOT NULL,
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

-- Seed data for user table
INSERT INTO user (email, password, first_name, last_name, region_id, created_on, signature_path, created_by_admin_id) VALUES
('bryan@bryan.com', 'bryan', 'Bryan', 'Le', 1, now(), '/bryan', 1),
('bob@bob.com', 'bob', 'Bob', 'Le', 1, now(), '/bob', 1);


-- Version 2 (testing)
CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    UNIQUE INDEX `email` (`email`),
    `password` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR (50) NULL,
    `last_name` VARCHAR(50) NULL,
    `region_id` INT(11) DEFAULT 1,
    CONSTRAINT `fk_region_id`
    FOREIGN KEY(`region_id`) REFERENCES `region` (`region_id`),
    `created_on` DATE NULL,
    `signature_path` VARCHAR(50),
    `created_by_admin_id` INT(11) DEFAULT 0,
    CONSTRAINT `fk_created_by_admin_id`
    FOREIGN KEY(`created_by_admin_id`) REFERENCES `admin` (`admin_id`),
    `admin` BOOLEAN DEFAULT false
);

-- Version 2 (testing)
INSERT INTO user (email, password) VALUES
('bryan@bryan.com', 'bryan'),
('bob@bob.com', 'bob');


-- Award table
CREATE TABLE `award` (
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

INSERT INTO award (recipient_id, sender_id, type, award_date) VALUES
(1, 2, 1, now());