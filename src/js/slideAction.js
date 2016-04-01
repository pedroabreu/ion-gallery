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
          scope.$emit('ZoomStarted');
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

      var releaseGesture = function(event){
        scope.$emit('ReleaseEvent');
      };

      var dragDownGesture = function(event){
        
      };

      var pinchEvent = $ionicGesture.on('pinch',pinchZoom,element);
      var doubleTapEvent = $ionicGesture.on('doubletap', function(e){imageDoubleTapGesture(e);}, element);
      var tapEvent = $ionicGesture.on('tap', imageTapGesture, element);
      var releaseEvent = $ionicGesture.on('release', releaseGesture, element);
      var dragDownEvent = $ionicGesture.on('dragdown', dragDownGesture, element);

      scope.$on('$destroy', function() {
        $ionicGesture.off(doubleTapEvent, 'doubletap', imageDoubleTapGesture);
        $ionicGesture.off(tapEvent, 'tap', imageTapGesture);
        $ionicGesture.off(pinchEvent, 'pinch', pinchZoom);
        $ionicGesture.off(releaseEvent, 'release', releaseGesture);
      });
    }
  }
})();
