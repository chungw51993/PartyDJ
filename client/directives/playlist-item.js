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

      scope.date = moment(scope.playlist.createdAt.slice(0, 10)).format('MMMM Do YYYY');
    },
    template: `
      <div class="playlist-item row">
        <div class="col-9 col-sm-9 col-md-10 col-lg-10">
          <div ng-click="goToDetail()" class="title">Name: {{ playlist.name }}</div>
          <div class="date">Created on: {{ date }}</div>
        </div>
        <button class="editPL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="showEditPopup()">Edit</button>
        <button class="deletePL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ng-click="showDeletePopup()">Delete</button>
      </div>
    `
  };
});