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
  // var newAlbumEntry = new db.Album({
  //   artistName: req.body.artistName,
  //   name: req.body.name,
  //   releaseDate: req.body.releaseDate,
  //   genres: req.body.genres
  // });
  // console.log('NEW ALBUM MADE: ', newAlbumEntry);
  // newAlbumEntry.save(function(err, savedAlbum) {
  //   if (err) { console.log("SAVE ERROR"); }
  //   res.json(savedAlbum);
  //   console.log("ALBUM SAVED", savedAlbum);
  // });


function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
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
