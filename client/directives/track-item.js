angular.module('partyDJ')

.directive('trackItem', function() {
  return {
    scope: {
      track: '<',
      user: '<',
      playlist: '<',
      service: '<',
      play: '<'
    },
    restrict: 'E',
    link: function(scope) {
      scope.isAdmin = false;

      scope.checkIfAdmin = () => {
        if (scope.playlist.user_id === scope.user.spotify_id) {
          scope.isAdmin = true;
        }
      };

      scope.deleteTrack = () => {
        scope.service(scope.track.id);
      };

      scope.playTrack = (song) => {

        scope.play(song);
      };

      scope.checkIfAdmin();
    },
    template: `
      <div class="row trackItem">
        <img class="trackImg col-md-2 col-sm-2 col-lg-2" ng-src="{{ track.Album.image }}">
        <div class="col-md-8 col-sm-8 col-lg-8">
          <div class="trackName">Title: {{ track.name }}</div>
          <div class="trackArtist">Artist: {{ track.Album.Artist.name }}</div>
          <div class="trackAlbum">Album: {{ track.Album.name }}</div>
        </div>
        <button ng-click="playTrack(track)">Play</button>
        <button ng-if="isAdmin" ng-click="deleteTrack()" class="trackDelete col-md-2 col-sm-2 col-lg-2">Delete</button>
      </div>
    `
  };
});