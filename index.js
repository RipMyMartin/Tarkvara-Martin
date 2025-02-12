const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/leht', function(req, res) {
    res.sendFile(path.join(__dirname, "/views/leht/index.html"));
});

app.get('/menu', function(req, res) {
    res.sendFile(path.join(__dirname, "/views/menu/index.html"));
});

app.get('/pildid', function(req, res) {
    res.sendFile(path.join(__dirname, "/views/pildid/index.html"));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);