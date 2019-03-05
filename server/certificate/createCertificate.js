const mysql = require('../database/dbcon.js');
const latex = require('node-latex')
const path = require('path')
const fs = require('fs')
const mailCert = require("../certificate/mailCertificate")

// stupid windows, will fix later
const sig_path = path.resolve('./certificate/signatures').replace(/\\/g, '/') + '/';
const bg_path = path.resolve('./certificate/').replace(/\\/g, '/') + '/';

module.exports = {
sleep: function(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
},

mailCert: function(certInfo) {
	module.exports.sleep(5000).then(() => {
		mailCert.email(certInfo);
	  })
},

// builds latex file and outputs to PDF in current dir
makePDF: function(certInfo) {
	const input = fs.createReadStream("./certificate/temp_cert.tex")
	const output = fs.createWriteStream('./certificate/certificate.pdf')
	const pdf = latex(input)
	
	pdf.pipe(output)
	pdf.on('error', err => console.error(err))
	pdf.on('finish', () => console.log('PDF generated!'))
	//fs.unlinkSync("./certificate/temp_cert.tex") // delete temp file. This is causing a bug for some reason
	module.exports.mailCert(certInfo);
},


read: function(srcPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(srcPath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
				var certFill = {
					TYPE_AWARD: certInfo.awardType,
					RECIPIENT: certInfo.recipient,
					SENDER: certInfo.sender,
					DATE_AWARDED: certInfo.date,
					// The following two fields need absolute paths since it will be hardcoded into the temp latex file
					SIGNATURE: sig_path + certInfo.signature,
					BACKGROUND_IMG: bg_path + 'bg.png'	
				};
				results = data.replace(/TYPE_AWARD|RECIPIENT|SENDER|DATE_AWARDED|SIGNATURE|BACKGROUND_IMG/gi, (matched) =>{
					return certFill[matched];
				});
                resolve(results);
            }
        });
    })
},

write: function(savPath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(savPath, data, 'utf8', (err)=>{
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
},

editTemplate: function(certInfo) {
	module.exports.read("./certificate/cert_template.tex").then(function(results){
	return module.exports.write("./certificate/temp_cert.tex",results);
	 }).then(function(){
		module.exports.makePDF(certInfo) 
	 })
},

getAwardType: function(awardID, formEmail) {
	certInfo = {}
	mysql.pool.query(
	`SELECT award_type.award_name 
	FROM (award INNER JOIN award_type on award.type = award_type.award_type_id) 
	WHERE award.award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award type.');
		else {
			var awardType = JSON.parse(JSON.stringify(results[0]));
			certInfo.awardType = awardType.award_name;
			module.exports.getRecipient(awardID, certInfo, formEmail);
			
		}
  });
},

getRecipient: function(awardID, certInfo, formEmail) {
	mysql.pool.query(
	`SELECT CONCAT(user.first_name, " ", user.last_name) AS full_name, user.email 
	FROM (award INNER JOIN user on award.recipient_id = user.user_id) 
	WHERE award.award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award recipient.');
		else {
			var recipient = JSON.parse(JSON.stringify(results[0]));
			certInfo.recipient = recipient.full_name;
			if (recipient.email != formEmail) {
				certInfo.email = (recipient.email + ', ' + formEmail);
			} 
			else {
				certInfo.email = recipient.email;
			}
			module.exports.getSender(awardID, certInfo);
		}
  });
},

getSender: function(awardID, certInfo) {
	mysql.pool.query(
	`SELECT CONCAT(user.first_name, " ", user.last_name) AS full_name, user.signature_path 
	FROM (award INNER JOIN user on award.sender_id = user.user_id) 
	WHERE award.award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award sender.');
		else {
			var sender = JSON.parse(JSON.stringify(results[0]));
			certInfo.sender = sender.full_name;
			certInfo.signature = sender.signature_path;
			module.exports.getDate(awardID, certInfo);
		}
  });
},

getDate: function(awardID, certInfo) {
	mysql.pool.query(
	`SELECT DATE_FORMAT(award_date, "%m/%d/%Y") AS award_date 
	FROM award WHERE award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award date.');
		else {
			var date = JSON.parse(JSON.stringify(results[0]));
			certInfo.date = date.award_date;
			module.exports.editTemplate(certInfo);
		}
  });
}
}