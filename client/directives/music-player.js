angular.module('partyDJ')

.directive('musicPlayer', function() {
  return {
    scope: {
      current: '<',
      tracks: '<'
    },
    restrict: 'E',
    link: function(scope) {
      console.log(scope);

      scope.playTrack = () => {
        soundManager.createSound({
          id: scope.current.name,
          url: scope.current.uri
        });

        soundManager.play(scope.current.name);
      };
    },
    template: `
      <div class="row player">
        <button class="play col-md-1 col-lg-1 col-sm-1" ng-click="playTrack()">Play</button>
        <div class="pause col-md-1 col-lg-1 col-sm-1">Pause</div>
        <marquee class="col-md-8 col-lg-8 col-sm-8">
          <b>{{ current.name }}</b>
          - {{ current.Album.Artist.name }}
          <span class="label">{{ current.Album.name }}</span>
        </marquee>
        <div class="next col-md-1 col-lg-1 col-sm-1">Next</div>
        <div class="gong col-md-1 col-lg-1 col-sm-1">Gong</div>
      </div>
    `
  };
});