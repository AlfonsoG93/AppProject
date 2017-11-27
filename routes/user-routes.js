const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/users");
const router = express.Router();
const passport = require("passport");


//STEP  1: show the sign up page
router.get("/signup", (req, res, next) => {
  if (req.user) {
    res.redirect("/");

    return;
  }
  res.render("user-views/signup-page");

});

//STEP  2: process the sign up form

router.post("/process-signup", (req, res, next) => {

  //console.log(req.body);

  const salt = bcrypt.genSaltSync(10);

  if (req.body.signupUsername === "") {
    res.locals.errorMessage = "You need a username";
    res.render("user-views/signup-page");

    return;
  }

  if (req.body.signupPassword.length < 5 ||
    req.body.signupPassword.match(/[^a-z0-9]/i) === null
  ) { //if no special characters  (Regular expression)
    res.locals.errorMessage = "Password is invalid";
    res.render("user-views/signup-page");

    //early return: stops function from continuing since there's an error
    return;
  }



  UserModel.findOne({
      email: req.body.signupEmail
    })

    .then((userFromDb) => {
      //console.log(userFromDb);
      //check if user email exists in the database, it will be null if not taken
      if (userFromDb !== null) {
        res.locals.errorMessage = "Email is taken";
        res.render("user-views/signup-page");

        return;
      }


      //encrypt the password password submitted by the user from the form
      //
      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({

        username: req.body.signupUsername,
        email: req.body.signupEmail,
        discipline: req.body.martialartsInput,
        experience : req.body.experienceInput,
        encryptedPassword: scrambledPassword

      });

      return theUser.save();
    })

    .then(() => {
      //redirect users to home page if sign up was successful
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });

});



//STEP 1: show the log in form
router.get("/login", (req, res, next) => {

  if (req.user) {
    res.redirect("/");

    return;
  }
  res.render("user-views/login-page");
});

//STEP 2: process the log in form
router.post("/process-login", (req, res, next) => {

  UserModel.findOne({
      email: req.body.loginEmail
    })
    .then((userFromDb) => {
      if (userFromDb === null) {
        res.locals.errorMessage = "Email is incorrect.";
        res.render("user-views/login-page");
        return;
      }

      const isPasswordGood =
        bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);

      if (isPasswordGood === false) {
        res.locals.errorMessage = "Password is incorrect.";
        res.render("user-views/login-page");
        return;
      }


      //CREDENTIAL ARE GOOD! We need log the users in.
      //Passport defines the "req.login()" for us to specify
      req.login(userFromDb, (err) => {
        if (err) {
          next(err);
        } else {
          //redirect to the home page on successful log in
          res.redirect("/");
        }
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  //Password defines the "req.logout()" method
  // for us to specify when to log out a user(clear them from the session)

  req.logout();

  res.redirect("/");

});

module.exports = router;
