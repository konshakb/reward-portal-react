const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mysql = require('../database/dbcon');
const bcrypt = require('bcrypt-nodejs');
const bcryptHelper = require('../controllers/encode');

const findUserById = function(id) {
    return new Promise(function(resolve, reject) {
        const params = [id];
        mysql.pool.query('SELECT password FROM user WHERE user_id = ?', params,
        function(err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const findUserByEmail = function(email) {
    return new Promise(function(resolve, reject) {
        const params = [email];
        mysql.pool.query('SELECT password FROM user WHERE email = ?', params,
        function(err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const comparePassword = function(password, hashedPassword) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashedPassword, function(err, res)  {
            if (err) reject(err);
            resolve(res);
        })
    })
}
    
// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this username and password
    findUserByEmail(email)
        .then(userResult => {
            // If user could not be found
            if (userResult.length === 0) {
                return done(null, false);
            }
            // Hashed password queried from database
            const hashedPassword = userResult[0]['password'];
            // Compare password if user email exists
            // comparePassword returns true if password + salt matches the hashedPassword
            return comparePassword(password, hashedPassword)
                .then(passwordResult => {
                    // Call done if username and password are correct
                    if (passwordResult) {
                        return done(null, passwordResult);
                    }
                    // Call done with false if password is incorrect
                    return done(null, false);
                })   
        })
})

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // Payload is the decoded JWT token
    console.log('payload', payload);
    // Determine if the  user ID in the payload exists in the database
    findUserById(payload.sub)
        .then(result => {
            // If user exists, call 'done' with that object
            if (result.length === 1) {
                done(null, result);
            }
            // If user does NOT exist, call done without user object
            else {
                done(null, false);
            }
        });
});

// Configure passport to use JWT strategy and local login
passport.use(jwtLogin); // JWT strategy is for returning users already logged in
passport.use(localLogin); // Local login is for users logging in for the first time