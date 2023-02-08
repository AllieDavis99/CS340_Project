SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE `Customers`(
  `id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `customer_name` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,  
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE OR REPLACE `Floors`(
  `id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `occupied_rooms` int(11),
  `empty_rooms` int(11),
  `has_facilities` tinyint(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE OR REPLACE `RoomTypes`(
	`id`: int(11) NOT NULL AUTO_INCREMENT,
	`type_name`: varchar(255) NOT NULL,
	`num_beds`: int(11) NOT NULL,
	`nums_baths`: int(11) NOT NULL,
	`is_haunted`: tinyint(1) DEFAULT 0 NOT NULL,
	`price_per_night`: decimal(19,2) NOT NULL,
	PRIMARY KEY(`room_type_id`)

);

CREATE OR REPLACE `Rooms`(
	`id`: int(11) NOT NULL AUTO_INCREMENT,
	`room_type_id`: int(11),
	`floor_id`: int(11),
	`is_occupied`: tinyint(1) DEAFULT 0 NOT NULL,
	`num_occupants`: int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`room_type_id`) REFRENCES `RoomTypes`(`id`),
	FOREIGN KEY(`floor_id`) REFRENCES `Floors`(`id`)

);

CREATE OR REPLACE `Bookings`(
	`id`: int(11) NOT NULL AUTO_INCREMENT,
	`customer_id`: int(11),
	`room_id`: int(11),
	`check_in`: datetime NOT NULL,
	`check_out`: datetime NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`customer_id`) REFRENCES `Customers`(`id`),
	FOREIGN KEY(`room_id`) REFRENCES `Rooms`(`id`)

);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;