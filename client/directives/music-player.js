angular.module('partyDJ')

.directive('musicPlayer', function() {
  return {
    scope: {

    },
    restrict: 'E',
    link: function(scope) {

    },
    template: `
      <div class="row player">
        <div class="play col-md-1 col-lg-1 col-sm-1">Play</div>
        <div class="pause col-md-1 col-lg-1 col-sm-1">Pause</div>
        <marquee class="col-md-8 col-lg-8 col-sm-8">
          <b>Title</b>
        </marquee>
      </div>
    `
  };
});