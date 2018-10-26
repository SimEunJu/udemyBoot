var mongoose = require("mongoose");

var InfoSchema = new mongoose.Schema(
    {
        img: String,
        description: String
    }
);

module.exports =mongoose.model("Info", InfoSchema);