const express = require("express");
const router  = express.Router();

router.get("/settings", (req, res, next) =>{

  if ((req.user === undefined)) {
    res.redirect("/login");

    //early return to stop  the function since there's an error
    // (prevents the rest of the code from running)
    return;
  }


});

router.post("/settings", (req,res,next) => {
  if ((req.user === undefined)) {
    res.redirect("/login");

    //early return to stop  the function since there's an error
    // (prevents the rest of the code from running)
    return;
  }

  req.user.username = req.body.editusername;
  req.user.discipline = req.body.martialartsInput;
  req.user.password = req.body.editPassword;
  req.user.experience = req.body.experienceInput;

  res.render("preferences/settings-page");
});
module.exports =  router;
