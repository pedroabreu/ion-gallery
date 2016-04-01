(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionSlider',ionSlider);

  ionSlider.$inject = ['$ionicModal','$timeout','$ionicScrollDelegate','ionSliderHelper'];

  function ionSlider($ionicModal,$timeout,$ionicScrollDelegate,ionSliderHelper){

    return {
      restrict: 'A',
      controller: controller,
      link : link
    };

    function controller($scope){
      var lastSlideIndex;
      var currentImage;

      var rowSize = $scope.ionGalleryRowSize;
      var zoomStart = false;

      $scope.hideAll = false;
      $scope.ionZoomEvents = ionSliderHelper.setZoomEvents($scope.ionZoomEvents);
      $scope.selectedSlide = 1;

      $scope.openSlider = function(index) {
        $scope.slides = [];
        currentImage = index;

        var galleryLength = $scope.ionGalleryItems.length;
        var previndex = index - 1 < 0 ? galleryLength - 1 : index - 1;
        var nextindex = index + 1 >= galleryLength ? 0 : index + 1;

        $scope.slides[0] = $scope.ionGalleryItems[previndex];
        $scope.slides[1] = $scope.ionGalleryItems[index];
        $scope.slides[2] = $scope.ionGalleryItems[nextindex];

        lastSlideIndex = 1;
        $scope.openModal();
      };

      $scope.slideChanged = function(currentSlideIndex) {

        if(currentSlideIndex === lastSlideIndex){
          return;
        }

        var slideToLoad = $scope.slides.length - lastSlideIndex - currentSlideIndex;
        var galleryLength = $scope.ionGalleryItems.length;
        var imageToLoad;
        var slidePosition = lastSlideIndex + '>' + currentSlideIndex;

        if(slidePosition === '0>1' || slidePosition === '1>2' || slidePosition === '2>0'){
          currentImage++;

          if(currentImage >= galleryLength){
            currentImage = 0;
          }

          imageToLoad = currentImage + 1;

          if( imageToLoad >= galleryLength){
            imageToLoad = 0;
          }
        }
        else if(slidePosition === '0>2' || slidePosition === '1>0' || slidePosition === '2>1'){
          currentImage--;

          if(currentImage < 0){
            currentImage = galleryLength - 1 ;
          }

          imageToLoad = currentImage - 1;

          if(imageToLoad < 0){
            imageToLoad = galleryLength - 1;
          }
        }

        if($scope.ionZoomEvents === true){
          //Clear zoom
          $ionicScrollDelegate.$getByHandle('slide-' + slideToLoad).zoomTo(1);
        }

        $scope.slides[slideToLoad] = $scope.ionGalleryItems[imageToLoad];

        $scope.selectedSlide = lastSlideIndex = currentSlideIndex;
      };

      $scope.$on('ZoomStarted', function(event){
        $timeout(function () {
          zoomStart = true;
          $scope.hideAll = true;
        });
      });

      $scope.$on('TapEvent', function(event){
        $timeout(function () {
          _onTap();
        });
      });

      $scope.$on('DoubleTapEvent', function(event,position){
        $timeout(function () {
          _onDoubleTap(position);
        });
      });

      $scope.$on('ReleaseEvent',function(event){
        var releaseObj = $ionicScrollDelegate.$getByHandle('slide-'+lastSlideIndex).getScrollPosition();

        if(releaseObj.top < 0){
          $scope.closeModal();
        }
      });

      var _onTap = function _onTap(){
        if(zoomStart === true){
          if($scope.ionZoomEvents === true){
            $ionicScrollDelegate.$getByHandle('slide-'+lastSlideIndex).zoomTo(1,true);
          }

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
          if($scope.ionZoomEvents === true){
            $ionicScrollDelegate.$getByHandle('slide-'+lastSlideIndex).zoomTo(3,true,position.x,position.y);
          }

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
      var modalLoaded = false;

      scope.loadModal = function(){
        $ionicModal.fromTemplateUrl('slider.html', {
          scope: scope,
          animation: ionSliderHelper.getModalAnimation()
        }).then(function(modal){
          _modal = modal;
          _modal.show();
          modalLoaded = true;
        });
      };

      scope.openModal = function() {
        if(modalLoaded){
          _modal.show();
        }
        else{
          scope.loadModal();
        }
      };

      scope.closeModal = function() {
        _modal.hide().then(function(){
          scope.selectedSlide = 1;
        });
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
