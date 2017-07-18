angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $location, $routeParams, Playlist, Track, user) {
  $scope.playlist = {};
  $scope.user = user;
  $scope.tracks = [];

  $scope.query = '';

  $scope.getAllTracks = function() {
    console.log($scope.query);
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        $scope.playlist = resp;
        console.log($scope.playlist);
      });
  };

  $scope.searchTrack = function(query) {
    if (query !== '') {
      Track.searchTrack(query)
        .then((resp) => {
          $scope.tracks = resp.tracks.items;
        });
    }
  };

  $scope.addTrack = function(song) {
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