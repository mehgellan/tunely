// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[
  // put data here!
  {
    artistName: 'Ladyhawke',
    name: 'Ladyhawke',
    releaseDate: '2008, November 18',
    genres: [ 'new wave', 'indie rock', 'synth pop' ]
  }
];

db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
