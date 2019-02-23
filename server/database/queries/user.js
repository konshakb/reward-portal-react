const mysql = require("../dbcon");
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  findById: function(id) {
    return new Promise(function(resolve, reject) {
      const params = [id];
      mysql.pool.query(
        "SELECT password FROM user WHERE user_id = ?",
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  findByEmail: function(email) {
    return new Promise(function(resolve, reject) {
      const params = [email];
      mysql.pool.query("SELECT * FROM user WHERE email = ?", params, function(
        err,
        data
      ) {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  comparePassword: function(password, hashedPassword) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, hashedPassword, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  create: function(first_name, last_name, region_id, email, password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        let hashedPassword = "";
        if (err) reject(err);
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) reject(err);
          hashedPassword = hash;
          const params = [email, password];
          console.log(first_name + last_name + region_id);
          const sql = `INSERT INTO user (first_name, last_name, region_id, email, password) VALUES ('${first_name}','${last_name}', '${region_id}','${email}','${hashedPassword}')`;
          //const sql = `INSERT INTO user (email, password) VALUES ('${first_name}, ${last_name}, ${region_id}, '${email}','${hashedPassword}')`;
          mysql.pool.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(result);
          });
        });
      });
    });
  },
  createAdmin: function(email, password) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        let hashedPassword = "";
        if (err) reject(err);
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) reject(err);
          hashedPassword = hash;
          const params = [email, password];
          const sql = `INSERT INTO user (email, password, admin) VALUES ('${email}','${hashedPassword}', '1')`;
          mysql.pool.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(result);
          });
        });
      });
    });
  }
};
