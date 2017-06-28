angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/client/view/landing.html',
      controller: 'LandingCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(true);
})