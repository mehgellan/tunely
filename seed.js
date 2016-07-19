// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");
var horribleCount = 0;


var albumsList =[
              {
                artistName: 'Nine Inch Nails',
                name: 'The Downward Spiral',
                releaseDate: '1994, March 8',
                genres: [ 'industrial', 'industrial metal' ]
              },
              {
                artistName: 'Metallica',
                name: 'Metallica',
                releaseDate: '1991, August 12',
                genres: [ 'heavy metal' ]
              },
              {
                artistName: 'The Prodigy',
                name: 'Music for the Jilted Generation',
                releaseDate: '1994, July 4',
                genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
              },
              {
                artistName: 'Johnny Cash',
                name: 'Unchained',
                releaseDate: '1996, November 5',
                genres: [ 'country', 'rock' ]
              }
];

db.Song.remove({},function songsAreGone(err, succ) {
  console.log("Removed songs...");
});
var sampleSongs = [];

sampleSongs.push(new db.Song({
    name: 'Swamped',
    trackNumber: 1
}));
sampleSongs.push(new db.Song({
    name: "Heaven's a Lie",
    trackNumber: 2
}));
sampleSongs.push(new db.Song({
    name: 'Daylight Dancer',
    trackNumber: 3
}));
sampleSongs.push(new db.Song({
    name: 'Humane',
    trackNumber: 4
}));
sampleSongs.push(new db.Song({
    name: 'Self Deception',
    trackNumber: 5
}));
sampleSongs.push(new db.Song({
    name: 'Aeon',
    trackNumber: 6
}));
sampleSongs.push(new db.Song({
    name: 'Tight Rope',
    trackNumber: 7
}));

function savedSongCB(err, succ){
  if(err){return console.log("ERROR: ", err);}
  console.log(succ);
}
sampleSongs.forEach(function(song) {
  song.save(savedSongCB);
});

db.Album.remove({}, function(err, removedAlbums) {
  if(err){return console.log("ERROR: ", err);}
  console.log("Removed albums...");
  db.Album.create(albumsList, function(err, createdAlbums) {
    if(err){return console.log("ERROR: ", err);}
    console.log(createdAlbums);
    albumsList.forEach(function(album) {
      var searchParam = {name: album.name};
      db.Album.findOne(searchParam, function(err, album){
        if(err){return console.log("ERROR: ", err);}

        db.Song.find({}, function(err, songs) {
          if(err){return console.log("ERROR: ", err);}

            album.songs = songs;
            album.save(function(err, savedAlbum){
              if(err){return console.log("ERROR: ", err);}
              console.log(savedAlbum);
            });
        });
      });
    });

  });
});
