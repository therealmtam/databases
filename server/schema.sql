DROP DATABASE IF EXISTS chat;

CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  roomname varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  username int NOT NULL,
  roomname int NOT NULL,
  text text NOT NULL,
  createdAt timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES users(id),
  FOREIGN KEY (roomname) REFERENCES rooms(id)
);

INSERT INTO users (username) VALUES('Max');
INSERT INTO users (username) VALUES('Sofie');

INSERT INTO rooms (roomname) VALUES('lobby');
INSERT INTO rooms (roomname) VALUES('4chan');

INSERT INTO messages (username, roomname, text) VALUES(1, 2, 'Hello there!');
INSERT INTO messages (username, roomname, text) VALUES(2, 1, 'Cool things');

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

