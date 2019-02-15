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
('Employee of the Day'),
('Employee of the Week'),
('Employee of Century');

-- Use table
-- Note: All values for user besides email and password set to null
-- for authentication testing
CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(50) NOT NULL,
    UNIQUE INDEX `email` (`email`),
    `password` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR (50) NULL,
    `last_name` VARCHAR(50) NULL,
    `region_id` INT(11) NULL,
    CONSTRAINT `fk_region_id`
    FOREIGN KEY(`region_id`) REFERENCES `region` (`region_id`),
    `created_on` DATE NULL,
    `signature_path` VARCHAR(50) NULL,
    `admin` INT(11) DEFAULT 0
);

INSERT INTO user (email, password, admin) VALUES
('admin@admin.com', '$2a$10$RyDsLR85bZxm5mqm7Xeh8.rzENrSTC6RvTg.MfUNW8NZA1k6aP3uy', 1),
('a@a.com', '$2a$10$EiLglk8ytUdhGZ0dCXrsl.jkHlaJDXdouXBMGiPk7BcacSiYVYpsC', 0);

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