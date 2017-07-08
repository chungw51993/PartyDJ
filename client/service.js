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
})

.factory('Playlist', function($http, $location) {
  return {

    getPlaylists: function() {
      return $http({
        method: 'GET',
        url: '/api/playlist'
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    newPlaylist: function(title) {
      return $http({
        method: 'POST',
        url: '/api/playlist',
        data: {
          title: title
        }
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    getAllTracks: function(id) {
      return $http({
        method: 'GET',
        url: '/api/playlist/' + id
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    }

  };
});