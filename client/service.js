angular.module('partyDJ')

.factory('Auth', function($http, $timeout, $location) {
  return {

    isAuthorized: function() {
      return $http({
        method: 'GET',
        url: '/api/user/authorized'
      })
      .then((resp) => {
        if (typeof resp.data !== 'object') {
          $location.path('/');
        } else {
          return resp.data;
        }
      })
      .catch(() => {
        $timeout(() => {
          $location.path('/');
        });
      });
    },

    isLoggedIn: function() {
      return $http({
        method: 'GET',
        url: '/api/user/loggedin'
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
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

    deletePlaylist: function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/playlist/' + id
      });
    },

    editPlaylist: function(id, title) {
      return $http({
        method: 'PUT',
        url: '/api/playlist',
        data: {
          pid: id,
          title: title
        }
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
})

.factory('Track', function($http) {
  return {

    searchTrack: function(query) {
      return $http({
        method: 'POST',
        url: '/api/track/',
        data: {
          q: query
        }
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    addTrack: function(pid, track) {

    }

  };
});