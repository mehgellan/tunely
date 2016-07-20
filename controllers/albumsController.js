/************
 * DATABASE *
 ************/

db = require('../models');


// GET /api/albums
function index(req, res) {
  db.Album.find(function(err, allAlbums) {
    if (err) { res.sendStatus(404); }
    res.json(allAlbums);
  });
}

// POST /api/albums
function create(req, res) {
  var genres = req.body.genres.split(',');
  genres = genres.map(function(item) {
    return item.trim();
  });
  var newAlbum = req.body;
  newAlbum.genres = genres;
  db.Album.create(newAlbum, function(err, album) {
    if (err) { console.log('ERROR', err); }
    console.log('NEW ALBUM', album);
    res.json(album);
  });
}


function show(req, res) {
  var albumId = req.params.album_id;
  db.Album.findById(albumId, function(err, foundAlbumId) {
    if (err) { console.log('ERROR'); }
    console.log('FOUND ALBUM', foundAlbumId);
    res.json(foundAlbumId);
  });
}

function destroy(req, res) {
  var albumId = req.params.album_id;
  db.Album.findOneAndRemove({_id: albumId}, function(err, deletedAlbum) {
    console.log('DELETED', deletedAlbum);
    res.json(deletedAlbum);
  });
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
