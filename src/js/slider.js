(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionSlider',ionSlider);

  ionSlider.$inject = ['$ionicModal','ionGalleryData','$ionicPlatform','$timeout','$ionicScrollDelegate'];

  function ionSlider($ionicModal,ionGalleryData,$ionicPlatform,$timeout,$ionicScrollDelegate){
    
    return {
      restrict: 'A',
      controller: controller,
      link : link
    };
    
    function controller($scope){
      var lastSlideIndex;
      var currentImage;
      
      var rowSize = ionGalleryData.getRowSize();
      var zoomStart = false;
          
      $scope.selectedSlide = 1;
      $scope.hideAll = false;
      
      $scope.showImage = function(index) {
        $scope.slides = [];
        
        currentImage = index;
        
        var galleryLength = ionGalleryData.getGalleryLength();
        var previndex = index - 1 < 0 ? galleryLength - 1 : index - 1;
        var nextindex = index + 1 >= galleryLength ? 0 : index + 1;

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

        var slideToLoad = $scope.slides.length - lastSlideIndex - currentSlideIndex;
        var galleryLength = ionGalleryData.getGalleryLength();
        var imageToLoad;
        var slidePosition = lastSlideIndex + '>' + currentSlideIndex;
        
        console.log( 'loadSingles: ' + slidePosition);
        
        if(slidePosition === '0>1' || slidePosition === '1>2' || slidePosition === '2>0'){
          currentImage++;
          imageToLoad = currentImage + 1;
        }
        else if(slidePosition === '0>2' || slidePosition === '1>0' || slidePosition === '2>1'){
          currentImage--;
          imageToLoad = currentImage - 1;
        }

        if( currentImage < 0 ){
          currentImage = galleryLength - 1;
        }

        if( currentImage >= galleryLength ){
          currentImage = 0;
        }

        if( imageToLoad < 0 ){
          imageToLoad = galleryLength + imageToLoad;
        }

        if( imageToLoad >= galleryLength ){
          imageToLoad = imageToLoad - galleryLength;
        }

        //Clear zoom
        $ionicScrollDelegate.$getByHandle('slide-' + slideToLoad).zoomTo(1);
        
        $scope.slides[slideToLoad] = $scope.ionGalleryItems[imageToLoad];
        
        lastSlideIndex = currentSlideIndex;
      };
            
      $scope.$on('ZoomStarted', function(e){
        $timeout(function () {
          zoomStart = true;
          $scope.hideAll = true;
        });
        
      });
      
      $scope.$on('ZoomOriginal', function(e){
        $timeout(function () {
          _isOriginalSize();
        },300);
        
      });
      
      $scope.$on('TapEvent', function(e){
        $timeout(function () {
          _onTap();
        });
        
      });
      
      $scope.$on('DoubleTapEvent', function(event,position){
        $timeout(function () {
          _onDoubleTap(position);
        });
        
      });
      
      var _onTap = function _onTap(){
        
        if(zoomStart === true){
          $ionicScrollDelegate.$getByHandle('slide-'+lastSlideIndex).zoomTo(1,true);
          
          $timeout(function () {
            _isOriginalSize();
          },300);
          
          return;
        }
        
        if(($scope.hasOwnProperty('ionSliderToggle') && $scope.ionSliderToggle === false && $scope.hideAll === false) || zoomStart === true){
          return;
        }
        
        $scope.hideAll = !$scope.hideAll;
      };
      
      var _onDoubleTap = function _onDoubleTap(position){
        if(zoomStart === false){
          $ionicScrollDelegate.$getByHandle('slide-'+lastSlideIndex).zoomTo(3,true,position.x,position.y);
          zoomStart = true;
          $scope.hideAll = true;
        }
        else{
          _onTap();
        }
      };
      
      function _isOriginalSize(){
        zoomStart = false;
        _onTap();
      }
      
    }

    function link(scope, element, attrs) {
      var _modal;

      scope.loadModal = function(){
        $ionicModal.fromTemplateUrl('slider.html', {
          scope: scope,
          animation: 'fade-in'
        }).then(function(modal) {
          _modal = modal;
          scope.openModal();
        });
      };

      scope.openModal = function() {
        _modal.show();
      };

      scope.closeModal = function() {
        _modal.hide();
      };

      scope.$on('$destroy', function() {
        try{
          _modal.remove();
        } catch(err) {
          console.log(err.message);
        }
      });
    }
  }
})();