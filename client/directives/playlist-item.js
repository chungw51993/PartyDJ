angular.module('partyDJ')

.directive('playlistItem', () => {
  return {
    scope: {
      playlist: '<',
      redirect: '<',
      showEdit: '<',
      showDelete: '<',
    },
    restrict: 'E',
    link: (scope) => {
      scope.showEditPopup = () => {
        scope.showEdit(scope.playlist);
      };

      scope.showDeletePopup = () => {
        scope.showDelete(scope.playlist);
      };

      scope.goToDetail = () => {
        scope.redirect(scope.playlist.id);
      };
    },
    template: `
      <div class="playlist-item">
        <div ng-click="goToDetail()" class="title">{{ playlist.name }}</div>
        <div class="date">{{ playlist.createdAt.slice(0, 10) }}</div>
        <button class="editPL" ng-click="showEditPopup()">Edit</button>
        <button class="deletePL" ng-click="showDeletePopup()">Delete</button>
        <hr>
      </div>
    `
  };
});