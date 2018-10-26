var mongoose =require("mongoose");

var schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    user:{
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        username: String
    },
    info: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Info"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campgound", schema);