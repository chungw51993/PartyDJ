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
      scope.gong = 0;

      scope.playTrack = () => {
        soundManager.createSound({
          id: scope.current.name,
          url: scope.current.uri
        });

        soundManager.play(scope.current.name);
      };

      scope.pauseTrack = () => {

      };

      scope.nextTrack = () => {
        console.log('NEXT');
      };

      scope.gongTrack = () => {
        if (scope.gong < 3) {
          scope.gong++;
          console.log(scope.gong);
        } else {
          scope.nextTrack();
          scope.gong = 0;
          console.log(scope.gong);
        }
      };

    },
    template: `
      <div class="row player">
        <button class="play col-md-1 col-lg-1 col-sm-1" ng-click="playTrack()">Play</button>
        <button class="pause col-md-1 col-lg-1 col-sm-1">Pause</button>
        <marquee class="col-md-8 col-lg-8 col-sm-8">
          <div>
            <b>{{ current.name }}</b>
            - {{ current.Album.Artist.name }}
            <span class="label">{{ current.Album.name }}</span>
          </div>
        </marquee>
        <button class="next col-md-1 col-lg-1 col-sm-1">Next</button>
        <button class="gong col-md-1 col-lg-1 col-sm-1" ng-click="gongTrack()">Gong</button>
      </div>
    `
  };
});