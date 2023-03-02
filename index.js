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


app.listen(port, function(){
    console.log('Server started at http://localhost:' + port);
});
