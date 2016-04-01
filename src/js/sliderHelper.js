(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .service('ionSliderHelper',ionSliderHelper);

  ionSliderHelper.$inject = ['ionGalleryConfig'];

  function ionSliderHelper(ionGalleryConfig) {

    this.setZoomEvents = function setZoomEvents(zoomEvents){
      if (zoomEvents === false){
        ionGalleryConfig.set('zoom_events',false);
      }

      return ionGalleryConfig.get('zoom_events');
    };

    this.getModalAnimation = function getModalAnimation(){
      return ionGalleryConfig.get('modal_animation');
    };

  }
})();
