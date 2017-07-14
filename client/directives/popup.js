angular.module('partyDJ')

.controller('PopupCtrl', function($scope) {
  console.log(this);
})

.directive('popup', function() {
  return {
    scope: {
      service: '<',
      currentPL: '<'
    },
    restrict: 'E',
    controller: 'PopupCtrl',
    bindToController: true,
    template: `
    <div>
      <div class="mdl-card mdl-shadow--8dp">
        <h4>Are you sure you want to delete {{ currentPL.name }}?</h4>
        <p>You won't be able to get the playlist back after it is deleted</p>
        <button ng-click="deletePlaylist(currentPL.id)">Delete</button>
        <button ng-click="cancelDelete()">Cancel</button>
      </div>
    </div>
    `
  };
});