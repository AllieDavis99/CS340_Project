const express = require('express');
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const port = process.env.PORT || 8932;

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

//
//CUSTOMERS ROUTES
//

//GET ROUTES
app.get('/customers.hbs', function (req, res) {
    let customer_get_query = "SELECT * FROM Customers;";
    db.pool.query(customer_get_query, function (error, rows, fields) {
        res.render('customers', {data: rows})
    })
});

//POST ROUTES
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
                    res.send(rows);
                }
            })
        }
    })
});

//DELETE ROUTE
app.delete('/delete-customer/', function(req, res, next){
    let data = req.body;
    let personID = parseInt(data.id);
    let delete_customer_query = `DELETE FROM Customers WHERE id = ?`;

    db.pool.query(delete_customer_query, [customerID], function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }

        else{
            res.sendStatus(204);
        }
    })
});

app.get('/bookings.hbs', function (req, res) {
    let booking_get_query = "SELECT * FROM Bookings;";
    db.pool.query(booking_get_query, function (error, rows, fields) {
        res.render('bookings', { data: rows })
    })
});

app.get('/rooms.hbs', function (req, res) {
    let rooms_get_query = "SELECT * FROM Rooms;";
    db.pool.query(rooms_get_query, function (error, rows, fields) {
        res.render('rooms', { data: rows })
    })
});

app.get('/roomTypes.hbs', function (req, res) {
    let roomType_get_query = "SELECT * FROM RoomTypes;";
    db.pool.query(roomType_get_query, function (error, rows, fields) {
        res.render('roomTypes', { data: rows })
    })
});

app.get('/floors.hbs', function (req, res) {
    let floors_get_query = "SELECT * FROM Floors;";
    db.pool.query(floors_get_query, function (error, rows, fields) {
        res.render('floors', { data: rows })
    })
});

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

app.listen(port, function(){
    console.log('Server started at http://localhost:' + port);
});
