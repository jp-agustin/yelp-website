let express = require("express");
let router  = express.Router();

let User      = require("../models/user");
let passport  = require("passport");


// ROOT
router.get("/", function(req, res) {
  res.render("landing");
});

// AUTH ROUTES
// REGISTER
router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {

  let newUser = new User({username: req.body.username});

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register")
    }

    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });

});

// LOGIN
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {});

// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

// Error: Page not found
router.get("*", function(req, res) {
  res.send("Page not found: Error 404!");
});

// middleware
function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

module.exports = router;