angular.module('partyDJ', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  const authorized = function(Auth) {
    return Auth.isAuthorized();
  };

  const getPlaylists = function(Playlist) {
    return Playlist.getPlaylists();
  };

  const isLoggedIn = function(Auth) {
    return Auth.isLoggedIn();
  };

  const getPlaylist = function(Playlist, $stateParams) {
    return Playlist.getAllTracks($stateParams.id);
  };

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/client/views/landing.html'
    })
    .state('playlists', {
      url: '/playlist',
      templateUrl: '/client/views/playlist.html',
      controller: 'PlaylistCtrl',
      controllerAs: 'ctrl',
      resolve: {
        user: authorized,
        playlists: getPlaylists
      }
    })
    .state('details', {
      url: '/:id',
      templateUrl: '/client/views/playlist-detail.html',
      controller: 'PlaylistDetailCtrl',
      controllerAs: 'ctrl',
      resolve: {
        user: isLoggedIn,
        playlist: getPlaylist
      }
    });

  $urlRouterProvider.otherwise('/');

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