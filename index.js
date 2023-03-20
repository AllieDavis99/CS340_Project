const express = require('express');
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8934;

var db = require('./database/db_connector.js')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { query } = require('express')

app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');



//
//ROUTES
//



app.get('http://flip2.engr.oregonstate.edu:8378/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// *********************** CUSTOMERS ****************************/

// SELECT
app.get('/customers.hbs', function (req, res) {
    let customer_get_query;

    if (req.query.search_input == undefined){
        customer_get_query = "SELECT * FROM Customers;";   
    }

    else{
        customer_get_query = `SELECT * FROM Customers WHERE name LIKE "${req.query.search_input}"`
    }
    
    db.pool.query(customer_get_query, function (error, rows, fields) {
        res.render('customers', {data: rows})
    })
});


// ADD
app.post('/customers.hbs', function(req, res){
    let data = req.body;

    let customer_insert_query = `INSERT INTO Customers (name, phone_number, address, email) VALUES("${data.name}", "${data.phone_number}", "${data.address}", "${data.email}");`;
    db.pool.query(customer_insert_query, function(error, rows, fields){
        
        if(error){
            console.log(error)
            res.sendStatus(400);
        }

        else{
            query2 = "SELECT * FROM Customers;";
            db.pool.query(query2, function(error, rows, fields){

                if (error){
                    console.log(error)
                    res.sendStatus(400);
                }

                else{
                    res.redirect('/customers.hbs');
                }
            })
        }
    })
});

//DELETE 
app.delete('/delete-customer-ajax/', function(req, res, next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let delete_customer_query = `DELETE FROM Customers WHERE id = ${customerID};`;

    db.pool.query(delete_customer_query, [customerID], function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
            
        }

        else {
            
            res.sendStatus(204);
        }
    })
});

//UPDATES
app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let customerID = parseInt(data.name);
    let phone = parseInt(data.phone);
    let address = data.address;
    let email = data.email;

    let queryUpdateCustomer = `UPDATE Customers SET phone_number = ?, address = ?, email = ? WHERE Customers.id = ?`;
    let selectCustomer = `SELECT * FROM Customers WHERE id = ?`;

    db.pool.query(queryUpdateCustomer, [phone,address, email, customerID], function (error, rows, fields) {
        console.log(phone);
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(selectCustomer, [customerID], function(error, rows, fields){
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })

});

// *******************************************************************/

//*********** BOOKINGS **********************/

//SELECT 
app.get('/bookings.hbs', function (req, res) {
    let booking_get_query = "SELECT * FROM Bookings;";

    //query for dynamicly populated drop-down search with foreign keys
    let get_customers_query = "SELECT * FROM Customers;";
    let get_rooms_query = "SELECT * FROM Rooms;";

    db.pool.query(get_customers_query, function(error, rows, fields){
        let customers = rows;

        db.pool.query(get_rooms_query, function(error, rows, fields){
            let rooms = rows;

            db.pool.query(booking_get_query, function (error, rows, fields) {
                res.render('bookings', { data: rows, customers: customers, rooms: rooms })
            })
        })
    })
});

//ADD
app.post('/bookings.hbs', function(req, res){
    let data = req.body;

    let booking_insert_query = `INSERT INTO Bookings (customer_id, room_id, check_in, check_out) VALUES ('${data.customer_id}', '${data.room_id}', '${data.check_in}', '${data.check_out}');`;
    db.pool.query(booking_insert_query, function(error, rows, fields){
        
        if(error){
            console.log(error)
            res.sendStatus(400);
        }

        else{
            query2 = "SELECT * FROM Bookings;";
            db.pool.query(query2, function(error, rows, fields){

                if (error){
                    console.log(error)
                    res.sendStatus(400);
                }

                else{
                    res.redirect('/bookings.hbs');
                }
            })
        }
    })
});

// ************ ROOMS ***************************/

//SELECT
app.get('/rooms.hbs', function (req, res) {
    let room_get_query = "SELECT * FROM Rooms;";

    //query for dynamicly populated drop-down search with foreign keys
    let query2 = "SELECT * FROM FloorToRoomTypes;";

    db.pool.query(query2, function(error, rows, fields){
        let floorToRoom = rows;

        db.pool.query(room_get_query, function (error, rows, fields) {
            res.render('rooms', { data: rows, floorToRoom: floorToRoom})
        })
    })
});

//ADD
app.post('/rooms.hbs', function (req, res) {
    let data = req.body;

    let query1 = `INSERT INTO Rooms (floor_to_room_type_id, is_occupied, num_occupants) VALUES("${data.floor_to_room_type_id}", "${data.is_occupied}", "${data.num_occupants}");`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }

        else {
            query2 = "SELECT * FROM Rooms;";
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }

                else {
                    res.redirect('/rooms.hbs');
                }
            })
        }
    })
});

