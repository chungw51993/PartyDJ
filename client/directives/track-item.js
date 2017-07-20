angular.module('partyDJ')

.controller('TrackItemCtrl', function() {

})

.directive('trackItem', function() {
  return {
    scope: {
      track: '<'
    },
    restrict: 'E',
    controller: 'TrackItemCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div>
        <div>{{ ctrl.track.name }}</div>
      </div>
    `
  };
});