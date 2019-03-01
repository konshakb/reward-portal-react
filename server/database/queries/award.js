const mysql = require('../dbcon');


module.exports = {
    createAward: function(recipientID, senderID, awardType, date, time) {
        return new Promise(function(resolve, reject) {
            const params = [recipientID, senderID, awardType, date, time];
            mysql.pool.query('INSERT INTO award (recipient_id, sender_id, type, award_date, award_time) VALUES (?,?,?,?,?)', params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    },
    getRecipientID: function(firstName, lastName) {
        return new Promise(function(resolve, reject) {
            const params = [firstName, lastName];
            mysql.pool.query('SELECT user_id FROM user WHERE first_name=? and last_name=?', params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    },
    getEmployees: function() {
        return new Promise(function(resolve, reject) {
            //const params = [firstName, lastName];
            mysql.pool.query('SELECT user_id, CONCAT(first_name, " ", last_name) as name FROM user WHERE admin = 0', 
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })        
    }

}