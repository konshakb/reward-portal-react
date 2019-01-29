const mysql = require('../database/dbcon.js');
const bcrypt = require('bcrypt-nodejs');

const getUserByEmail = function(email) {
    return new Promise(function(resolve, reject) {
        const params = [email];
        mysql.pool.query('SELECT password FROM user WHERE email = ?', params,
        function(err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const createUser = function(email, password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            let hashedPassword = '';
            if (err) reject(err);
            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) reject(err);
                hashedPassword = hash;
                const params = [email, password];
                const sql = `INSERT INTO user (email, password) VALUES ('${email}','${hashedPassword}')`;
                mysql.pool.query(sql, function(err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            })
        })
    })
}

// Promises or async?
exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    
    // TODO - Add checks for other sign up information once user schema is updated from null
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password.'});
    }
    // Confirm if a user with the given email exists
    getUserByEmail(email)
        .then(user => {
            // If a user with email does exist, return an error
            if (user.length === 1) {
                return res.status(422).send({ error: 'Email is in use' });
            }
            // If a user with email does not exist, create and save user record
            createUser(email, password)
                .then(result => {
                    console.log('Result of newUser', result);
                    res.send(result);
                })
        });


    // Respond to request indicating user was created
}