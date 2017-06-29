angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/client/view/landing.html'
    })
    .when('/playlist', {
      templateUrl: '/client/view/playlist.html',
      controller: 'PlaylistCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(true);
})