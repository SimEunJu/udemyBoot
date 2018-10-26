var Comment =require("../models/comments");
var Campgound =require("../models/campgrounds");
var identify ={};

identify.isLoggedIn =function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash('errMsg','Please Login First!');
    res.redirect("/login");
};

identify.checkOwnership_comment =function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, comment) {
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else if(comment.user.id.equals(req.user._id)){
                return next();
            }
        });
    }
    else{
        req.flash('errMsg','Please Login First!');
        res.redirect("/login");
    }
};

identify.checkOwnership_campground =function(req, res, next){
    if(req.isAuthenticated()){
        Campgound.findById(req.params.id, function(err, campground) {
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else if(campground.user.id.equals(req.user._id)){
                 return next();
            }
        });
    }
    else{
        req.flash('errMsg','Please Login First!');
        res.redirect("/login");
    }
};

module.exports = identify;