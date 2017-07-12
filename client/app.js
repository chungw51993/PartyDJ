angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {

  const authorized = function(Auth) {
    return Auth.isAuthorized();
  };

  const getPlaylist = function(Playlist) {
    return Playlist.getPlaylists();
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
        playlists: getPlaylist
      }
    })
    .when('/:id', {
      templateUrl: '/client/views/playlist-detail.html',
      controller: 'PlaylistDetailCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});