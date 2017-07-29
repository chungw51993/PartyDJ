angular.module('partyDJ')

.directive('musicPlayer', ($timeout, Auth) => {
  return {
    scope: {
      user: '<',
      playlist: '<',
      current: '<',
      tracks: '<',
      next: '<'
    },
    restrict: 'E',
    link: (scope) => {
      scope.gong = 0;
      scope.playing = false;
      scope.isAdmin = Auth.checkIfAdmin(scope);

      scope.playTrack = (song) => {
        soundManager.createSound({
          id: song.name,
          url: song.uri,
          onfinish: () => {
            scope.next();
            scope.$apply();
            $timeout(() => {
              if (scope.current.uri === undefined) {
                scope.playing = false;
              } else {
                scope.playTrack(scope.current);
              }
            }, 500);
          }
        });

        scope.playing = true;
        soundManager.play(song.name);
      };

      scope.pauseTrack = (song) => {
        scope.playing = false;
        soundManager.pause(song.name);
      };

      scope.nextTrack = () => {
        if (scope.playing) {
          soundManager.stop(scope.current.name);
          scope.next();
          $timeout(() => {
            scope.playTrack(scope.current);
          }, 500);
        } else {
          scope.next();
        }
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
        <marquee class="col-md-12 col-lg-12 col-sm-12">
          <div>
            <b>{{ current.name }}</b>
            - {{ current.Album.Artist.name }}
            <span class="label">{{ current.Album.name }}</span>
          </div>
        </marquee>
        <button class="play col-md-2 col-lg-2 col-sm-2" ng-click="playTrack(current)" ng-if="!playing" ng-disabled="!isAdmin">Play</button>
        <button class="pause col-md-2 col-lg-2 col-sm-2" ng-click="pauseTrack(current)" ng-if="playing" ng-disabled="!isAdmin">Pause</button>
        <div class="col-md-8 col-lg-8 col-sm-8"></div>
        <button class="next col-md-2 col-lg-2 col-sm-2" ng-click="nextTrack()" ng-if="isAdmin">Next</button>
        <button class="gong col-md-2 col-lg-2 col-sm-2" ng-click="gongTrack()" ng-if="!isAdmin" ng-disabled="gonged">Gong</button>
      </div>
    `
  };
});