const Award = require('../database/queries/award');
const cert = require('../certificate/createCertificate')

exports.createaward = function(req, res, next) {
    const recipientID = req.body.recipientID;
    const email = req.body.email;
    const awardType = req.body.awardType;
    const date = req.body.date;
    const time = req.body.time
    const senderID = req.body.senderID

    console.log(req.body)   
    Award.createAward(recipientID, senderID, awardType, date, time)
        .then(result => {
        console.log('Result of award', result);
        cert.getAwardType(result.insertId, email);
        res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}

exports.getemployees = function(req, res) {
    Award.getEmployees()
    .then(result => {
    console.log('Result of users', result);
    res.send(result);
    })
    .catch(reject => {
        console.log(reject)
    })    
}