angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {

  const authorized = function(Auth) {
    return Auth.isAuthorized();
  };

  const getPlaylists = function(Playlist) {
    return Playlist.getPlaylists();
  };

  const getPlaylist = function(Playlist, $routeParams) {
    var params = $routeParams;
    console.log(params);
    return Playlist.getAllTracks(params);
  };

  $routeProvider
    .when('/', {
      templateUrl: '/client/views/landing.html'
    })
    .when('/playlist', {
      templateUrl: '/client/views/playlist.html',
      controller: 'PlaylistCtrl',
      resolve: {
        user: authorized,
        playlists: getPlaylists
      }
    })
    .when('/:id', {
      templateUrl: '/client/views/playlist-detail.html',
      controller: 'PlaylistDetailCtrl',
      resolve: {
        playlist: getPlaylist
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});