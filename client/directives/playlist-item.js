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
        <div ng-click="ctrl.goToDetail()" class="title">{{ ctrl.playlist.name }}</div>
        <div class="date">{{ ctrl.playlist.createdAt.slice(0, 10) }}</div>
        <button class="editPL" ng-click="ctrl.showEditPopup()">Edit</button>
        <button class="deletePL" ng-click="ctrl.showDeletePopup()">Delete</button>
        <hr>
      </div>
    `
  };
});