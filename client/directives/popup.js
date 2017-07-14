angular.module('partyDJ')

.controller('PopupCtrl', function($scope) {
  this.handleClick = () => {
    if (this.current) {
      this.service(this.current.id);
    } else {
      this.service();
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
      name: '<'
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
        <input ng-if="ctrl.name" ng-model="ctrl.name" placeholder="Playlist Name" >
        <button ng-click="ctrl.handleClick()">Delete</button>
        <button ng-click="ctrl.handleCancel()">Cancel</button>
      </div>
    </div>
    `
  };
});