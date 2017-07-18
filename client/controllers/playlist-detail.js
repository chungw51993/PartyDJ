angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $location, $routeParams, Playlist, Track, user) {
  $scope.playlist = {};
  $scope.user = user;
  $scope.tracks = [];

  $scope.query = '';
  $scope.searchList = false;

  $scope.getAllTracks = function() {
    $scope.query = '';
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        $scope.playlist = resp;
      });
  };

  $scope.searchTrack = function(query) {
    if (query !== '') {
      $scope.searchList = true;
      Track.searchTrack(query)
        .then((resp) => {
          $scope.tracks = resp.tracks.items;
        });
    } else {
      $scope.searchList = false;
      $scope.tracks = [];
    }
  };

  $scope.addTrack = function(song) {
    console.log($scope);
    let album = {
      id: song.album.id,
      name: song.album.name,
      image: song.album.images[2].url
    };

    let artist = {
      id: song.artists[0].id,
      name: song.artists[0].name
    };

    let track = {
      id: song.id,
      name: song.name,
      uri: song.preview_url
    };

    Track.addTrack($routeParams.id, album, artist, track)
      .then(() => {
        $scope.query = '';
        $scope.getAllTracks();
      });
  };

  $scope.getAllTracks();
});