/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

 var templateFunction;






$(document).ready(function() {
  console.log('app.js loaded!');
  // $albumsList = $('#albums');
  var albumHtml = $('#album-template').html();
  templateFunction = Handlebars.compile(albumHtml);
  sampleAlbums.forEach(function(elem) {
    renderAlbum(elem);
  });

});

$.get('/api/albums', onSuccess);

function onSuccess(json) {
  json.forEach(function(album) {
    renderAlbum(album);
  });
}





// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var templatedAlbumHtml = templateFunction(album);
  $('#albums').prepend(templatedAlbumHtml);
}
