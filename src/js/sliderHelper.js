(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .service('ionSliderHelper',ionSliderHelper);

  ionSliderHelper.$inject = ['ionGalleryConfig'];

  function ionSliderHelper(ionGalleryConfig) {

    this.setZoomEvents = function setZoomEvents(zoomEvents){
      if (zoomEvents === false){
        ionGalleryConfig.zoom_events = false;
      }

      return ionGalleryConfig.zoom_events;
    }

  }
})();
