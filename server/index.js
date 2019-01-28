const express = require('express');
const path = require('path');
// const router = require('./routes');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('./dbcon.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;

app.get('/api/test', function(req, res) {
    console.log('Established connection to /api/test');
    res.send('Hello');
})

app.get('/test', function(req, res, next) {
    mysql.pool.query('SELECT * FROM user', function(err, data, fields) {
        console.log('Data', data);
        if (err) {
            next(err);
            return;
        }
    })
})
app.get('/test2', function(req, res, next) {
    mysql.pool.query('SELECT * FROM award', function(err, data, fields) {
        console.log('Data', data);
        if (err) {
            next(err);
            return;
        }
    })
})

app.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
})