const mysql = require('./database/dbcon.js');
const Authentication = require('./controllers/authentication');

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