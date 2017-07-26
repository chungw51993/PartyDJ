angular.module('partyDJ')

.directive('musicPlayer', function($timeout) {
  return {
    scope: {
      user: '<',
      playlist: '<',
      current: '<',
      tracks: '<',
      next: '<'
    },
    restrict: 'E',
    link: function(scope) {
      scope.gong = 0;
      scope.playing = false;
      scope.isAdmin = false;

      scope.checkIfAdmin = () => {
        if (scope.playlist.user_id === scope.user.spotify_id) {
          console.log(scope.playlist, scope.user);
          scope.isAdmin = true;
        }
      };

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

        scope.playing = true;
        soundManager.play(song.name);
      };

      scope.pauseTrack = (song) => {
        scope.playing = false;
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

      scope.checkIfAdmin();
    },
    template: `
      <div class="row player">
        <button class="play col-md-2 col-lg-2 col-sm-2" ng-click="playTrack(current)" ng-if="!playing"></button>
        <button class="pause col-md-2 col-lg-2 col-sm-2" ng-click="pauseTrack(current)" ng-if="playing"></button>
        <marquee class="col-md-10 col-lg-10 col-sm-10">
          <div>
            <b>{{ current.name }}</b>
            - {{ current.Album.Artist.name }}
            <span class="label">{{ current.Album.name }}</span>
          </div>
        </marquee>
        <button class="next col-md-2 col-lg-2 col-sm-2" ng-click="nextTrack()" ng-if="isAdmin"></button>
        <button class="gong col-md-2 col-lg-2 col-sm-2" ng-click="gongTrack()" ng-if="!isAdmin" ng-disabled="gonged"></button>
      </div>
    `
  };
});