const express = require("express");

const MartialArtsModel = require("../models/martialart");
const UserModel = require("../models/users");
const CommentModel = require("../models/comments");
const router = express.Router();

router.get("/martialarts/:maId/comments/new", (req, res, next) => {

  MartialArtsModel.findById(req.params.maId)
  .then((MaFromDb) => {
    res.locals.MaDetails = MaFromDb;
    res.render("comment-views/comment-form");
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/martialarts/:maId/comments", (req, res, next) => {

  MartialArtsModel.findById(req.params.maId)
  .then((MaFromDb) => {
    const theComment = new CommentModel({
      content:req.body.commentContent,
      authorUname:req.user.username,
      post: req.params.maId
    });

    res.locals.MaDetails = MaFromDb;
    return theComment.save();
  })
  .then(() => {
    res.redirect(`/martialarts/${req.params.maId}`);
  })
  .catch((err) => {
    res.locals.validationErrors = err.errors;
    next(err);
  });
});

module.exports = router;
