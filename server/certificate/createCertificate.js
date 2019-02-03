const mysql = require('../database/dbcon.js');
const latex = require('node-latex')
const path = require('path')
const fs = require('fs')

// stupid windows, will fix later
const sig_path = path.resolve('./signatures').replace(/\\/g, '/') + '/';
const bg_path = path.resolve('./').replace(/\\/g, '/') + '/';

// builds latex file and outputs to PDF in current dir
// TODO: add methods to email certificate to recipient email
function makePDF(fs) {
	const input = fs.createReadStream("./temp_cert.tex")
	const output = fs.createWriteStream('./certificate.pdf')
	const pdf = latex(input)
	
	pdf.pipe(output)
	pdf.on('error', err => console.error(err))
	pdf.on('finish', () => console.log('PDF generated!'))
	fs.unlinkSync("./temp_cert.tex") // delete temp file
}

// replaces latex template placeholder data with database data and creates a temp file
function editTemplate(certInfo) {
	fs.copyFile("./cert_template.tex", "./temp_cert.tex", (err) => {
		if (err) throw err;
		console.log('temporary template updated with data');

		fs.readFile("./temp_cert.tex", 'utf8', (err, data) =>{
			if (err) return console.log(err);

			var certFill = {
				TYPE_AWARD: certInfo.awardType,
				RECIPIENT: certInfo.recipient,
				SENDER: certInfo.sender,
				DATE_AWARDED: certInfo.date,
				SIGNATURE: sig_path + certInfo.signature,
				BACKGROUND_IMG: bg_path + 'bg.png'	// eventually will hardcode into latex template
			};

			result = data.replace(/TYPE_AWARD|RECIPIENT|SENDER|DATE_AWARDED|SIGNATURE|BACKGROUND_IMG/gi, (matched) =>{
				return certFill[matched];
			});

			fs.writeFile("./temp_cert.tex", result, 'utf8', (err) =>{
				if (err) return console.log(err);
				else makePDF(fs);
			});
		});
	});
}


function getAwardType(awardID) {
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
			getRecipient(awardID, certInfo);
		}
  });
}



function getRecipient(awardID, certInfo) {
	mysql.pool.query(
	`SELECT CONCAT(user.first_name, " ", user.last_name) AS full_name, user.email 
	FROM (award INNER JOIN user on award.recipient_id = user.user_id) 
	WHERE award.award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award recipient.');
		else {
			var recipient = JSON.parse(JSON.stringify(results[0]));
			certInfo.recipient = recipient.full_name;
			certInfo.email = recipient.email;
			getSender(awardID, certInfo);
		}
  });
}

function getSender(awardID, certInfo) {
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
			getDate(awardID, certInfo);
		}
  });
}

function getDate(awardID, certInfo) {
	mysql.pool.query(
	`SELECT DATE_FORMAT(award_date, "%m/%d/%Y") AS award_date 
	FROM award WHERE award_id = ?;`, awardID, 
	(err, results) =>{
		if (err) console.log('Error while getting award date.');
		else {
			var date = JSON.parse(JSON.stringify(results[0]));
			certInfo.date = date.award_date;
			editTemplate(certInfo);
		}
  });
}
//getAwardType(3);
