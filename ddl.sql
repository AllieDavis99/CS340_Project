--Project Group 120: Karin Ocheretny & Althea Davis

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

--
-- CREATE TABLES
--
CREATE OR REPLACE TABLE `Customers`(
  `id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,  
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE OR REPLACE TABLE `Floors`(
  `id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `occupied_rooms` int(11),
  `empty_rooms` int(11),
  `has_facilities` tinyint(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY(`id`)
);


CREATE OR REPLACE TABLE `RoomTypes`(
	`id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
	`type_name` varchar(255) NOT NULL,
	`num_beds` int(11) NOT NULL,
	`num_baths` int(11) NOT NULL,
	`is_haunted` tinyint(1) DEFAULT 0 NOT NULL,
	`price_per_night` decimal(19,2) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE OR REPLACE TABLE `FloorToRoomTypes` (
	`floor_id` int(11), 
	`room_type_id` int(11),
	PRIMARY KEY(`floor_id`, `room_type_id`),
	FOREIGN KEY(`floor_id`) REFERENCES `Floors`(`id`),
	FOREIGN KEY(`room_type_id`) REFERENCES `RoomType`(`id`)
);


CREATE OR REPLACE TABLE `Rooms`(
	`id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
	`room_type_id` int(11) NOT NULL,
	`floor_id` int(11) NOT NULL,
	`is_occupied` tinyint(1) DEFAULT 0 NOT NULL,
	`num_occupants` int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`room_type_id`) REFERENCES  `RoomTypes`(`id`),
	FOREIGN KEY(`floor_id`) REFERENCES  `Floors`(`id`)
);


CREATE OR REPLACE TABLE `Bookings`(
	`id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
	`customer_id` int(11) NOT NULL,
	`room_id` int(11) NOT NULL,
	`check_in` datetime NOT NULL,
	`check_out` datetime NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`customer_id`) REFERENCES  `Customers`(`id`),
	FOREIGN KEY(`room_id`) REFERENCES  `Rooms`(`id`)
);

CREATE OR REPLACE TABLE `BookingsToRoomTypes`(
	`booking_id` int(11),
	`room_type_id` int(11),
	PRIMARY KEY (`booking_id`, `room_type_id`),
	FOREIGN KEY (`booking_id`) REFERENCES `Bookings`(`id`),
	FOREIGN KEY (`room_type_id`) REFERENCES `RoomTypes`(`id`)
);

--
-- INSERT SAMPLE DATA
--

INSERT INTO Customers (name, phone_number, address, email)
VALUES ("Jack Torrance", 5005555555, "27500 E Timberline Rd, OR 97028", "jtorrance@hello.com"),
("Dick Hallorann", 4511234567, "1 Ahwahnee Dr, CA 95389", "dhallorann@hello.com"),
("Louise Grady", 1002003000, "333 Wonderview Ave, CO 80517", "gradyX2@hello.com");

INSERT INTO Floors (occupied_rooms, empty_rooms, has_facilities)
VALUES(1,10,true),
(2,9,true),
(0,11,false);

INSERT INTO RoomTypes (type_name, num_beds, num_baths, is_haunted, price_per_night)
VALUES("Suite", 2, 2, true, 209.25),
("Queen", 1, 1, false, 156.97),
("Economy", 1, 1, false, 79.24);

INSERT INTO Rooms (room_type_id, floor_id, is_occupied, num_occupants)
VALUES((SELECT id FROM RoomTypes WHERE type_name = "Suite"), 1, true, 3),
((SELECT id FROM RoomTypes WHERE type_name = "Queen"), 1, false, 0),
((SELECT id FROM RoomTypes WHERE type_name = "Economy"), 2, true, 1),
((SELECT id FROM RoomTypes WHERE type_name = "Queen"), 3, true, 1);

INSERT INTO Bookings (customer_id, room_id, check_in, check_out)
VALUES ((SELECT id FROM Customers WHERE name = "Jack Torrance"), (SELECT id FROM Rooms WHERE num_occupants = 3), '1977-11-20', '1977-12-08'),
((SELECT id FROM Customers WHERE name = "Dick Hallorann"), (SELECT id FROM Rooms WHERE num_occupants = 1 and floor_id = 2), '1977-11-01', '1977-11-21'),
((SELECT id FROM Customers WHERE name = "Louise Grady"), (SELECT id FROM Rooms WHERE num_occupants = 1 and floor_id = 3), '1960-01-01', '2023-01-01');


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
