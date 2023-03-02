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


app.get('/customers.hbs', function (req, res) {
    let customer_get_query = "SELECT * FROM Customers;";
    db.pool.query(customer_get_query, function (error, rows, fields) {
        res.render('customers', {data: rows})
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
    let roomTypesPerfloor_get_query = "SELECT * FROM Floors;";
    db.pool.query(roomTypesPerfloor_get_query, function (error, rows, fields) {
        res.render('roomTypesPerfloor', { data: rows })
    })
});

app.listen(port, function(){
    console.log('Server started at http://localhost:' + port);
});
