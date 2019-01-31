let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// ROUTES
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: campgrounds});
    }
  });

});

app.post("/campgrounds", function(req, res) {

  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {
    name: name,
    image: image
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

// Error: Page not found
app.get("*", function(req, res) {
  res.send("Page not found: Error 404!");
});

app.listen(3000, function() {
  console.log("Yelp Server listening at port 3000");
});