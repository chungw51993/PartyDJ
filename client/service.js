angular.module('partyDJ')

.factory('Auth', function($http, $timeout, $location) {
  return {

    isAuthorized: function() {
      return $http({
        method: 'GET',
        url: '/api/user/authorized'
      })
      .then((resp) => {
        return resp.data;
      })
      .catch(() => {
        $timeout(() => {
          $location.path('/landing');
        });
      });
    }

  };
});