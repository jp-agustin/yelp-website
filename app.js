let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ROUTES
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: campgrounds});
    }
  });

});

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

app.get("/campgrounds/new", function(req, res) {
  res.render("new")
});

app.get("/campgrounds/:id", function(req, res) {

  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });

});

// Error: Page not found
app.get("*", function(req, res) {
  res.send("Page not found: Error 404!");
});

app.listen(3000, function() {
  console.log("Yelp Server listening at port 3000");
});