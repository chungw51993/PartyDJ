angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {
  const authorized = function(Auth) {
    return Auth.isAuthorized();
  };

  $routeProvider
    .when('/', {
      templateUrl: '/client/views/landing.html'
    })
    .when('/playlist', {
      templateUrl: '/client/views/playlist.html',
      controller: 'PlaylistCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});