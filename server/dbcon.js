const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'database'
});

module.exports.pool = pool;

