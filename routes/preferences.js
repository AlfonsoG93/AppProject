const express = require("express");
const router  = express.Router();
const UserModel = require("../models/users");

router.get("/profile", (req, res, next) =>{

  if ((req.user === undefined)) {
    res.redirect("/login");

    //early return to stop  the function since there's an error
    // (prevents the rest of the code from running)
    return;
  }

  res.render('preferences/profile');

});


router.get("/profile/profile-edit", (req, res, next) =>{

  if ((req.user === undefined)) {
    res.redirect("/login");

    //early return to stop  the function since there's an error
    // (prevents the rest of the code from running)
    return;
  }

  res.render('preferences/profile-edit');

});
router.post("/profile", (req,res,next) => {
  if ((req.user === undefined)) {
    res.redirect("/login");

    //early return to stop  the function since there's an error
    // (prevents the rest of the code from running)
    return;
  }
  UserModel.findById(req.user._id)
  .then((userFromDb) => {
    userFromDb.set ({
      username: req.body.editUsername,
      discipline: req.body.martialartsInput,
      experience: req.body.experienceInput

    });
    return userFromDb.save();
  })
  .then(() => {
    res.redirect('/profile');
  })
  .catch((err) => {
    next(err);
  });
});
module.exports =  router;
