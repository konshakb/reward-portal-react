const mysql = require('./database/dbcon.js');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

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

module.exports = function(app) {
    // Intercepts request
    const requireAuth = passport.authenticate('jwt', { session: false });

    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    })

    // Test routes
    app.get('/api/test', function(req, res, next) {
        console.log('Established connection to /api/test');
        res.send('Hello');
    })

    app.get('/test', function(req, res) {
        getUserByEmail('bryan@bryan.com')
        .then(function(user) {
            res.send(user);
        })
    })
    
    app.post('/signup', Authentication.signup);

}