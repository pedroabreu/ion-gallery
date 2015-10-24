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
            
      scope.$watch( 
        function(){
          return element[0].offsetWidth;
        },
        function(newValue){
          if(newValue > 0){
            element.css('height',newValue * parseInt(scope.$parent.responsiveGrid)/100 + 'px');
          }
        });
    }
  }
})();