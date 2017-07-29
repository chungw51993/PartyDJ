angular.module('partyDJ')

.directive('searchItem', () => {
  return {
    scope: {
      track: '<',
      add: '<'
    },
    restrict: 'E',
    link: (scope) => {
      scope.addTrack = (track) => {
        scope.add(track);
      };
    },
    template: `
      <div>
        <img ng-src="{{ track.album.images[2].url }}">
        <div ng-click="addTrack(track)">Title: {{ track.name }}</div>
        <div>Artist: {{ track.artists[0].name }}</div>
        <div>Album: {{ track.album.name }}</div>
        <hr>
      </div>
    `
  };
});