const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('../database/dbcon');

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
            // // If user is not found
            // if (result.length === 0) {
            //     return done(err, false);
            // }
            if (result.length === 1) {
                done(null, result);
            }
            // Did not find a user
            else {
                done(null, false);
            }
        });
    // If it does exist, call 'done' with that object
    // Otherweise, call done without the user object
});

// Configure passport to use JWT strategy
passport.use(jwtLogin);
