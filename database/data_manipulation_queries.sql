--
-- Project Group 120: Karin Ocheretny & Althea Davis
--

--
-- SELECT Queries
--

-- Display the contents of each table

SELECT * FROM Customers;

SELECT * FROM Floors;

SELECT * FROM RoomTypes;

SELECT * FROM FloorsToRoomTypes;

SELECT * FROM Rooms;

SELECT * FROM Bookings;

--
-- INSERT Queries
--

INSERT INTO Customers (name, phone_number, address, email)
VALUES (:name_input, :phone_number_input, :address_input, :email_input);

INSERT INTO Floors (occupied_rooms, empty_rooms, has_facilities)
VALUES (:occupied_rooms_input, :empty_rooms_input, :has_facilities_input);

INSERT INTO RoomTypes (type_name, num_beds, num_baths, is_haunted, price_per_night)
VALUES (:type_name_input, :num_beds_input, :num_baths_input, :is_haunted_input, :price_per_night_input);

INSERT INTO FloorsToRoomTypes (floor_id, room_type_id)
VALUES (:floor_id_input, :room_type_id_input);

INSERT INTO Rooms (room_type_id, floor_id, is_occupied, num_occupants)
VALUES (:room_type_id_inpyt, :floor_id_input, :is_occupied_input, :num_occupants_input);

INSERT INTO Bookings (customer_id, room_id, check_in, check_out)
VALUES (:customer_id_input, :room_id_input, :check_in_input, :check_out_input);

--
-- UPDATE Queries
--

--Querie to null M:M relationship by setting FK to NULL
UPDATE FloorsToRoomTypes
SET floor_id = Null, room_type_id = Null
WHERE floor_id = :floor_id_input AND room_type_id = :room_type_id_input;

--
-- DELETE Queries
--

--Queries to delete M:M relationship eitirly
DELETE FROM FloorsToRoomTypes
WHERE floor_id = :floor_id_input AND room_type_id = :room_type_id_input;
