const mysql = require('./dbcon.js');

const getUsers = function(req, res, next) {
    mysql.pool.query('SELECT * FROM user', function(err, data, fields) {
        console.log('Data', data);
        if (err) {
            next(err);
            return;
        }
        res.send(data);
    })
}

const getUserByEmail = async (email) => {
    return email;
}



module.exports = {
    getUsers,
    getUserByEmail
};