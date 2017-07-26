angular.module('partyDJ', [
  'ngRoute'
])

.config(function($routeProvider, $locationProvider) {

  const authorized = function(Auth) {
    return Auth.isAuthorized();
  };

  const getPlaylists = function(Playlist) {
    return Playlist.getPlaylists();
  };

  const isLoggedIn = function(Auth) {
    return Auth.isLoggedIn();
  };

  const getPlaylist = function(Playlist, $location) {
    return Playlist.getAllTracks($location.path().slice(1));
  };

  $routeProvider
    .when('/', {
      templateUrl: '/client/views/landing.html'
    })
    .when('/playlist', {
      templateUrl: '/client/views/playlist.html',
      controller: 'PlaylistCtrl',
      controllerAs: 'ctrl',
      resolve: {
        user: authorized,
        playlists: getPlaylists
      }
    })
    .when('/:id', {
      templateUrl: '/client/views/playlist-detail.html',
      controller: 'PlaylistDetailCtrl',
      controllerAs: 'ctrl',
      resolve: {
        user: isLoggedIn,
        playlist: getPlaylist
      }
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
})
.run(function() {
  soundManager.setup({
    url: '../node_modules/soundmanager2/swf',
    onready: function() {
      console.log('soundManager is ready');
    },
    ontimeout: () => {
      console.log('soundManager timing out');
    }
  });
});