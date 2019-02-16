var express = require("express");
var mysql = require("./dbcon.js");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 4000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require("path");
app.use(express.static(path.resolve(__dirname, "public")));

//functions to switch boolean to text for lbs
function numToTxt(unit) {
  if (unit) {
    unit = "lbs";
  } else {
    unit = "kg";
  }

  return unit;
}

function txtToNum(unit) {
  if (unit === "lbs") {
    unit = 1;
  } else {
    unit = 0;
  }

  return unit;
}

//get all users
app.get("/", function(req, res, next) {
  var context = {};
  var getValues = [];
  mysql.pool.query("SELECT * FROM users", function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    for (var val in rows) {
      var obj = rows[val];
      getValues.push({
        id: obj.id,
        firstname: obj.firstname,
        lastname: obj.lastname,
        region: obj.region,
        email: obj.email,
        password: obj.password
      });
    }
    var getContent = {};
    getContent.content = getValues;
    res.render("home", getContent);
  });
});
//create new user
app.get("/insert", function(req, res, next) {
  console.log(
    req.query.firstname,
    req.query.lastname,
    req.query.region,
    req.query.email,
    req.query.password
  );
  var context = {};
  context.results = {};
  var getValues = [];
  var id;
  if (!req.query.name) {
    return;
  }
  mysql.pool.query(
    "INSERT INTO `users` (`firstname`, `lastname`, `region`, `email`, `password`) VALUES (?, ?, ?, ?, ?)",
    [
      req.query.firstname,
      req.query.lastname,
      req.query.region,
      req.query.email,
      req.query.password
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }

      mysql.pool.query(
        "SELECT * FROM `users` WHERE id=?",
        result.insertId,
        function(err, rows, fields) {
          if (err) {
            next(err);
            return;
          }
          for (var val in rows) {
            var obj = rows[val];
            getValues.push({
              id: obj.id,
              firstname: obj.firstname,
              lastname: obj.lastname,
              region: obj.region,
              email: obj.email,
              password: obj.password
            });
          }
          var getContent = {};
          getContent.results = getValues;

          res.send(JSON.stringify(getContent));
        }
      );
    }
  );
});
//delete user information
app.get("/delete", function(req, res, next) {
  var context = {};
  mysql.pool.query("DELETE FROM `users` WHERE id=?", [req.query.id], function(
    err,
    result
  ) {
    if (err) {
      next(err);
      return;
    }
  });
});
//edit user information

app.get("/edit", function(req, res, next) {
  var getValues = [];

  mysql.pool.query("SELECT * FROM `users` WHERE id=?", [req.query.id], function(
    err,
    rows,
    fields
  ) {
    if (err) {
      next(err);
      return;
    }
    for (var val in rows) {
      var obj = rows[val];
      getValues.push({
        id: obj.id,
        firstname: obj.firstname,
        lastname: obj.lastname,
        region: obj.region,
        email: obj.email,
        password: obj.password
      });
    }
    var getContent = {};
    getContent.content = getValues[0];
    res.render("edit", getContent);
  });
});
//update information
app.get("/edit-return", function(req, res, next) {
  var context = {};
  mysql.pool.query("SELECT * FROM `users` WHERE id=?", [req.query.id], function(
    err,
    result
  ) {
    if (err) {
      next(err);
      return;
    }
    if (result.length == 1) {
      var curVals = result[0];
      mysql.pool.query(
        "UPDATE `users` SET firstname=?, lastname=?, region=?, email=?, password=? WHERE id=? ",
        [
          req.query.firstname || curVals.firstname,
          req.query.lastname || curVals.lastname,
          req.query.region || curVals.region,
          req.query.email || curVals.email,
          req.query.password,
          req.query.id
        ],
        function(err, result) {
          if (err) {
            next(err);
            return;
          }

          var getValues = [];

          mysql.pool.query("SELECT * FROM users", function(err, rows, fields) {
            if (err) {
              next(err);
              return;
            }
            for (var val in rows) {
              var obj = rows[val];
              getValues.push({
                id: obj.id,
                firstname: obj.firstname,
                lastname: obj.lastname,
                region: obj.region,
                email: obj.email,
                password: obj.password
              });
            }
            var getContent = {};
            getContent.content = getValues;
            res.render("home", getContent);
          });
        }
      );
    }
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
