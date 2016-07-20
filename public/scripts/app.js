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
  // HANDLEBARS TEMPLATING
  var albumHtml = $('#album-template').html();
  templateFunction = Handlebars.compile(albumHtml);
  albumsList.forEach(function(elem) {
    renderAlbum(elem);
  });

  // HANDLE NEW ALBUM POST ON FORM SUBMISSION
  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    // same as ajax POST
    $.post('/api/albums', formData, function(album) {
      console.log("POST NEW ALBUM SUCCESS", album.name);
      renderAlbum(album);
      // $(this).trigger('reset'); // another option to clear the form
    });
    console.log("FORM DATA", formData);
    $('form input').val('');
  });

  $.get('/api/albums', onSuccess);

  $('#albums').on('click', '.add-song', function(e) {
    var id = $(this).closest('.album').data('album-id');
    console.log('id', id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
  });

  // DELETE ALBUM ON CLICK
  $('#albums').on('click', '.delete-album', handleAlbumDelete);

  // POST NEW SONG ON CLICK
  $('#saveSong').on('click', handleNewSongSubmit);

});

// index route -- find all albums
function onSuccess(json) {
  console.log('FOUND ALL ALBUMS');
  json.forEach(function(album) {
    renderAlbum(album);
  });
}

function handleNewSongSubmit(e) {
  e.preventDefault();
  // get song/track data from modal inputs
  var $modal = $('#songModal');
  var $songNameInput = $modal.find('#songName');
  var $trackNumberInput = $modal.find('#trackNumber');
  var songData = {
    name: $songNameInput.val(),
    trackNumber: $trackNumberInput.val()
  };
  // get album id
  var albumId = $modal.data('album-id');
  console.log(albumId);
  // post to server
  var songPostUrl = ('/api/albums/' + albumId + '/songs');
  $.post(songPostUrl, songData, function(song) {
    console.log('NEW SONG POSTED', song);
    // CLEAR THE MODAL FORM
    $songNameInput.val('');
    $trackNumberInput.val('');
    $modal.modal('hide');
    // GRAB THE CURRENT ALBUM
    $.get('/api/albums/' + albumId, function(data) {
      // REMOVE IT B/C IT DOESN'T HAVE THE NEW SONG YET
      $('[data-ablum-id=' + albumId + ']').remove();
      // RENDER IT TO THE PAGE W/ THE NEW SONG
      renderAlbum(data);
    });
  });
}

// DELETE
function handleAlbumDelete(e) {
  var albumId = $(this).parents('.album').data('album-id');
  $.ajax({
    method: 'DELETE',
    url: '/api/albums/' + albumId,
    success: deleteAlbumSuccess
  });
}

// DELETE
function deleteAlbumSuccess(data) {
  var deletedAlbumId = data._id;
  console.log('DELETED ALBUM', deletedAlbumId);
  $('div[data-album-id =' + deletedAlbumId + ']').remove();
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var templatedAlbumHtml = templateFunction(album);
  $('#albums').prepend(templatedAlbumHtml);
}
