const express = require("express");
const MartialartModel = require("../models/martialart");
const CommentModel = require("../models/comments");
const router = express.Router();


// Get Martial Arts page
router.get("/martialarts", (req, res, next) => {
  if (req.user === undefined) {
  res.redirect("/login");
  return;
}
    MartialartModel
      .find()
      .limit(10)
      .exec()
  .then((martialArtResults) => {
    res.locals.listOfMartialArts = martialArtResults;
    res.render("martialarts-views/martialarts-list");
  })
  .catch((err) => {
    next(err);
  });
});

// Post new Martial art Post
router.get("/martialarts/new", (req, res, next) => {
  if (req.user === undefined) {
  res.redirect("/login");
  return;
}
  res.render("martialarts-views/martialart-form");
});
router.post("/martialarts", (req, res, next) =>{


  const theMartialArt = new MartialartModel ({
    name:req.body.martialartInput,
    title:req.body.titleInput,
    description:req.body.descriptionInput,
    image:req.body.imageInput,
    location:req.body.locationInput,
    creator:req.user.email
  });
  theMartialArt.save()
  .then(() => {
    res.redirect("/martiarts");
  })
  .catch((err) => {
    next(err);
  });


});

// Get Martial art Post by Id
router.get("/martialarts/:maId", (req, res, next) => {
  console.log("hello");
  if (req.user === undefined) {
  res.redirect("/login");
  return;
}


  MartialartModel.findById(req.params.maId)
  .then((martialartFromDb) => {
console.log("seaarch");
    res.locals.martialartDetails = martialartFromDb;

    return CommentModel.find({
      post: req.params.maId
    }).exec();
  }).then((commentResults) => {
    console.log("find comment");
    res.locals.listOfComments = commentResults;
    res.render("martialarts-views/martialart-details");
  })
  .catch((err) =>{
    next(err);
  });
});


//Edit details of Martial Part Post
  router.post("/martialarts/:maId", (req,res,next) => {

  MartialartModel.findById(req.params.maId)

  .then((MartialartFromDb) => {
    MartialartFromDb.set({
      name:req.body.martialartInput,
      title:req.body.titleInput,
      description:req.body.descriptionInput,
      image:req.body.imageInput,
      location:req.body.locationInput,

    });

    res.locals.martialArtDetails = MartialartFromDb;

    return MartialartFromDb.save();
  })
  .then(() => {
    res.redirect(`/martialarts/${req.params.maId}`);
  })
  .catch((err) => {
    // render the error page with our error
    if(err.errors){
      res.locals.validationErrors = err.errors;
      res.render("martialarts-views/martialart-edit");
    }else
    next(err);
  });
});

//Get Page form to edit  Post
router.get("/martialarts/:maId/edit", (req, res, next) => {
  if (req.user === undefined) {
  res.redirect("/login");
  return;
}

  MartialartModel.findById(req.params.maId)
.then((martialartFromDb) => {
  res.locals.martialArtDetails = martialartFromDb;

  res.render("martialarts-views/martialart-edit");
}).catch((err) => {
  next(err);
});

router.post("/martialarts/:maId/delete" , (req, res, next) => {
  martialartModel.findByIdAndRemove(req.params.maId)
  .then((martialartFromDb) => {
    res.redirect("/martialarts");
  })
  .catch((err) => {
    next(err);
  });
});
});
module.exports = router;
