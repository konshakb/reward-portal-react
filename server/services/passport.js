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

// TODO: FIX SALT PASSWORD, DOESN'T MATCH ORIGINAL SALTED PASSWORD
const saltPassword = function(password) {
    console.log("Password being salted: ", password);
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) reject(err);
            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            })
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
            // console.log('Result from locallogin', result);
            // console.log('original password', password);
            // console.log('salted password', saltPassword(password));
            // Could not locate user
            if (userResult.length === 0) {
                return done(null, false);
            }
            // Compare password if user email exists
            return comparePassword(password, userResult[0]['password'])
                .then(passwordResult => {
                    if (passwordResult) {
                        console.log('passwordResult', passwordResult);
                        return done(null, passwordResult);
                    }
                    return done(null, false);
                })

            // bcryptHelper.generateSalt()
            //     .then(salt => {
            //         return bcryptHelper.hashPassword(password, salt)
            //             .then(hashedPassword => {
            //                 console.log('hashedPassword ', hashedPassword)
            //                 console.log('original password', password);
            //                 if (hashedPassword !== result[0]['password']) {
            //                     return done(null, false);
            //                 }
            //                 return done(null, result);
            //             })
            //     })

            // TODO: Original
            // saltPassword(password)
            //     .then(saltedPassword  => {
            //         console.log('saltedPassword', saltedPassword);
            //         console.log('password', password);
            //         console.log('result password', result[0]['password']);
            //         if ('$2a$10$Q3iUipsz0RIhYbw/nbx0yeHJsWRqsmD4AfJjR6gasLqA1Mov0w3a.' !== result[0]['password']) {
            //             return done(null, false);
            //         }
            //         // Found user
            //         return done(null, result);
            //     })
            
            
        })
    // Call done if username and password are correct
    // Otherwise, call done with false
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
passport.use(localLogin);