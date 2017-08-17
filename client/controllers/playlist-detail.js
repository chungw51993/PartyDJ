angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $stateParams, $location, Playlist, Track, Auth, socket, user, playlist) {
  socket.reconnect();
  const leftOff = JSON.parse(window.localStorage.getItem(playlist.name));
  this.user = user;
  this.playlist = playlist;
  this.admin = Auth.checkIfAdmin(this);
  const current = playlist.Tracks.shift();

  if (leftOff) {
    this.currentSong = leftOff.current;
    this.tracks = leftOff.tracks;
    this.played = leftOff.played;
  } else {
    this.currentSong = current ? current : {
      name: 'Title',
      Album: {
        name: 'Album',
        Artist: {
          name: 'Artist'
        }
      }
    };
    this.tracks = playlist.Tracks;
    this.played = [];
  }

  this.query = '';
  this.search = [];

  this.showAddTrack = false;
  this.searchList = false;
  this.loadingSearch = false;

  this.searchTrack = (query) => {
    if (query !== '') {
      this.loadingSearch = true;
      Track.searchTrack(query)
        .then((resp) => {
          this.loadingSearch = false;
          const reference = {};
          this.search = resp.reduce((acc, song) => {
            if (!reference[song.name] && song.name !== undefined) {
              reference[song.name] = 1;
              acc.push(song);
              return acc;
            } else {
              return acc;
            }
          }, []);
          this.showSearchList = true;
        });
    } else {
      this.showSearchList = false;
      this.search = [];
    }
  };

  this.addTrack = (song) => {
    const album = {
      id: song.album.id,
      name: song.album.name,
      image: song.album.images[2].url
    };

    const artist = {
      id: song.artists[0].id,
      name: song.artists[0].name
    };

    const track = {
      id: song.id,
      name: song.name,
      uri: song.preview_url
    };


    Track.addTrack($stateParams.id, album, artist, track)
      .then((resp) => {
        this.showAddTrack = false;
        this.showSearchList = false;
        this.query = '';
        this.search = [];
        if (this.tracks.length === 0 && this.currentSong.name === 'Title') {
          this.currentSong = resp;
        } else {
          this.tracks.push(resp);
        }
        socket.emit('new:track', resp);
      });
  };

  this.nextTrack = () => {
    if (this.currentSong.name !== 'Title') {
      this.played.push(this.currentSong);
    }

    socket.emit('skip:track', this.currentSong.id);

    if (this.tracks.length > 0) {
      this.currentSong = this.tracks.shift();
    } else {
      this.currentSong = {
        name: 'Title',
        Album: {
          name: 'Album',
          Artist: {
            name: 'Artist'
          }
        }
      };

      if (leftOff) {
        window.localStorage.removeItem(playlist.name);
      }
    }
  };

  this.deleteTrack = (tid, status) => {
    Track.deleteTrack($stateParams.id, tid)
      .then(() => {
        if (!status) {
          this.tracks = this.tracks.filter((track) => {
            if (track.id !== tid) {
              return track;
            }
          });
        } else {
          this.played = this.played.filter((track) => {
            if (track.id !== tid) {
              return track;
            }
          });
        }

        socket.emit('remove:track', {
          tid: tid,
          status: status
        });
      });
  };

  this.showAddTrackPopup = () => {
    this.showAddTrack = true;
  };

  this.cancelAdd = () => {
    this.showAddTrack = false;
  };

  this.goBack = () => {
    $location.path('/playlists');
  };

  socket.on('add:track', (data) => {
    if (this.tracks.length > 0) {
      if (data.id !== this.tracks[this.tracks.length - 1].id) {
        this.tracks.push(data);
      }
    } else {
      this.currentSong = data;
    }
  });

  socket.on('next:track', (data) => {
    if (data === this.currentSong.id) {
      this.nextTrack();
    }
  });

  socket.on('delete:track', (data) => {
    if (!data.status) {
      this.tracks = this.tracks.filter((track) => {
        if (track.id !== data.tid) {
          return track;
        }
      });
    } else {
      this.played = this.played.filter((track) => {
        if (track.id !== data.tid) {
          return track;
        }
      });
    }
  });

  socket.on('new:user', (data) => {
    const current = {
      current: this.currentSong,
      tracks: this.tracks,
      played: this.played
    };

    if (playlist.user_id === user.spotify_id) {
      socket.emit('current:track', current);
    }
  });

  socket.on('catch:up', (data) => {
    if (playlist.user_id !== user.spotify_id) {
      this.currentSong = data.current;
      this.tracks = data.tracks;
      this.played = data.played;
    }
  });

  $scope.$on('$locationChangeSuccess', () => {
    if (Auth.checkIfAdmin(this)) {
      if (this.played.length !== 0) {
        const last = {
          current: this.currentSong,
          tracks: this.tracks,
          played: this.played
        };
        window.localStorage.setItem(this.playlist.name, JSON.stringify(last));
      }
    }
    socket.disconnect();
  });

});