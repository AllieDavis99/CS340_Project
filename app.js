const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/index', function (req, res) {
    res.sendfile(publicPath + '/index.html');
});

app.get('/customers', function (req, res) {
    res.sendfile(publicPath + '/customers.html');
});


app.listen(port);
console.log('Server started at http://localhost:' + port);