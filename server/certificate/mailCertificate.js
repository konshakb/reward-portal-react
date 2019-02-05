const nodemailer = require("nodemailer");
const oauth = require('./oauth.json')

// need to set this up to be called from the createCert methods 
async function main() {

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
            accessToken: oauth.access_token // check that this is updating later
        }
    });

    let mailOptions = {
        from: 'nihal.capstone@gmail.com',
        to: 'krista.pratico@gmail.com', // this needs to be the recipient email from the cert object
        subject: "Nihal Team ~ Congrats! You've been awarded!",
        html: `<p><h2>Congratuations!<h2></p>
        Your colleague has awarded you for all of your hard work. Please see attached certificate.<br>
        <br>Sincerely,<br> The Nihal Team<br>`,
        attachments: {
            filename: 'certificate.pdf',
            path: 'C:/Users/Krista/Desktop/CSC/Capstone/server/certificate/certificate.pdf' // need to fix this path
        }
    };


    transporter.sendMail(mailOptions, (e, r) =>{
        if (e) console.log(e);
        else console.log(r);
        transporter.close();
    });
}

main().catch(console.error);