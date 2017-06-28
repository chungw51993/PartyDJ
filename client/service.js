angular.module('partyDJ')

.factory('Auth', function($http) {
  return {
    login: function() {
      return $http({
        method: 'GET',
        url: '/api/user/login'
      })
    }
  }
})