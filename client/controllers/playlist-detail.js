angular.module('partyDJ')

.controller('PlaylistDetailCtrl', function($routeParams, Playlist, Track, user) {
  this.playlist = {};
  this.user = user;
  this.search = [];
  this.tracks = [];
  this.played = [];
  this.showAddTrack = false;
  this.currentSong = {};

  this.query = '';
  this.searchList = false;

  this.getAllTracks = () => {
    Playlist.getAllTracks($routeParams.id)
      .then((resp) => {
        this.query = '';
        this.searchList = false;
        this.playlist = resp;
        this.tracks = resp.Tracks;
        this.currentSong = resp.Tracks[0];
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

    Track.addTrack($routeParams.id, album, artist, track)
      .then(() => {
        this.getAllTracks();
        this.showAddTrack = false;
      });
  };

  this.nextTrack = () => {
    const played = this.tracks.shift();
    this.played.push(played);
    if (this.tracks.length !== 0) {
      this.currentSong = this.tracks[0];
    } else {
      this.currentSong = {};
    }
  };

  this.deleteTrack = (tid) => {
    Track.deleteTrack($routeParams.id, tid)
      .then((resp) => {
        this.getAllTracks();
      });
  };

  this.showAddTrackPopup = () => {
    this.showAddTrack = true;
  };

  this.cancelAdd = () => {
    this.showAddTrack = false;
  };

  this.getAllTracks();
});