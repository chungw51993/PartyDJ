angular.module('partyDJ')

.directive('musicPlayer', ($timeout, Auth, socket) => {
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

      scope.duration = '0:00';
      scope.progress = {
        background: 'grey',
        marginTop: '5px',
        height: '20px',
        width: '0%'
      };

      scope.playTrack = (song) => {
        soundManager.createSound({
          id: song.name,
          url: song.uri,
          autoLoad: true,
          whileloading: function() {
            const duration = new Date(this.duration);
            const m = duration.getMinutes();
            const s = duration.getSeconds();

            scope.duration = m + ':' + s;
          },
          whileplaying: function() {
            const width = ((this.position / this.duration) * 100) + '%';
            scope.progress = {
              background: 'grey',
              marginTop: '5px',
              height: '20px',
              width: width
            };
            scope.$apply();
            let progress = scope.progress;
            progress.duration = scope.duration;
            socket.emit('update:progress', progress);
          },
          onfinish: () => {
            scope.next();
            scope.$apply();
            $timeout(() => {
              if (scope.current.uri === undefined) {
                scope.playing = false;
                scope.duration = '0:00';
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
        socket.emit('gonged:track', 'GONGED!!');
      };

      socket.on('gong:track', () => {
        if (scope.gong < 2) {
          scope.gong++;
        } else {
          scope.nextTrack();
          scope.gonged = false;
          scope.gong = 0;
        }
      });

      socket.on('progress:track', (progress) => {
        if (progress.width !== scope.progress.width) {
          scope.progress = {
            background: progress.background,
            marginTop: progress.marginTop,
            height: progress.height,
            width: progress.width
          };
          scope.duration = progress.duration;
        }
      });

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
        <div ng-if="isAdmin">
          <button class="play col-md-2 col-lg-2 col-sm-2" ng-click="playTrack(current)" ng-if="!playing">Play</button>
          <button class="pause col-md-2 col-lg-2 col-sm-2" ng-click="pauseTrack(current)" ng-if="playing">Pause</button>
        </div>
        <div ng-if="isAdmin">
          <div class="startTime col-md-1 col-lg-1 col-sm-1">0:00</div>
          <div class="col-md-6 col-lg-6 col-sm-6" >
            <div class="progressBar">
              <div ng-style="progress"></div>
            </div>
          </div>
          <div class="endTime col-md-1 col-lg-1 col-sm-1">{{ duration }}</div>
        </div>
        <div ng-if="!isAdmin">
          <div class="startTime col-md-1 col-lg-1 col-sm-1">0:00</div>
          <div class="col-md-8 col-lg-8 col-sm-8" >
            <div class="progressBar">
              <div ng-style="progress"></div>
            </div>
          </div>
          <div class="endTime col-md-1 col-lg-1 col-sm-1">{{ duration }}</div>
        </div>
        <button class="next col-md-2 col-lg-2 col-sm-2" ng-click="nextTrack()" ng-if="isAdmin">Next</button>
        <button class="gong col-md-2 col-lg-2 col-sm-2" ng-click="gongTrack()" ng-if="!isAdmin" ng-disabled="gonged">Gong</button>
      </div>
    `
  };
});