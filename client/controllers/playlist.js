angular.module('partyDJ')

.controller('PlaylistCtrl', function($scope, $location, Playlist, playlist) {
  $scope.playlists = playlist;
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

});