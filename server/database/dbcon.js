const mysql = require("mysql");
const pool = mysql.createConnection({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "Bk10244994!",
  database: "nihal"
});
module.exports.pool = pool;
