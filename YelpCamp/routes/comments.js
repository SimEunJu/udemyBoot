var express =require("express");
var router = express.Router({mergeParams:true});
var Campgound =require("../models/campgrounds");
var Comment =require("../models/comments");
var middleware =require("../middleware");

//campgrounds/:commentId/comments/new
router.get('/new', middleware.isLoggedIn ,function(req, res){
    console.log(req.params);
    Campgound.findById(req.params.id,function(err, campground){
        if(err) console.log(err);
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});
       
router.post('/', middleware.isLoggedIn, function(req, res){

    Comment.create(req.body.comment,function(err, comment){
        if(err) console.log(err);
        else{
            Campgound.findById(req.params.id,function(err,campground){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds"); 
                } 
                else {
                    comment.user.id = req.user._id;
                    comment.user.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }

            });
            
        }
    });
  
});

router.get('/:commentId/edit', middleware.checkOwnership_comment, function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
        res.render('comments/edit', {comment: comment, campgroundId: req.params.id, commnetId: req.params.commentId});
    });
});

router.put('/:commentId/edit', middleware.checkOwnership_comment, function(req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(){
        req.flash('commentEditSuc','Comment edited successfully!');
        res.redirect("campgrounds/"+req.params.id);
    });
});

router.delete('/:commentId/delete',middleware.checkOwnership_comment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(){
        Campgound.findById(req.params.id, function(err, campground) {
            if(err) console.log(err);
            else{
                //campground.comments.pop(req.params.commentId);
                req.flash('commentDelSuc','Comment deleted successfully!');
                res.redirect("/campgrounds/"+req.params.id);
            }
        });
    });
});

module.exports =router;