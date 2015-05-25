(function(){
  'use strict';
  
  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery',ionGallery);
  
  ionGallery.$inject = ['$ionicPlatform','ionService'];
  
  function ionGallery($ionicPlatform,ionService) {
    return {
      restrict: 'AE',
      scope:{
        ionGalleryItems: '=ionGalleryItems',
        ionGalleryRow: '=ionGalleryRow',
      },
      link: link,
      controller: controller,
      replace:true,
      templateUrl:'gallery.html'
    };
    
    function controller($scope){
      
      ionService.setGalleryLength($scope.ionGalleryItems.length);
      ionService.setRowSize(parseInt($scope.ionGalleryRow));
      
      var items = $scope.ionGalleryItems,
          gallery = [],
          rowSize = ionService.getRowSize(),
          row = -1,
          col = 0;
            
      for(var i=0;i<items.length;i++){
        
        if(i % rowSize === 0){
          row++;
          gallery[row] = [];
          col = 0;
        }
        
        gallery[row][col] = items[i];
        col++;
      }
      
      $scope.items = gallery;
      $scope.responsiveGrid = parseInt((1/rowSize)* 100);
    }

    function link(scope, element, attrs) {
    }
  }
})();