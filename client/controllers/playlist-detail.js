angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($routeParams, Playlist, Track, user) {
  this.playlist = {};
  this.user = user;
  this.search = [];
  this.tracks = [];

  this.query = '';
  this.searchList = false;

  this.getAllTracks = () => {
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        this.query = '';
        this.searchList = false;
        this.playlist = resp;
        this.tracks = resp.Tracks;
      });
  };

  this.searchTrack = (query) => {
    if (query !== '') {
      this.searchList = true;
      Track.searchTrack(query)
        .then((resp) => {
          this.search = resp.tracks.items;
        });
    } else {
      this.searchList = false;
      this.search = [];
    }
  };

  this.addTrack = (song) => {
    let album = {
      id: song.album.id,
      name: song.album.name,
      image: song.album.images[2].url
    };

    let artist = {
      id: song.artists[0].id,
      name: song.artists[0].name
    };

    let track = {
      id: song.id,
      name: song.name,
      uri: song.preview_url
    };

    Track.addTrack($routeParams.id, album, artist, track)
      .then(() => {
        this.getAllTracks();
      });
  };

  this.deleteTrack = (tid) => {
    Track.deleteTrack($routeParams.id, tid)
      .then((resp) => {
        this.getAllTracks();
      });
  };

  this.getAllTracks();
});