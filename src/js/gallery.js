(function(){
  'use strict';

  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery',ionGallery)
    .provider('ionGalleryConfig',ionGalleryConfig);

  ionGalleryConfig.$inject = [];

  function ionGalleryConfig(){
    this.labels = {
      done: 'Done'
    };

    this.$get = function() {
        return this.labels;
    };

    this.setLabels = function(labels) {
        this.labels = labels;
    };
  }

  ionGallery.$inject = ['$ionicPlatform','ionGalleryData','ionGalleryConfig'];

  function ionGallery($ionicPlatform,ionGalleryData,ionGalleryConfig) {
    return {
      restrict: 'AE',
      scope:{
        ionGalleryItems: '=ionGalleryItems',
        ionGalleryRow: '=ionGalleryRow'
      },
      controller: controller,
      link:link,
      replace:true,
      templateUrl:'gallery.html'
    };

    function controller($scope){
      ionGalleryData.setGallery($scope.ionGalleryItems);
      ionGalleryData.setRowSize(parseInt($scope.ionGalleryRow));

      var _drawGallery = function(){
        $scope.items = ionGalleryData.buildGallery();
        $scope.responsiveGrid = ionGalleryData.getGridSize();
        $scope.labels = ionGalleryConfig.labels;
      };

      _drawGallery();

      (function () {
        $scope.$watch(function () {
          return $scope.ionGalleryItems.length;
        }, function (newVal, oldVal) {
          if(newVal !== oldVal){
            ionGalleryData.setGallery($scope.ionGalleryItems);
            _drawGallery();

          }
        });
      }());

    }

    function link(scope,element,attrs){
      scope.ionSliderToggle = attrs.ionGalleryToggle === 'false' ? false : true;
    }
  }
})();
