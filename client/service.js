angular.module('partyDJ')

.factory('Auth', ($http, $timeout, $location) => {
  return {

    isAuthorized: () => {
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

    isLoggedIn: () => {
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
    },

    checkIfAdmin: (scope) => {
      let admin = false;

      if (scope.user !== undefined) {
        if (scope.playlist.user_id === scope.user.spotify_id) {
          admin = true;
        }
      }

      return admin;
    }

  };
})

.factory('Playlist', ($http, $location) => {
  return {

    getPlaylists: () => {
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

    newPlaylist: (title) => {
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

    deletePlaylist: (id) => {
      return $http({
        method: 'DELETE',
        url: '/api/playlist/' + id
      });
    },

    editPlaylist: (id, title) => {
      return $http({
        method: 'PUT',
        url: '/api/playlist',
        data: {
          pid: id,
          title: title
        }
      });
    },

    getAllTracks: (id) => {
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

.factory('Track', ($http) => {
  return {

    searchTrack: (query) => {
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

    addTrack: (pid, album, artist, track) => {
      return $http({
        method: 'POST',
        url: '/api/track/' + pid,
        data: {
          album: album,
          artist: artist,
          track: track
        }
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    deleteTrack: (pid, tid) => {
      return $http({
        method: 'DELETE',
        url: '/api/track/' + pid,
        params: {
          tid: tid
        }
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

.factory('socket', ($rootScope) => {
  const socket = io.connect();

  return {

    on: (eventName, callback) => {
      socket.on(eventName, () => {
        var args = arguments;
        $rootScope.$apply(() => {
          callback.apply(socket, args);
        });
      });
    },

    emit: (eventName, data, callback) => {
      socket.emit(eventName, data, () => {
        var args = arguments;
        $rootScope.$apply(() => {
          callback.apply(socket, args);
        });
      });
    }

  };
});