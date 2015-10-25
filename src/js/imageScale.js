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
      
      var scaleImage = function(context,value) {
        if(value>0){
          if(context.naturalHeight > context.naturalWidth){
            element.attr('width','100%');
          }
          else{
            element.attr('height',element.parent()[0].offsetHeight+'px');
          }
        } 
      };
      
      element.bind("load" , function(e){
        if(element.parent()[0].offsetHeight > 0){
          scaleImage(this,element.parent()[0].offsetHeight);
        }
        else{
          var _this = this;
          scope.$watch(function(){
            return element.parent()[0].offsetHeight;
          },function(newValue){
            scaleImage(_this,newValue);
          });
        }
      });
    }
  }
})();