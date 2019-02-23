const mysql = require('mysql');
const pool = mysql.createConnection({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'nihal'
});
module.exports.pool = pool;


