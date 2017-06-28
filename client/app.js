angular.module('partyDJ', [
  'ngRoute',
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/client/view/landing.html',
      controller: function($scope, $location) {
        $scope.loginRedirect = () => {
          $location.path('/login');
        }

        $scope.signupRedirect = () => {
          $location.path('/signup');
        }
      }
    })
    .when('/login', {
      templateUrl: '/client/view/login.html',
      controller: 'AuthCtrl'
    })
    .when('/signup', {
      templateUrl: '/client/view/signup.html',
      controller: 'AuthCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })

  $locationProvider.html5Mode(true);
})