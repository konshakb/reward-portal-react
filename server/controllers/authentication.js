const config = require("../config");
const jwt = require("jwt-simple");
const User = require("../database/queries/user");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.insertId, iat: timestamp }, config.secret);
}

exports.getEmployee = function(req, res, next) {};

exports.signin = function(req, res, next) {
  // User has already had their email and password authorized, only a token is required

  // TODO: Send user information and port to Redux
  // Provides token and admin status of user
  console.log("Signin: ", req.user[0].admin);
  console.log("user", req.user[0]);
  res.send({
    token: tokenForUser(req.user),
    admin: req.user[0].admin === 0 ? false : true,
    user: req.user[0]
  });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const region_id = req.body.region_id;
  const admin = req.body.admin;
  // TODO - Add checks for other sign up information once user schema is updated from null
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password." });
  }
  // Confirm if a user with the given email exists
  User.findByEmail(email).then(user => {
    // If a user with email does exist, return an error
    if (user.length === 1) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // If a user with email does not exist, create and save user record
    // User.create(email, password)
    User.create(first_name, last_name, region_id, email, password, admin).then(
      result => {
        console.log("Result of newUser", result);
        // Respond to request indicating user was created
        // TODO: Modify this later since admin is creating the account
        res.send({ token: tokenForUser(result) });
        // res.send({});
      }
    );
  });
};
