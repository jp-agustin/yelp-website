let express = require("express");
let router  = express.Router();

let Campground = require("../models/campground");

// INDEX
router.get("/", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });

});

// CREATE
router.post("/", isLoggedIn, function(req, res) {

  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;

  let author = {
    id: req.user._id,
    username: req.user.username
  }

  let newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
  }

  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });

});

// NEW
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new")
});

// SHOW
router.get("/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });

});

// middleware
function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

module.exports = router;