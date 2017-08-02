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
          <p class="popupSub" ng-if="sub">{{ sub }}</p>
          <div class="mdl-textfield mdl-js-textfield">
            <input class="playlistname mdl-textfield__input" ng-if="input" ng-model="name" type="text" id="name">
            <label class="mdl-textfield__label" for="name">Playlist Name</label>
          </div>
          <button class="submit" ng-click="handleClick()">Submit</button>
          <button class="cancel" ng-click="handleCancel()">Cancel</button>
        </div>
      </div>
    `
  };
});