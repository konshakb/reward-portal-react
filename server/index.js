const express = require('express');
const path = require('path');
// const router = require('./routes');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;

app.get('/api/test', function(req, res) {
    console.log('Established connection to /api/test');
    res.send('Hello');
})

app.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
})