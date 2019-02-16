const express = require("express");
const router = express.Router();
const bodyParser = require(`body-parser`);
const bcrypt = require(`bcryptjs`);
const Validator = require("validator");
const nodemailer = require("nodemailer");
var jsonexport = require("jsonexport");
const fs = require("fs");
//body parser added
router.use(bodyParser.json());
// {get model
function getModel() {
  return require(`./model-${require("../../config").get("DATA_BACKEND")}`);
}
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}
function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.region = !isEmpty(data.region) ? data.region : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname = "Name must be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email address is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email format invalid";
  }
  if (isEmpty(data.region)) {
    errors.region = "Region is required";
  }
  //if (Validator.isEmpty(data.region)) {
  // errors.region = "Region is required";
  // }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 40 })) {
    errors.password = "Password must be between 8 and 40 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

//csv function
//takes json from data query and converts to csv file
router.get("/", (req, res, next) => {
  getModel().csv(100, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    //console.log(entities);
    var reportFile = Date.now();
    //fs.closeSync(fs.openSync("./" + reportFile + ".csv", "w"));
    jsonexport(entities, function(err, csv) {
      if (err) return console.log(err);
      fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
      //console.log(csv);
    });
    res.json({
      items: entities,
      nextPageToken: cursor
    });
  });
});

module.exports = router;
