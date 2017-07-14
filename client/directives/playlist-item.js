angular.module('partyDJ')

.controller('PlaylistItemCtrl', function() {
  this.showEditPopup = () => {
    this.showEdit(this.playlist);
  };

  this.showDeletePopup = () => {
    this.showDelete(this.playlist);
  };

  this.goToDetail = () => {
    this.redirect(this.playlist.id);
  };
})

.directive('playlistItem', function() {
  return {
    scope: {
      playlist: '<',
      redirect: '<',
      showEdit: '<',
      showDelete: '<',
    },
    restrict: 'E',
    controller: 'PlaylistItemCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
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