let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// seedDB();

// ROUTES
// ROOT
app.get("/", function(req, res) {
  res.render("landing");
});

// CAMPGROUND INDEX
app.get("/campgrounds", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });

});

// CAMPGROUND CREATE
app.post("/campgrounds", function(req, res) {

  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;

  let newCampground = {
    name: name,
    image: image,
    description: description
  }

  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });

});

// CAMPGROUND NEW
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new")
});

// CAMPGROUND SHOW
app.get("/campgrounds/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });

});

// COMMENTS CREATE
app.post("/campgrounds/:id/comments", function(req, res) {

  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });

});

// COMMENTS NEW
app.get("/campgrounds/:id/comments/new", function(req, res) {

  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })

});

// Error: Page not found
app.get("*", function(req, res) {
  res.send("Page not found: Error 404!");
});

app.listen(3000, function() {
  console.log("Yelp Server listening at port 3000");
});