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
          <div class="popupMsg">{{ message }}</div>
          <div class="popupSub">{{ sub }}</div>
          <div class="playlistname mdl-textfield mdl-js-textfield" ng-if="input">
            <input class=" mdl-textfield__input" ng-model="name" type="text" id="name">
            <label class="mdl-textfield__label" for="name">Playlist Name</label>
          </div>
          <div class="buttons">
            <button class="submit mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="handleClick()">Submit</button>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ng-click="handleCancel()">Cancel</button>
          </div>
        </div>
      </div>
    `
  };
});