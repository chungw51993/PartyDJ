angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $location, $routeParams, Playlist) {
  $scope.playlist = {};

  $scope.getAllTracks = function() {
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        $scope.playlist = resp;
      });
  };

  $scope.getAllTracks();
});