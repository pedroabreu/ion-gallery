(function(){
  'use strict';
  
  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery',ionGallery);
  
  ionGallery.$inject = ['$ionicPlatform','ionGalleryData'];
  
  function ionGallery($ionicPlatform,ionGalleryData) {
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