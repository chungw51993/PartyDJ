angular.module('partyDJ')

.controller('PlaylistCtrl', function($scope, $location, Playlist, playlists, user) {
  $scope.playlists = playlists;
  $scope.user = user;
  $scope.title = '';

  $scope.newPlaylist = function() {
    Playlist.newPlaylist($scope.title)
      .then((resp) => {
        Playlist.getPlaylists()
          .then((resp) => {
            $scope.playlists = resp;
          });
      });
  };

  $scope.goToDetail = function(id) {
    $location.path(`/playlist/${id}`);
  };

});