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
      <div class="playlist-item row">
        <div class="col-10 col-sm-10 col-md-10 col-lg-10">
          <div ng-click="goToDetail()" class="title">{{ playlist.name }}</div>
          <div class="date">{{ playlist.createdAt.slice(0, 10) }}</div>
        </div>
        <button class="editPL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="showEditPopup()">Edit</button>
        <button class="deletePL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ng-click="showDeletePopup()">Delete</button>
      </div>
    `
  };
});