const nodemailer = require("nodemailer");
const oauth = require('./oauth.json')
// const path = require('path')
// const cert_path = path.resolve('./').replace(/\\/g, '/') + '/';

 module.exports = {
     email: function(certInfo) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'nihal.capstone@gmail.com',
            clientId: oauth.client_id,
            clientSecret: oauth.client_secret,
            refreshToken: oauth.refresh_token,
            accessToken: oauth.access_token
        }
    });

    let mailOptions = {
        from: 'nihal.capstone@gmail.com',
        to: certInfo.email, 
        subject: "Nihal Team ~ Congrats! You've been awarded!",
        html: `<p><h2>Congratuations!<h2></p>
        Your colleague has awarded you for all of your hard work. Please see the attached certificate.<br>
        <br>Sincerely,<br> The Nihal Team<br>`,
        attachments: {
            filename: 'certificate.pdf',
            path: './certificate/certificate.pdf' 
        }
    };


    transporter.sendMail(mailOptions, (e, r) =>{
        if (e) console.log(e);
        else console.log(r);
        transporter.close();
    });

}
};
