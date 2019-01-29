const passport = require('passport');
const config = require('./config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mysql = require('../database/dbcon.js');

const getUserByEmail = function(email) {
    return new Promise(function(resolve, reject) {
        const params = [email];
        mysql.pool.query('SELECT * FROM user WHERE email = ?', params,
        function(err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const getUserById = function(id) {
    return new Promise(function(resolve, reject) {
        const params = [id];
        mysql.pool.query('SELECT * FROM user WHERE user_id = ?', params,
        function(err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

// Create local strategy
const localOptions = { userNameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    getUserByEmail(email)
        .then(user => {
            if (err) return done(err);
            if (user.password !== password) return done(null, false);
            return done(null, user);
        })
        .catch(err => done(err)); // Return error if user cannot be found
})

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest = ExtractJwt.fromHeader('authorization'),
    seretOrKey: config.secret
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // Otherwise, call done without a user object
    getUserById(payload.sub)
        .then(user => {
            done(null, user);
        })
        .catch(() => done(null, false))
})

passport.use(jwtLogin);
passport.use(localLogin);