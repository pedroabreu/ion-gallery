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