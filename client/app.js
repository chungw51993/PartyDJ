angular.module('partyDJ', [
  'ui.router'
])

.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

  const authorized = (Auth) => {
    return Auth.isAuthorized();
  };

  const getPlaylists = (Playlist) => {
    return Playlist.getPlaylists();
  };

  const isLoggedIn = (Auth) => {
    return Auth.isLoggedIn();
  };

  const getPlaylist = (Playlist, $stateParams) => {
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
.run(() => {

  soundManager.setup({
    url: '../node_modules/soundmanager2/swf',
    onready: () => {
      console.log('soundManager is ready');
    },
    ontimeout: () => {
      console.log('soundManager timing out');
    },
    debugMode: false
  });

  componentHandler.upgradeAllRegistered();

});