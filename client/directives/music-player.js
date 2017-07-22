angular.module('partyDJ')

.directive('musicPlayer', function() {
  return {
    scope: {

    },
    restrict: 'E',
    link: function(scope) {

    },
    template: `
      <div class="sm2-bar-ui">
        <div class="bd sm2-main-controls">
          <div class="sm2-inline-texture"></div>
          <div class="sm2-inline-gradient"></div>
          <div class="sm2-inline-element sm2-button-element">
              <div class="sm2-button-bd">

              </div>
          </div>
          <div class="sm2-inline-element sm2-inline-status">
            <div class="sm2-playlist">
              <div class="sm2-playlist-target">
                <ul class="sm2-playlist-bd">
                  <li>

                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="sm2-inline-element sm2-button-element sm2-volume">
            <span class="sm2-inline-button sm2-volume-control volume-shade"></span>

          </div>
          <div class="sm2-inline-element sm2-button-element sm2-menu">
            <div class="sm2-button-bd">

            </div>
          </div>
        </div>
      </div>
    `
  };
});