angular.module('partyDJ')

.controller('LandingCtrl', function($scope, $location, Auth) {
  $scope.handleLogin = function() {
    Auth.login()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      })
  }
})