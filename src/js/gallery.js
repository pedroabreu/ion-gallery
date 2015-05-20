(function(){
  'use strict';
  
  angular
    .module('ion-gallery', ['ionic','templates'])
    .directive('ionGallery',ionGallery);
  
  ionGallery.$inject = ['$ionicPlatform'];
  
  function ionGallery($ionicPlatform) {
    return {
      restrict: 'AE',
      scope:{
        ionGalleryItems: '=ionGalleryItems'
      },
      link: link,
      controller: controller,
      replace:true,
      templateUrl:'templates/gallery.html'
    };
    
    function controller($scope){
      var items = $scope.ionGalleryItems,
          gallery = [],
          rowSize = 3,
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
    }

    function link(scope, element, attrs) {
    }
  }
})();