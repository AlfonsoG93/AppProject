const passport = require("passport");
const UserModel = require("../models/users");


passport.serializeUser((userFromdb, cb) => {


  cb(null, userFromdb._id);
});


passport.deserializeUser((idfromSession, cb) => {

  UserModel.findById(idfromSession)
    .then((userFromdb) => {


      cb(null, userFromdb);

    })
    .catch((err) => {
      cb(err);
    });
});
