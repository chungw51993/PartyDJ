angular.module('partyDJ')

.factory('Auth', function($http) {
  return {
    isAuthorized: function() {
      return $http({
        method: 'GET',
        url: '/api/user/authorized'
      })
      .then((data) => {
        console.log(JSON.parse(data));
      })
    }
  }
})