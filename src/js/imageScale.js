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