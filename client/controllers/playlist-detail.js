angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $location, $routeParams, Playlist, user) {
  $scope.playlist = {};
  $scope.user = user;

  $scope.getAllTracks = function() {
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        $scope.playlist = resp;
      });
  };

  $scope.getAllTracks();
});