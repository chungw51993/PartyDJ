angular.module('partyDJ')

.controller('PlaylistCtrl', function($scope, $location, Playlist, playlists, user) {
  $scope.playlists = playlists;
  $scope.user = user;

  $scope.deletePopup = false;
  $scope.editPopup = false;
  $scope.newPopup = false;

  $scope.currentPL = {};

  $scope.title = '';
  $scope.text = '';
  $scope.subText = '';

  $scope.newPlaylist = function(title) {
    Playlist.newPlaylist(title)
      .then((resp) => {
        $scope.title = '';
        $scope.newPopup = false;
        Playlist.getPlaylists()
          .then((resp) => {
            $scope.playlists = resp;
          });
      });
  };

  $scope.deletePlaylist = function(id) {
    Playlist.deletePlaylist(id)
      .then(() => {
        $scope.deletePopup = false;
        Playlist.getPlaylists()
          .then((resp) => {
            $scope.playlists = resp;
          });
      });
  };

  $scope.editPlaylist = function(id, title) {
    Playlist.editPlaylist(id, title)
      .then(() => {
        $scope.editPopup = false;
        $scope.newTitle = '';
        Playlist.getPlaylists()
          .then((resp) => {
            $scope.playlists = resp;
          });
      });
  };

  $scope.goToDetail = function(id) {
    $location.path(`/${id}`);
  };

  $scope.showNewPopup = function() {
    $scope.newPopup = true;
  };

  $scope.showDeletePopup = function(pl) {
    $scope.currentPL = pl;
    $scope.text = `Are you sure you want to delete ${pl.name} playlist?`;
    $scope.subText = 'You won\'t be able to get the playlist back after it is deleted';
    $scope.deletePopup = true;
  };

  $scope.showEditPopup = function(pl) {
    $scope.currentPL = pl;
    $scope.text = 'Do you want to change the name of the playlist?';
    $scope.title = pl.name;
    $scope.editPopup = true;
  };

  $scope.cancelNew = function() {
    $scope.newPopup = false;
  };

  $scope.cancelDelete = function() {
    $scope.deletePopup = false;
  };

  $scope.cancelEdit = function() {
    $scope.editPopup = false;
  };

});