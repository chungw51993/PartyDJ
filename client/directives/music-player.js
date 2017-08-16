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
        height: '15px',
        width: '0%',
        borderRadius: '35px'
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
              height: '15px',
              borderRadius: '30px',
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
        <marquee class="marquee col-md-12 col-lg-12 col-sm-12">
          <div>
            <span class="description">
              <b>{{ current.name }}</b> - {{ current.Album.Artist.name }}
            </span>
            <span class="label">{{ current.Album.name }}</span>
          </div>
        </marquee>
        <div ng-if="isAdmin">
          <button class="play col-lg-2 col-md-2 col-sm-2 col-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="playTrack(current)" ng-if="!playing" ng-disabled="current.name === 'Title'"><img src="client/assets/image/play.svg" />Play</button>
          <button class="pause col-lg-2 col-md-2 col-sm-2 col-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="pauseTrack(current)" ng-if="playing"><img src="client/assets/image/pause.svg" />Pause</button>
          <div class="time col-lg-1 col-md-1 col-sm-1 col-1">0:00</div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-4" >
            <div class="progressBar">
              <div ng-style="progress"></div>
            </div>
          </div>
          <div class="time col-lg-1 col-md-1 col-sm-1 col-1">{{ duration }}</div>
          <button class="next col-lg-2 col-md-2 col-sm-2 col-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="nextTrack()" ng-disabled="tracks.length === 0"><img src="client/assets/image/next.svg" /> Next</button>
        </div>
        <div ng-if="!isAdmin">
          <div class="time col-lg-1 col-md-1 col-sm-1 col-1">0:00</div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-8" >
            <div class="progressBar">
              <div ng-style="progress"></div>
            </div>
          </div>
          <div class="time col-lg-1 col-md-1 col-sm-1 col-1">{{ duration }}</div>
        </div>
        <button class="gong col-lg-2 col-md-2 col-sm-2 col-2 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="gongTrack()" ng-if="!isAdmin" ng-disabled="gonged"><img src="client/assets/image/sad.svg" /> Gong</button>
      </div>
    `
  };
});