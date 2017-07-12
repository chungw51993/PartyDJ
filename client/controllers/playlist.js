angular.module('partyDJ')

.controller('PlaylistCtrl', function($scope, $location, Playlist, playlists, user) {
  $scope.playlists = playlists;
  $scope.user = user;
  $scope.deletePopup = false;
  $scope.editPopup = false;
  $scope.currentPL = {};
  $scope.title = '';
  $scope.newTitle = '';

  $scope.newPlaylist = function() {
    Playlist.newPlaylist($scope.title)
      .then((resp) => {
        $scope.title = '';
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

  $scope.goToDetail = function(id) {
    $location.path(`/${id}`);
  };

  $scope.showDeletePopup = function(pl) {
    $scope.deletePopup = true;
    $scope.currentPL = pl;
  };

  $scope.showEditPopup = function(pl) {
    $scope.editPopup = true;
    $scope.currentPL = pl;
  };

  $scope.cancelDelete = function() {
    $scope.deletePopup = false;
  };

  $scope.cancelEdit = function() {
    $scope.editPopup = false;
  };

});