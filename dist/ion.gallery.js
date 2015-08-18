(function(){
  'use strict';
  
  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery',ionGallery);
  
  ionGallery.$inject = ['$ionicPlatform','ionGalleryData'];
  
  function ionGallery($ionicPlatform,ionGalleryData) {
    controller.$inject = ["$scope"];
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
(function(){
  'use strict';
  
  angular
    .module('ion-gallery')
    .service('ionGalleryData',ionGalleryData);
  
  ionGalleryData.$inject = [];
  
  function ionGalleryData() {
    
    var rowSize = 3;
    var galleryLength;
    var gallery;
    var _this = this;
    
    _this.setGalleryLength = function(length){
      galleryLength = length;
    };
    
    this.getGalleryLength = function(){
      return galleryLength;
    };
    
    this.setRowSize = function(size){
      var length = _this.getGalleryLength;
      
      if(isNaN(size) === true){
        rowSize = 3;
      }
      else if(size > length){
        rowSize = length;
      }
      else if(size <= 0){
        rowSize = 1;
      }
      else{
        rowSize = size;
      }
    };
    
    this.getRowSize = function(){
      return rowSize;
    };
    
    this.setGallery = function(items){
      gallery = items;
      _this.setGalleryLength(items.length);
    };
    
    this.getGallery = function(){
      return gallery;
    };
    
    this.buildGallery = function(){
      var items = this.getGallery();
      var rowSize = this.getRowSize();
      var _gallery = [];
      var row = -1;
      var col = 0;
            
      for(var i=0;i<items.length;i++){
        
        if(i % rowSize === 0){
          row++;
          _gallery[row] = [];
          col = 0;
        }
        
        if(!items[i].hasOwnProperty('sub')){
          items[i].sub = '';
        }
        
        _gallery[row][col] = items[i];
        col++;
      }
      
      return _gallery;
    };
  
    this.getGridSize = function(){
      return parseInt((1/this.getRowSize())* 100);
    };
    
  }
})();
(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionImageScale',ionImageScale);

  ionImageScale.$inject = [];

  function ionImageScale(){
    
    return {
      restrict: 'A',
      link : link
    };

    function link(scope, element, attrs) {
      element.bind("load" , function(e){ 
        
        if(this.naturalHeight > this.naturalWidth){
            element.attr('width','100%');
        }
        else{
          element.attr('height',element.parent()[0].offsetHeight+'px');
        }
      });
    }
  }
})();
(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionRowHeight',ionRowHeight);

  ionRowHeight.$inject = [];

  function ionRowHeight(){
    
    return {
      restrict: 'A',
      link : link
    };

    function link(scope, element, attrs) {
      element.css('height',element[0].offsetWidth * parseInt(scope.$parent.responsiveGrid)/100 + 'px'); 
    }
  }
})();
(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionSlideAction',ionSlideAction);

  ionSlideAction.$inject = ['$ionicGesture','$timeout'];

  function ionSlideAction($ionicGesture, $timeout){
    
    return {
      restrict: 'A',
      link : link
    };

    function link(scope, element, attrs) {
      
      var isDoubleTapAction = false;
      
      var pinchZoom = function pinchZoom(){
        if(getZoomLevel() > 1){
          scope.$emit('ZoomStarted');
        }
        else{
          scope.$emit('ZoomOriginal');
        }
      };
      
      var imageDoubleTapGesture = function imageDoubleTapGesture(event) {
        
        isDoubleTapAction = true;
                
        $timeout(function(){
          isDoubleTapAction = false;
          scope.$emit('DoubleTapEvent',{ 'x': event.gesture.touches[0].pageX, 'y': event.gesture.touches[0].pageY});
        },200);
      };

      var imageTapGesture = function imageTapGesture(event) {
        
        if(isDoubleTapAction === true){
          return;
        }
        else{
          $timeout(function(){
            if(isDoubleTapAction === true){
              return;
            }
            else{
              scope.$emit('TapEvent');
            }
          },200);
        }
      };
      
      var getZoomLevel = function() {
        var match = element[0].getElementsByClassName('scroll')[0].style.webkitTransform.match(/scale\(([^)]+)\)/);
        
        return parseFloat(match[1]);
      };
      
      var pinchEvent = $ionicGesture.on('pinch',pinchZoom,element);
      var doubleTapEvent = $ionicGesture.on('doubletap', function(e){imageDoubleTapGesture(e);}, element);
      var tapEvent = $ionicGesture.on('tap', imageTapGesture, element);
      
      scope.$on('$destroy', function() {
        $ionicGesture.off(doubleTapEvent, 'doubletap', imageDoubleTapGesture);
        $ionicGesture.off(tapEvent, 'tap', imageTapGesture);
        $ionicGesture.off(pinchEvent, 'pinch', pinchZoom);
      });
    }
  }
})();
(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .directive('ionSlider',ionSlider);

  ionSlider.$inject = ['$ionicModal','ionGalleryData','$ionicPlatform','$timeout','$ionicScrollDelegate'];

  function ionSlider($ionicModal,ionGalleryData,$ionicPlatform,$timeout,$ionicScrollDelegate){
    
    controller.$inject = ["$scope"];
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
      
      $scope.showImage = function(row,col) {
        $scope.slides = [];
        
        currentImage = row*rowSize + col;
        
        var galleryLength = ionGalleryData.getGalleryLength();
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

        var slideToLoad = $scope.slides.length - lastSlideIndex - currentSlideIndex;
        var galleryLength = ionGalleryData.getGalleryLength();
        var imageToLoad;
        
        console.log( 'loadSingles: ' + lastSlideIndex + ' > ' + currentSlideIndex);
        
        switch( lastSlideIndex + '>' + currentSlideIndex ) {
          case '0>1':
            {
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '1>2':
            {
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '2>0':
            {
              currentImage++;
              imageToLoad = currentImage + 1;
              break;
            }
          case '0>2':
            {
              currentImage--;
              imageToLoad = currentImage - 1;
              break;
            }
          case '1>0':
            {
              currentImage--;
              imageToLoad = currentImage - 1;
              break;
            }
          case '2>1':
            {
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
        _modal.remove();
      });
      
      
    }
  }
})();
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("gallery.html","<div class=\"gallery-view\">\n  <div class=\"row\" ng-repeat=\"item in items track by $index\" ion-row-height>\n    <div ng-repeat=\"photo in item track by $index\"\n         class=\"col col-{{responsiveGrid}} image-container\">\n      \n      <img ion-image-scale\n           ng-src=\"{{photo.src}}\"\n           ng-click=\"showImage({{$parent.$index}},{{$index}})\">\n      \n    </div>\n  </div>\n  <div ion-slider></div>\n</div>");
$templateCache.put("slider.html","<ion-modal-view class=\"blackBackground imageView\">\n  <ion-header-bar class=\"headerView\" ng-show=\"!hideAll\">\n    <button class=\"button button-outline button-light close-btn\" ng-click=\"closeModal()\">Done</button>\n  </ion-header-bar>\n    \n  <ion-content class=\"has-no-header\" scroll=\"false\">\n    <ion-slide-box does-continue=\"true\" active-slide=\"selectedSlide\" show-pager=\"false\" class=\"listContainer\" on-slide-changed=\"slideChanged($index)\">\n      <ion-slide ng-repeat=\"single in slides track by $index\">\n        <ion-scroll direction=\"xy\"\n                    locking=\"false\" \n                    zooming=\"true\"\n                    min-zoom=\"1\"\n                    scrollbar-x=\"false\"\n                    scrollbar-y=\"false\"\n                    ion-slide-action\n                    delegate-handle=\"slide-{{$index}}\"\n                    >\n        <div class=\"item item-image centerPictureVertical gallery-slide-view\">\n          <img ng-src=\"{{single.src}}\">\n        </div>\n        <div ng-if=\"single.sub.length > 0\" class=\"image-subtitle\" ng-show=\"!hideAll\">\n            <span ng-bind-html=\'single.sub\'></span>\n        </div>\n        </ion-scroll>\n      </ion-slide>\n    </ion-slide-box>\n  </ion-content>\n</ion-modal-view>");}]);