/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

 var templateFunction;
 var albumsList = [];


$(document).ready(function() {
  console.log('app.js loaded!');
  // $albumsList = $('#albums');
  var albumHtml = $('#album-template').html();
  templateFunction = Handlebars.compile(albumHtml);
  albumsList.forEach(function(elem) {
    renderAlbum(elem);
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    // same as ajax POST
    $.post('/api/albums', formData, function(album) {
      console.log("POST NEW ALBUM SUCCESS", album.name);
      $('form input').val('');
    });
    // $.ajax({
    //   method: 'POST',
    //   url: '/api/albums',
    //   data: formData,
    //   success: newAlbumSuccess,
    //   // error: newAlbumError
    // });
    console.log("FORM DATA", formData);
  });

  $.get('/api/albums', onSuccess);



});

// index route -- find all albums
function onSuccess(json) {
  console.log('FOUND ALL ALBUMS');
  json.forEach(function(album) {
    renderAlbum(album);
  });
}

// create route -- post new album


// function newAlbumError() {
//   console.log("NEW ALBUM ERROR");
// }








// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var templatedAlbumHtml = templateFunction(album);
  $('#albums').prepend(templatedAlbumHtml);
}
