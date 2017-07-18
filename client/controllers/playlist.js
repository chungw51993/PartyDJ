angular.module('partyDJ')

.controller('PlaylistCtrl', function($scope, $location, Playlist, playlists, user) {
  this.playlists = playlists;
  this.user = user;

  this.deletePopup = false;
  this.editPopup = false;
  this.newPopup = false;

  this.currentPL = {};

  this.title = '';
  this.text = '';
  this.subText = '';

  this.newPlaylist = (title) => {
    Playlist.newPlaylist(title)
      .then((resp) => {
        this.title = '';
        this.newPopup = false;
        Playlist.getPlaylists()
          .then((resp) => {
            this.playlists = resp;
          });
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
    this.text = 'Creating new playlist';
    this.title = 'New Playlist';
    this.newPopup = true;
  };

  this.showDeletePopup = (pl) => {
    this.currentPL = pl;
    this.text = `Are you sure you want to delete ${pl.name} playlist?`;
    this.subText = 'You won\'t be able to get the playlist back after it is deleted';
    this.deletePopup = true;
  };

  this.showEditPopup = (pl) => {
    this.currentPL = pl;
    this.text = 'Do you want to change the name of the playlist?';
    this.title = pl.name;
    this.editPopup = true;
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

});