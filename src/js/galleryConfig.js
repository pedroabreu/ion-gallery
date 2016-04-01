(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .provider('ionGalleryConfig',ionGalleryConfig);

  ionGalleryConfig.$inject = [];

  function ionGalleryConfig(){
    this.config = {
      action_label: 'Done',
      toggle: true,
      row_size: 3,
      fixed_row_size: true,
      zoom_events: true,
      modal_animation: 'none',
      get: function(key){
        return this[key];
      },
      set: function(key,value){
        this[key] = value;
      }
    };

    this.$get = function() {
        return this.config;
    };

    this.setGalleryConfig = function(config) {
        angular.extend(this.config, this.config, config);
    };
  }

})();
