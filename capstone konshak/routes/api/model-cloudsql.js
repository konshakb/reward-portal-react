// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

const extend = require("lodash").assign;
const mysql = require("mysql");
const config = require("../../config");

/*const options = {
  user: config.get("MYSQL_USER"),
  password: config.get("MYSQL_PASSWORD"),
  database: "rewarddb"
};*/
const options = {
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "rewarddb"
};

if (
  config.get("INSTANCE_CONNECTION_NAME") &&
  config.get("NODE_ENV") === "production"
) {
  console.log("here in the admin");
  options.socketPath = `/cloudsql/${config.get("INSTANCE_CONNECTION_NAME")}`;
} else {
  console.log("what's up here");
}

const connection = mysql.createConnection(options);

// [START list]
function list(limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  connection.query(
    "SELECT * FROM `users` LIMIT ? OFFSET ?",
    [limit, token],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      const hasMore = results.length === limit ? token + results.length : false;
      cb(null, results, hasMore);
    }
  );
}
function csv(limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  connection.query(
    "SELECT * FROM `users` LIMIT ? OFFSET ?",
    [limit, token],
    (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      const hasMore = results.length === limit ? token + results.length : false;
      cb(null, results, hasMore);
    }
  );
}
// [END list]

// [START create]
function create(data, cb) {
  console.log(data);
  if (data.admin) {
    const admin = {
      email: data.email,
      password: data.password
    };
    console.log(admin);
    connection.query("INSERT INTO `admin` SET ?", admin, (err, res) => {
      if (err) {
        cb(err);
        return;
      }
      console.log(cb);
      read(res.insertId, cb);
    });
  } else {
    connection.query("INSERT INTO `users` SET ?", data, (err, res) => {
      if (err) {
        cb(err);
        return;
      }
      read(res.insertId, cb);
    });
  }
}
// [END create]

function read(id, cb) {
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    id,
    (err, results) => {
      if (!err && !results.length) {
        err = {
          code: 404,
          message: "Not found"
        };
      }
      if (err) {
        cb(err);
        return;
      }
      cb(null, results[0]);
    }
  );
}

// [START update]
function update(id, data, cb) {
  connection.query("UPDATE `users` SET ? WHERE `id` = ?", [data, id], err => {
    if (err) {
      cb(err);
      return;
    }
    read(id, cb);
  });
}
// [END update]

function _delete(id, cb) {
  connection.query("DELETE FROM `users` WHERE `id` = ?", id, cb);
}

module.exports = {
  createSchema: createSchema,
  csv: csv,
  list: list,
  create: create,
  read: read,
  update: update,
  delete: _delete
};

if (module === require.main) {
  const prompt = require("prompt");
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql database.
    This script will not modify any existing tables.`
  );

  prompt.get(["user", "password"], (err, result) => {
    if (err) {
      return;
    }
    createSchema(result);
  });
}

function createSchema(config) {
  const connection = mysql.createConnection(
    extend(
      {
        multipleStatements: true
      },
      config
    )
  );

  /*connection.query(
    `CREATE DATABASE IF NOT EXISTS \`rewarddb\`
      DEFAULT CHARACTER SET = 'utf8'
      DEFAULT COLLATE 'utf8_general_ci';
    USE \`rewarddb\`;
    CREATE TABLE IF NOT EXISTS \`rewarddb\`.\`users\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`email\` VARCHAR(255) NULL,
      \`password\` VARCHAR(255) NULL,
      \`firstname\` VARCHAR(255) NULL,
      \`lastname\` VARCHAR(255) NULL,
      \`region\` INT(11) NULL,
      \`created_on\` VARCHAR(255) NULL,
      \`signature\` VARCHAR(255) NULL,
      \`created_by\` INT(11) NULL,
    PRIMARY KEY (\`id\`));`,*/
  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`rewarddb\`
      DEFAULT CHARACTER SET = 'utf8'
      DEFAULT COLLATE 'utf8_general_ci';
    USE \`rewarddb\`;
    CREATE TABLE IF NOT EXISTS \`rewarddb\`.\`admin\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`email\` VARCHAR(255) NULL,
      \`password\` VARCHAR(255) NULL,
    PRIMARY KEY (\`id\`));`,
    err => {
      if (err) {
        throw err;
      }
      console.log("Successfully created schema");
      connection.end();
    }
  );
}
