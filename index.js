const express = require('express');
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8933;

var db = require('./database/db_connector.js')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { query } = require('express')

app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');



//
//ROUTES
//


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


// *********************** CUSTOMERS ****************************/

// SELECT
app.get('/customers.hbs', function (req, res) {
    let customer_get_query = "SELECT * FROM Customers;";
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
    db.pool.query(booking_get_query, function (error, rows, fields) {
        res.render('bookings', { data: rows })
    })
});

// ************ ROOMS ***************************/

//SELECT
app.get('/rooms.hbs', function (req, res) {
    let rooms_get_query = "SELECT * FROM Rooms;";
    db.pool.query(rooms_get_query, function (error, rows, fields) {
        res.render('rooms', { data: rows })
    })
});

//ADD
app.post('/rooms.hbs', function (req, res) {
    let data = req.body;

    let query1 = `INSERT INTO Rooms (is_occupied, num_occupants) VALUES("${data.is_occupied}", "${data.num_occupants}");`;
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


//**********************************************************/




//******************** ROOM TYPES PER FLOOR ****************/


//SELECT
app.get('/roomTypesPerfloor.hbs', function (req, res) {
    let roomTypesPerfloor_get_query = "SELECT * FROM FloorToRoomTypes;";
    let floorID_get_query = "SELECT * FROM Floors"
    db.pool.query(roomTypesPerfloor_get_query, function (error, rows, fields) {
        let RTPF = rows;
        db.pool.query(floorID_get_query, (error, rows, fields) => {
            let FloorIDS = rows;
            let floormap = {}
            FloorIDS.map(Floors => {
                let id = parseInt(Floors.id, 10)
                floormap[id] = Floors["id"]
        
        })

        RTPF = RTPF.map(FloorToRoomTypes => {
            return Object.assign(FloorToRoomTypes, { floor_id: floormap[FloorToRoomTypes.floor_id] })
        })
            return res.render('roomTypesPerfloor', { data: RTPF, FloorIDS: FloorIDS });

    })
})
});


// ***************************************************************************/

app.listen(port, function(){
    console.log('Server started at http://localhost:' + port);
});
