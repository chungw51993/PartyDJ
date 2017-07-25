angular.module('partyDJ')

.directive('musicPlayer', function($timeout) {
  return {
    scope: {
      current: '<',
      tracks: '<',
      next: '<'
    },
    restrict: 'E',
    link: function(scope) {
      scope.gong = 0;

      scope.playTrack = (song) => {
        soundManager.createSound({
          id: song.name,
          url: song.uri,
          onfinish: () => {
            scope.next();
            scope.$apply();
            $timeout(() => {
              scope.playTrack(scope.current);
            }, 500);
          }
        });

        soundManager.play(song.name);
      };

      scope.pauseTrack = (song) => {
        soundManager.pause(song.name);
      };

      scope.nextTrack = () => {
        soundManager.stop(scope.current.name);
        scope.next();
        $timeout(() => {
          scope.playTrack(scope.current);
        }, 500);
      };

      scope.gongTrack = () => {
        scope.gonged = true;
        if (scope.gong < 2) {
          scope.gong++;
        } else {
          scope.nextTrack();
          scope.gonged = false;
          scope.gong = 0;
        }
      };

    },
    template: `
      <div class="row player">
        <button class="play col-md-1 col-lg-1 col-sm-1" ng-click="playTrack(current)">Play</button>
        <button class="pause col-md-1 col-lg-1 col-sm-1" ng-click="pauseTrack(current)">Pause</button>
        <marquee class="col-md-8 col-lg-8 col-sm-8">
          <div>
            <b>{{ current.name }}</b>
            - {{ current.Album.Artist.name }}
            <span class="label">{{ current.Album.name }}</span>
          </div>
        </marquee>
        <button class="next col-md-1 col-lg-1 col-sm-1" ng-click="nextTrack()">Next</button>
        <button class="gong col-md-1 col-lg-1 col-sm-1" ng-click="gongTrack()" ng-disabled="gonged">Gong</button>
      </div>
    `
  };
});