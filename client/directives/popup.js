angular.module('partyDJ')

.directive('popup', () => {
  return {
    scope: {
      service: '<',
      current: '<',
      cancel: '<',
      message: '<',
      sub: '<',
      delete: '<',
      name: '<',
      input: '<'
    },
    restrict: 'E',
    link: (scope) => {
      scope.handleClick = () => {
        if (scope.current && scope.name === undefined) {
          scope.service(scope.current.id);
        } else if (scope.current && scope.name) {
          scope.service(scope.current.id, scope.name);
        } else {
          scope.service(scope.name);
        }
      };

      scope.handleCancel = () => {
        scope.cancel();
      };
    },
    template: `
      <div>
        <div class="mdl-card mdl-shadow--8dp">
          <h4 class="popupMsg">{{ message }}</h4>
          <p class="popupSub">{{ sub }}</p>
          <input class="playlistname" ng-if="input" ng-model="name" placeholder="Playlist Name" >
          <button class="submit" ng-click="handleClick()">Submit</button>
          <button class="cancel" ng-click="handleCancel()">Cancel</button>
        </div>
      </div>
    `
  };
});