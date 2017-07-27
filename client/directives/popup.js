angular.module('partyDJ')

.controller('PopupCtrl', function() {
  this.handleClick = () => {
    if (this.current && this.name === undefined) {
      this.service(this.current.id);
    } else if (this.current && this.name) {
      this.service(this.current.id, this.name);
    } else {
      this.service(this.name);
    }
  };

  this.handleCancel = () => {
    this.cancel();
  };
})

.directive('popup', function() {
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
    controller: 'PopupCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div>
        <div class="mdl-card mdl-shadow--8dp">
          <h4>{{ ctrl.message }}</h4>
          <p>{{ ctrl.sub }}</p>
          <input ng-if="ctrl.input" ng-model="ctrl.name" placeholder="Playlist Name" >
          <button class="submit" ng-click="ctrl.handleClick()">Submit</button>
          <button class="cancel" ng-click="ctrl.handleCancel()">Cancel</button>
        </div>
      </div>
    `
  };
});