const express = require('express');
const MartialartModel = require("../models/martialart");
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
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
