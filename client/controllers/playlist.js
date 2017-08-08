angular.module('partyDJ')

.controller('PlaylistCtrl', function($location, Playlist, playlists, user) {
  this.playlists = playlists;
  this.user = user;

  this.deletePopup = false;
  this.editPopup = false;
  this.newPopup = false;
  this.sharePopup = false;

  this.currentPL = {};

  this.title = '';
  this.text = '';
  this.subText = '';

  this.newPlaylist = (title) => {
    Playlist.newPlaylist(title)
      .then((resp) => {
        this.playlists.unshift(resp);
        this.title = '';
        this.newPopup = false;
      });
  };

  this.deletePlaylist = (id) => {
    Playlist.deletePlaylist(id)
      .then(() => {
        this.deletePopup = false;
        Playlist.getPlaylists()
          .then((resp) => {
            this.playlists = resp;
          });
      });
  };

  this.editPlaylist = (id, title) => {
    Playlist.editPlaylist(id, title)
      .then(() => {
        this.editPopup = false;
        this.newTitle = '';
        Playlist.getPlaylists()
          .then((resp) => {
            this.playlists = resp;
          });
      });
  };

  this.goToDetail = (id) => {
    $location.path(`/${id}`);
  };

  this.showNewPopup = () => {
    this.text = 'New Playlist';
    this.subText = 'Please enter the name for your playlist and click submit';
    this.newPopup = true;
  };

  this.showDeletePopup = (pl) => {
    this.currentPL = pl;
    this.text = `Delete ${pl.name} playlist`;
    this.subText = 'You won\'t be able to get the playlist back after it is deleted';
    this.deletePopup = true;
  };

  this.showEditPopup = (pl) => {
    this.currentPL = pl;
    this.text = 'Edit Playlist';
    this.subText = 'Please enter a new name for your playlist and click submit to change it or cancel if you changed your mind';
    this.title = pl.name;
    this.editPopup = true;
  };

  this.showSharePopup = (pl) => {
    this.currentPL = pl;
    this.text = 'Share Playlist';
    this.subText = 'To share the playlist just press the copy button to copy the URL and share it with your friends';
    this.title = window.location.origin + '/' + this.currentPL.id;
    this.sharePopup = true;
  };

  this.cancelNew = () => {
    this.newPopup = false;
  };

  this.cancelDelete = () => {
    this.deletePopup = false;
  };

  this.cancelEdit = () => {
    this.editPopup = false;
  };

  this.cancelShare = () => {
    this.sharePopup = false;
  };


});