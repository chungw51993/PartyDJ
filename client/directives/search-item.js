angular.module('partyDJ')

.controller('SearchItemCtrl', function() {
  this.addTrack = (track) => {
    this.add(track);
  };
})

.directive('searchItem', function() {
  return {
    scope: {
      track: '<',
      add: '<'
    },
    restrict: 'E',
    controller: 'SearchItemCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <div>
        <img ng-src="{{ ctrl.track.album.images[2].url }}">
        <div ng-click="ctrl.addTrack(ctrl.track)">{{ ctrl.track.name }}</div>
        <div>{{ ctrl.track.artists[0].name }}</div>
        <hr>
      </div>
    `
  };
});