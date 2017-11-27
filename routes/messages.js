const express = require("express");
const Messages = require("../models/messages");
const UserModel = require("../models/users");
const router = express.Router();

router.get("/messageboard", (req, res, next) => {

  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  Messages.find({
      reciever: req.user.username
    }).sort({
      createdAt: -1
    })
    .exec()
    .then((messageResults) => {
      res.locals.listOfMessages = messageResults;
      res.render("messageboard-views/message-list");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/messageboard/new-msg", (req, res, next) => {
  res.render("messageboard-views/new-message");
});


router.post('/messageboard', (req, res, next) => {

  UserModel.find({
    username: req.body.recieverInput
  }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }
    if (foundUser) {
      const themessage = new Messages({
        sender: req.user._id,
        content: req.body.messageInput,
        reciever: foundUser,
      });
      themessage.save()
        .then(() => {
          res.redirect("/messageboard");
        })
        .catch((err) => {
          next(err);
        });
    }



  });


});



module.exports = router;
