DROP DATABASE IF EXISTS database_db;
CREATE DATABASE database_db;

USE database_db;

CREATE TABLE user (
id INT NOT NULL AUTO_INCREMENT,
userName VARCHAR(20) NOT NULL,
eMail VARCHAR(50)NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE raffles (
id INT NOT NULL AUTO_INCREMENT,
raffleName VARCHAR(70) NOT NULL,
PRIMARY KEY (id)  
);
INSERT INTO raffles
VALUES (null, "Liz's car");

INSERT INTO raffles
VALUES (null, "gehrig's car");

INSERT INTO raffles
VALUES (null, "tucker's car");

INSERT INTO user
VALUES (null, "lars", "lbergenwhen@gmail.com");