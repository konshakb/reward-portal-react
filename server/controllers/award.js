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
    // Award.getRecipientID(firstName, lastName)
    // .then(recip => {
        // If a user with email doesnt exist, return an error
        // if (recip[0].length === 0) {
        //     return res.status(422).send({ error: 'Recipient does not exist' }); 
        // }
        
        Award.createAward(recipientID, senderID, awardType, date, time)
            .then(result => {
            console.log('Result of award', result);
            cert.getAwardType(result.insertId);
            res.send(result);
            })
            .catch(reject => {
                console.log(reject)
            })
    
//})
       
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