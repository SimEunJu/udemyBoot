var express =require("express");
var router =express.Router({margeParams: true});
var passport =require("passport");
var User =require("../models/user");

router.get('/',function(req, res) {
    res.render("index/landing");
});

router.get('/register', function(req, res) {
    res.render('index/register');
});

router.post('/register',function(req, res) {
    var newUser =new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('index/register');
        } 
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

router.get('/login',function(req, res) {
    res.render('index/login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/campgrounds',
                                   failureRedirect: '/login' }));

router.get('/logout',function(req, res) {
   req.logout();
   req.flash("sucMsg","Logout Successfully!");
   res.redirect("/campgrounds");
});

module.exports =router;