let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
    {name: "Dry River", image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Yosemite Westlake", image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png"},
    {name: "Tipsinah Mounds", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg"},
    {name: "Dry River", image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Yosemite Westlake", image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png"},
    {name: "Tipsinah Mounds", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg"},
    {name: "Dry River", image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Yosemite Westlake", image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png"},
    {name: "Tipsinah Mounds", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg"},
    {name: "Dry River", image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Yosemite Westlake", image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png"},
    {name: "Tipsinah Mounds", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg"}
  ];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {
    name: name,
    image: image
  }

  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
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