// ************************************************/

// *********** ROOM TYPES *************************/

//SELECT
app.get('/roomTypes.hbs', function (req, res) {
    let roomType_get_query = "SELECT * FROM RoomTypes;";
    db.pool.query(roomType_get_query, function (error, rows, fields) {
        res.render('roomTypes', { data: rows })
    })
});

//ADD
app.post('/roomTypes.hbs', function (req, res) {
    let data = req.body;

    let query1 = `INSERT INTO RoomTypes (type_name, num_beds, num_baths, is_haunted, price_per_night) VALUES("${data.type_name}", "${data.num_beds}","${data.num_baths}","${data.is_haunted}","${data.price_per_night}");`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }

        else {
            query2 = "SELECT * FROM RoomTypes;";
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }

                else {
                    res.redirect('/roomTypes.hbs');
                }
            })
        }
    })
});



// ***********************************************//



// **************** FLOORS ********************** // 

//SELECT 
app.get('/floors.hbs', function (req, res) {
    let floors_get_query = "SELECT * FROM Floors;";
    
    db.pool.query(floors_get_query, function (error, rows, fields) {
        res.render('floors', { data: rows })
    })
});

//ADD
app.post('/floors.hbs', function (req, res) {
    let data = req.body;
    let query1 = `INSERT INTO Floors (occupied_rooms, empty_rooms, has_facilities) VALUES("${data.occupied_rooms}", "${data.empty_rooms}", "${data.has_facilities}");`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = "SELECT * FROM Floors;";
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }

                else {
                    res.redirect('/floors.hbs');
                }
            })
        }
    })
});

//DELETE
app.delete('/delete-floor-ajax/', function(req, res, next){
    let data = req.body;
    let floorID = parseInt(data.id);
    let delete_floor_query = `DELETE FROM Floors WHERE id = ${floorID};`;

    db.pool.query(delete_floor_query, [floorID], function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
            
        }

        else {
            
            res.sendStatus(204);
        }
    })
});


//**********************************************************/




//******************** ROOM TYPES PER FLOOR ****************/


//SELECT
app.get('/roomTypesPerfloor.hbs', function (req, res) {
    let booking_get_query = "SELECT * FROM FloorToRoomTypes;";

    //query for dynamicly populated drop-down search with foreign keys
    let get_floors_query = "SELECT * FROM Floors;";
    let get_room_types_query = "SELECT * FROM RoomTypes;";

    db.pool.query(get_floors_query, function(error, rows, fields){
        let floors = rows;

        db.pool.query(get_room_types_query, function(error, rows, fields){
            let room_types = rows;

            db.pool.query(booking_get_query, function (error, rows, fields) {
                res.render('roomTypesPerFloor', { data: rows, floors: floors, room_types: room_types})
            })
        })
    })
});

//ADD 
app.post('/roomTypesPerfloor.hbs', function (req, res) {

    let data = req.body;

    let query1 = `INSERT INTO FloorToRoomTypes (floor_id, room_type_id) VALUES("${data.floor_id}", "${data.room_type_id}");`;
    db.pool.query(query1, function(error, rows, fields){
        
        if(error){
            console.log(error)
            res.sendStatus(400);
        }

        else{
            query2 = "SELECT * FROM FloorToRoomTypes;";
            db.pool.query(query2, function(error, rows, fields){

                if (error){
                    console.log(error)
                    res.sendStatus(400);
                }

                else{
                    res.redirect('/roomTypesPerFloor.hbs');
                }
            })
        }
    })
});

//DELETE
app.delete('/delete-room-per-floor-ajax', function(req, res, next){
    let data = req.body;
    let roomToFloorID = parseInt(data.id);
    let delete_query = `DELETE FROM FloorToRoomTypes WHERE id = ${roomToFloorID};`;

    db.pool.query(delete_query, [roomToFloorID], function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }

        else {
            
            res.sendStatus(204);
        }
    })
});

//UPDATES
app.put("/put-relationship-ajax", function (req, res, next) {
    let data = req.body;

    let relationshipID = parseInt(data.id);
    let floor = parseInt(data.floor);
    let room_type = data.roomType;

    let queryUpdate = `UPDATE FloorToRoomTypes SET floor_id = ?, room_type_id = ? WHERE FloorToRoomTypes.id = ?`;
    let selectquery = `SELECT * FROM FloorToRoomTypes WHERE id = ?`;

    db.pool.query(queryUpdate, [floor, room_type, relationshipID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(selectquery, [relationshipID], function(error, rows, fields){
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })

});

// ***************************************************************************/

app.listen(port, function(){
    console.log('Server started at http://flip3.engr.oregonstate.edu:' + port);
});
