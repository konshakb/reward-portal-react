const express = require('express');
const path = require('path');
const router = require('./router');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('./database/dbcon.js');
// const getUsers = require('./database/queries');
const User = require('./database/queries/user');
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3001;

router(app);
// app.get('/api/test', function(req, res) {
//     console.log('Established connection to /api/test');
//     res.send('Hello');
// })

// const getUserByEmail = function(email) {
//     return new Promise(function(resolve, reject) {
//         const params = [email];
//         mysql.pool.query('SELECT password FROM user WHERE email = ?', params,
//         function(err, data) {
//             if (err) reject(err);
//             resolve(data);
//         })
//     })
// }

// app.get('/test', function(req, res) {
//     getUserByEmail('bryan@bryan.com')
//     .then(function(user) {
//         res.send(user);
//     })
// })


app.listen(port, function() {
    console.log('Listening on port: ', port);
})