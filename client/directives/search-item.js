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
      <div class="searchItem">
        <img ng-src="{{ track.album.images[2].url }}">
        <div ng-click="addTrack(track)">
          Title: {{ track.name }} <wbr>
          Artist: {{ track.artists[0].name }} <wbr>
          Album: {{ track.album.name }}
        </div>
      </div>
    `
  };
});