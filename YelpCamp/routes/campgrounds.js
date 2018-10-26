var express =require("express");
var router =express.Router({margeParams: true});
var Campgound =require("../models/campgrounds");
var Comment =require("../models/comments");
var middleware =require("../middleware/");

router.get('/', function(req, res) {
    Campgound.find({}, function(err, allCampground) {
        if(err) console.log(err);
        else res.render("campgrounds/index",{campgrounds: allCampground});
    });
});

router.post("/", middleware.isLoggedIn ,function(req, res) {
    var name =req.body.name;
    var image =req.body.image;
    var description =req.body.description;
    var user ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground ={name: name, image: image, description: description, user: user};
    Campgound.create(newCampground,
    function(err, campground) {
         if(err) console.log(err);
         else{
             res.redirect('/campgrounds');
         } 
     });
});

router.get('/new', middleware.isLoggedIn,function(req, res) {
    Campgound.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else res.render("campgrounds/new", {campground: campground});
    });
});

router.get('/:id', function(req, res) {
    
    Campgound.findById(req.params.id).populate("comments").exec(function(err, found) {
      
        if(err) console.log("description err :"+err);
        else {
            if(err) console.log(err);
            else{ res.render("campgrounds/show", {found: found}); }
        }
    });
});

router.get('/:id/edit', middleware.checkOwnership_campground, function(req, res) {
    Campgound.findById(req.params.id,function(err, campground){
       if(err) console.log(err);
       else res.render('campgrounds/edit',{campground: campground});
    });
});

router.put('/:id/edit', middleware.checkOwnership_campground, function(req, res) {
    Campgound.findByIdAndUpdate(req.params.id, req.body.campground, function(){
        req.flash('campEditSuc','Campground edited successfully!');
        res.redirect("campgrounds/"+req.params.id);
    });
});

router.delete('/:id/delete', middleware.checkOwnership_campground ,function(req, res) {
    Campgound.findByIdAndRemove(req.params.id, function(){
        req.flash('campDelSuc','Campgound deleted successfully!');
        res.redirect("/campgrounds");
    });
});

module.exports =router;