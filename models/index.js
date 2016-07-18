var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

// now index.js can use Album model
module.exports.Album = require('./album.js');
