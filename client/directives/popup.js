angular.module('partyDJ')

.directive('popup', () => {
  return {
    scope: {
      service: '<',
      current: '<',
      cancel: '<',
      message: '<',
      sub: '<',
      name: '<',
      input: '<',
      button: '<',
      disable: '<'
    },
    restrict: 'E',
    link: (scope) => {
      scope.error = false;
      scope.newName = scope.name ? scope.name : '';

      scope.handleClick = () => {
        if (!scope.newName && !scope.name && !scope.current) {
          // Name shouldn't be empty
          scope.error = true;
        } else if (scope.current && !scope.name) {
          // DELETE Service
          scope.service(scope.current.id);
        } else if (scope.current && scope.newName) {
          // EDIT Service
          scope.service(scope.current.id, scope.newName);
        } else if (scope.disable) {
          // COPY Service
          new Clipboard('.copy');
          scope.button = 'Copied';
        } else {
          // New Service
          scope.service(scope.newName);
        }
      };

      scope.handleCancel = () => {
        scope.cancel();
      };
    },
    template: `
      <div>
        <div class="card mdl-card mdl-shadow--8dp">
          <div class="popupMsg">{{ message }}</div>
          <div class="popupSub">{{ sub }}</div>
          <div class="playlistname mdl-textfield mdl-js-textfield" ng-if="input">
            <input class="mdl-textfield__input" id="url" ng-model="$parent.newName" type="text" id="name" ng-readonly="disable">
            <label class="mdl-textfield__label" for="name">Playlist Name</label>
          </div>
          <div class="error" ng-show="error">Name for the playlist can't be empty</div>
          <div class="buttons">
            <button class="submit mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="handleClick()" ng-if="!disable">{{ button }}</button>
            <button class="copy mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-if="disable" data-clipboard-target="#url" ng-click="handleClick()">{{ button }}</button>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ng-click="handleCancel()">Cancel</button>
          </div>
        </div>
      </div>
    `
  };
});