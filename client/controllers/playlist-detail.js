angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $location, $routeParams, Playlist, Track, user) {
  $scope.playlist = {};
  $scope.user = user;
  $scope.tracks = [];

  $scope.query = '';

  $scope.getAllTracks = function() {
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        $scope.playlist = resp;
      });
  };

  $scope.searchTrack = function(query) {
    if (query !== '') {
      Track.searchTrack(query)
        .then((resp) => {
          $scope.tracks = resp.tracks.items;
          console.log($scope.tracks);
        });
    }
  };

  $scope.getAllTracks();
});