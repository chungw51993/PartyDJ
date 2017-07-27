angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($scope, $stateParams, Playlist, Track, socket, user, playlist) {
  this.user = user;
  this.playlist = playlist;

  var current = playlist.Tracks.shift();
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
          this.search = resp.tracks.items;
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
        this.tracks.push(resp);
      });
  };

  this.nextTrack = () => {
    this.played.push(this.currentSong);
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
      .then((resp) => {
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
      });
  };

  this.showAddTrackPopup = () => {
    this.showAddTrack = true;
  };

  this.cancelAdd = () => {
    this.showAddTrack = false;
  };

});