const express = require('express');
const MartialartModel = require("../models/martialart");
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.user){
    MartialartModel
    .find({
      creator: req.user._id
    })
    .sort({
      title: 1
    })
    .exec()
    .then((MartialArtPosts) => {
      res.locals.maPosts = MartialArtPosts;
      res.render('index');
    })
    .catch((err) => {
      next(err);
    });
  }else {
    res.render('index');
  }
});


router.get("/search", (req, res, next) => {
  const searchRegex = new RegExp(req.query.userSearch, "i");

  MartialartModel
    .find({
      title: searchRegex
    })
    .limit(10)
    .exec()
    .then((searchResults) => {

      res.locals.listOfResults = searchResults;
      res.locals.searchTerm = req.query.postSeach;
      res.render("martialarts-views/search-page");


    })
    .catch((err) => {
      next(err);
    });

});


module.exports = router;
