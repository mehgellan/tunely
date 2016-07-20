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

  // GET ALL ALBUMS
  $.get('/api/albums', onSuccess);

  // ADD SONG ON CLICK
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

  // EDIT ALBUM ON CLICK
  $('#albums').on('click', '.edit-album', handleAlbumEdit);

  // SAVE EDITED ALBUM ON CLICK
  $('#albums').on('click', '.save-album', handleAlbumSave);

});

// index --- find all albums
function onSuccess(json) {
  console.log('FOUND ALL ALBUMS');
  json.forEach(function(album) {
    renderAlbum(album);
  });
}

// POST NEW SONG ON SUBMIT
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

// DELETE CLICK SUCCESS
function deleteAlbumSuccess(data) {
  var deletedAlbumId = data._id;
  console.log('DELETED ALBUM', deletedAlbumId);
  $('div[data-album-id =' + deletedAlbumId + ']').remove();
}

// EDIT
function handleAlbumEdit(e) {
  var $albumRow = $(this).parents('.album');
  var albumId = $albumRow.data('album-id');
  console.log('EDIT ALBUM', albumId);

  $albumRow.find('.save-album').toggleClass('hidden');
  $albumRow.find('.edit-album').toggleClass('hidden');

  var albumName = $albumRow.find('span.album-name').text();
  $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');

  var artistName = $albumRow.find('span.artist-name').text();
  $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

  var releaseDate = $albumRow.find('span.album-releaseDate').text();
  $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>');
}

// EDIT CLICK SUCCESS
function handleAlbumSave(e) {
  var albumId = $(this).parents('.album').data('album-id');
  var $albumRow = $('[data-album-id=' + albumId + ']');
  console.log('UPDATED ALBUM', updatedAlbumId);
  // GRAB DATA FROM THE ALBUM
  var data = {
    name: $albumRow.find('.edit-album-name').val(),
    artistName: $albumRow.find('.edit-artist-name').val(),
    releaseDate: $albumRow.find('.edit-album-releaseDate').val()
  };
  console.log(albumId, data);

  $.ajax({
    method: 'PUT',
    url: '/api/albums/' + albumId,
    data: data,
    success: updatedAlbumSuccess
  });
}

// RENDER
function renderAlbum(album) {
  var templatedAlbumHtml = templateFunction(album);
  $('#albums').prepend(templatedAlbumHtml);
}
