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
        <div class="col-7 col-sm-7 col-md-8 col-lg-8">
          <div ng-click="goToDetail()" class="title">{{ playlist.name }}</div>
          <div class="date">Created on: {{ date }}</div>
        </div>
        <button class="deletePL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ng-click="showDeletePopup()">Delete</button>
        <button class="editPL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" ng-click="showEditPopup()">Edit</button>
        <button class="sharePL mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Share</button>
      </div>
    `
  };
});