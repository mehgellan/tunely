/************
 * DATABASE *
 ************/

db = require('../models');

function create(req, res) {
  // FIND ALBUM ID
  console.log('CREATE RUNNING');
  var albumId = req.params.album_id;
  db.Album.findById(albumId, function(err, foundAlbum) {
    if (err) { console.log('ERROR'); }
    console.log('FOUND ALBUM', foundAlbum);
    // CREATE NEW SONG
    var newSong = new db.Song(req.body);
    foundAlbum.songs.push(newSong);
    foundAlbum.save(function(err, savedAlbum) {
      console.log('NEW SONG', newSong);
      res.json(newSong);
    });
  });


}


module.exports = {
  create: create
};
