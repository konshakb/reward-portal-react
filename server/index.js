const express = require('express');
const path = require('path');
const router = require('./router');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('./database/dbcon.js');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3001;

router(app);

app.listen(port, function() {
    console.log('Listening on port: ', port);
})