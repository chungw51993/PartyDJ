angular.module('partyDJ', [

])

.config(($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/view/landing.html'
    }
    .when('/login', {
      templateUrl: '/view/login.html',
      controller: 'AuthCtrl'
    })
    .when('/signup', {
      templateUrl: '/view/signup.html',
      controller: 'AuthCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(true);
})