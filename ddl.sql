CREATE OR REPLACE Customers(
  customer_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  customer_name varchar(255) NOT NULL,
  phone_number int(11) NOT NULL,  
  address varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE OR REPLACE Floors(
  floor_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  occupied_rooms int(11),
  empty_rooms int(11),
  has_facilities bool NOT NULL,
  PRIMARY KEY(floor_id)
);

CREATE OR REPLACE RoomTypes();

CREATE OR REPLACE Rooms();

CREATE OR REPLACE Bookings();
