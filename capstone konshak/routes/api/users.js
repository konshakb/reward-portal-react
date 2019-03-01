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
//@route     GET api/users/test
//@ desc    Test users route
//@access   Public
router.get(`/test`, (req, res) => res.json({ msg: "Users works" }));

/**
 * GET /api/users
 *
 * Retrieve a page of users (up to ten at a time).
 */
router.get("/", (req, res, next) => {
  getModel().list(100, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      items: entities,
      nextPageToken: cursor
    });
  });
});
router.delete("/:userid", (req, res, next) => {
  const userid = req.params.userid;
  getModel().delete(userid, err => {
    if (err) {
      next(err);
      return;
    }
    res.status(201).send("Deleted");
  });
});
/**
 * POST /api/users
 *
 * Create a new user
 */
router.post("/", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    region: req.body.region,
    created_on: today,
    signature: req.body.signature,
    created_by: req.body.created_by
  };

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      getModel().create(newUser, (err, entity) => {
        if (err) {
          next(err);
          return;
        }
        res.json(entity);
      });
    });
  });
});
router.post("/admin", (req, res, next) => {
  const newUsers = {
    email: req.body.email,
    password: req.body.password,
    admin: true
  };

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUsers.password, salt, (err, hash) => {
      if (err) throw err;
      newUsers.password = hash;
      getModel().create(newUsers, (err, entity2) => {
        if (err) {
          next(err);
          return;
        }
        console.log(entity2);
        res.json(entity2);
      });
    });
  });
});

router.post("/email", (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nihalosu@gmail.com",
      pass: "Beavers!"
    }
  });

  var mailOptions = {
    from: "nihalosu@gmail.com",
    to: req.body.email,
    subject: "Sending Email using Node.js",
    text: "Working on CSV file"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      res.json("Email sent: " + info.response);
    }
  });
});
module.exports = router;
