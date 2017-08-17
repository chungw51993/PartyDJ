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
        <img class="searchImage" ng-src="{{ track.album.images[2].url }}">
        <div>
          <div ng-click="addTrack(track)" class="searchTitle"><strong>Title: {{ track.name }}</strong></div>
          <div class="searchArtist">Artist: {{ track.artists[0].name }}</div>
          <div class="searchAlbum">Album: {{ track.album.name }}</div>
        </div>
      </div>
    `
  };
});