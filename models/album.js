var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String],
  songs: [Song.schema]
});

// compile Schema into active model
var Album = mongoose.model('Album', AlbumSchema);

// export
module.exports = Album;
