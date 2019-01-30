const mysql = require('./database/dbcon.js');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

module.exports = function(app) {
    const requireAuth = passport.authenticate('jwt', { session: false });
    const requireSignin = passport.authenticate('local', { session: false });
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    })
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);    
}