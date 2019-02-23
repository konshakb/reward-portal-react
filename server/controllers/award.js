const Award = require('../database/queries/award');


exports.createaward = function(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const awardType = req.body.awardType;
    const date = req.body.date;
    const time = req.body.time

    console.log(req.body)
    // Award.getRecipientID(firstName, lastName)
    // .then(recip => {
        // If a user with email doesnt exist, return an error
        // if (recip[0].length === 0) {
        //     return res.status(422).send({ error: 'Recipient does not exist' }); 
        // }
        
        
        // this currently submits a random recipient and sender ID.
        // Correct recipient ID once users can be created with name
        // Correct sender ID once signed in user exists on store
        Award.createAward(1, 2, awardType, date, time)
            .then(result => {
            console.log('Result of award', result);
            res.send(result);
            })
            .catch(reject => {
                console.log(reject)
            })
    
//})
       
}