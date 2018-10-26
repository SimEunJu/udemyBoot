var express =require("express");
var app =express();
var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var passport =require("passport");
var LocalStrategy =require("passport-local");
var User =require("./models/user");
var methodOverride =require("method-override");
var flash =require("connect-flash-plus");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

var salt = require("/salt");

app.use(require("express-session")({
    secret: salt,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//var seedDB =require("./seeds");
//seedDB();

app.use(flash());
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.errMsg =req.flash('errMsg'); 
    res.locals.sucMsg =req.flash('sucMsg');
    next();
});

var camproundsRoutes =require("./routes/campgrounds");
var commentsRoutes =require("./routes/comments");
var indexRoutes =require("./routes/index");

app.use('/', indexRoutes);
app.use('/campgrounds',camproundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);

app.listen(process.env.PORT, process.env.IP,function() {
    console.log('server is running');
});