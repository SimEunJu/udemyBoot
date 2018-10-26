var mongoose =require("mongoose");
var Campgound =require("./models/campgrounds");
var Comment =require("./models/comments");
var Info =require("./models/info");

var data =[
    {
        name: "picture1",
        image: "http://movie.phinf.naver.net/20180130_227/1517289345932Xumtm_JPEG/movie_image.jpg?type=m665_443_2",
        description: "little forest"

    },
    {
        name: "picture2",
        image: "http://movie.phinf.naver.net/20171227_291/1514357134849yXpRs_JPEG/movie_image.jpg?type=m665_443_2",
        description: "little forest"
    },
    {
        name: "picture3",
        image: "http://movie.phinf.naver.net/20180116_52/1516069056006yS0CC_JPEG/movie_image.jpg?type=m665_443_2",
        description: "littel forest"
    },
    {
        name: "picture4",
        image: "http://movie.phinf.naver.net/20170106_85/1483685837327WH9Sb_JPEG/movie_image.jpg?type=m665_443_2",
        description: "littel function"
    }
    
];

function seedDB() {
    Campgound.remove({},function(err) {
        if(err) console.log(err);
        else console.log("removed");
    
        data.forEach(function(seed){

            Campgound.create(seed,function(err, campgound){
                if(err) console.log(err);
                else {
                    Comment.create(
                        {
                            text: "this is great!",
                            user: "sim"
                        }, function(err, comment){
                            if(err) console.log("Comment :"+err);
                            else{
                                campgound.comments.push(comment._id);
                                campgound.save();
                            }
                        }
                    );
                    
                    Info.create(
                        {
                            img: "",
                            description: "description"
                        }, function(err, info){
                            if(err) console.log(err);
                            else{
                                campgound.info.push(info._id);
                                campgound.save();
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports =seedDB;