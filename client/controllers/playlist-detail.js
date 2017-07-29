angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $stateParams, Playlist, Track, socket, user, playlist) {
  this.user = user;
  this.playlist = playlist;

  const current = playlist.Tracks.shift();
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

  this.query = '';
  this.search = [];

  this.showAddTrack = false;
  this.searchList = false;

  this.searchTrack = (query) => {
    if (query !== '') {
      this.showSearchList = true;
      Track.searchTrack(query)
        .then((resp) => {
          this.search = resp;
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
        socket.emit('new:track', resp.id);
      });
  };

  this.nextTrack = () => {
    this.played.push(this.currentSong);
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

  socket.on('add:track', (data) => {
    if (data !== this.tracks[this.tracks.length - 1].id) {
      this.tracks.push(data);
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
    this.currentSong = data.current;
    this.tracks = data.tracks;
    this.played = data.played;
  });

});