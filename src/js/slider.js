(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionSlider',ionSlider);

  ionSlider.$inject = ['$ionicModal','ionGalleryData'];

  function ionSlider($ionicModal,ionGalleryData){
    
    return {
      restrict: 'A',
      controller: controller,
      link : link
    };
    
    function controller($scope){
      var lastSlideIndex,
          currentImage,
          galleryLength = ionGalleryData.getGalleryLength(),
          rowSize = ionGalleryData.getRowSize();
          
      $scope.selectedSlide = 1;
            
      $scope.showImage = function(row,col) {
        $scope.slides = [];
        
        currentImage = row*rowSize + col;
        
        var index = currentImage;
        var previndex = index - 1;
        var nextindex = index + 1;

        if( previndex < 0 ){
          previndex = galleryLength - 1;
        }

        if( nextindex >= galleryLength ){
          nextindex = 0;
        }

        $scope.slides[0] = $scope.ionGalleryItems[previndex];
        $scope.slides[1] = $scope.ionGalleryItems[index];
        $scope.slides[2] = $scope.ionGalleryItems[nextindex];
        
        console.log( 'loadSingles: ' + previndex + ' ' + index + ' ' + nextindex);

        lastSlideIndex = 1;
        $scope.loadModal();
      };

      $scope.slideChanged = function(currentSlideIndex) {
        
        if(currentSlideIndex === lastSlideIndex){
          return;
        }

        var slideToLoad,
            imageToLoad;
        
        console.log( 'loadSingles: ' + lastSlideIndex + ' > ' + currentSlideIndex);
        
        switch( lastSlideIndex + '>' + currentSlideIndex ) {
          case '0>1':
            {
              slideToLoad = 2;
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '1>2':
            {
              slideToLoad = 0;
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '2>0':
            {
              slideToLoad = 1;
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '0>2':
            {
              slideToLoad = 1;
              currentImage--;
              imageToLoad = currentImage - 1;
              break;
            }
          case '1>0':
            {
              slideToLoad = 2;
              currentImage--;
              imageToLoad = currentImage - 1;
              break;
            }
          case '2>1':
            {
              slideToLoad = 0;
              currentImage--;
              imageToLoad = currentImage - 1;   
              break;
            }
        }

        if( currentImage < 0 ){
          currentImage = galleryLength - 1;
        }

        if( currentImage > galleryLength ){
          currentImage = 0;
        }

        if( imageToLoad < 0 ){
          imageToLoad = galleryLength + imageToLoad;
        }

        if( imageToLoad >= galleryLength ){
          imageToLoad = imageToLoad - galleryLength;
        }

        $scope.slides[slideToLoad] = $scope.ionGalleryItems[imageToLoad];
        
        lastSlideIndex = currentSlideIndex;
      };
    }

    function link(scope, element, attrs) {
      var rename;
      
      scope.loadModal = function(){
        $ionicModal.fromTemplateUrl('slider.html', {
          scope: scope,
          animation: 'fade-in'
        }).then(function(modal) {
          rename = modal;
          scope.openModal();
        });
      };

      scope.openModal = function() {
        rename.show();
      };

      scope.closeModal = function() {
        rename.hide();
      };

      scope.$on('$destroy', function() {
        rename.remove();
      });
    }
  }
})();