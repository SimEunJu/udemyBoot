var mongoose =require("mongoose");

var CommentSchema =new mongoose.Schema({
    text: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    }
});

module.exports = mongoose.model("Comment", CommentSchema);