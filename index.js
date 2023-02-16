const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/customers.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/customers.html'));
});

app.get('/floors.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/floors.html'));
});

app.get('/rooms.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/rooms.html'));
});

app.get('/roomtypes.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/roomtypes.html'));
});
app.get('/bookings.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/bookings.html'));
});


app.listen(port);
console.log('Server started at http://localhost:' + port);