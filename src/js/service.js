(function(){
  'use strict';
  
  angular
    .module('ion-gallery')
    .service('ionService',ionService);
  
  ionService.$inject = [];
  
  function ionService() {
    
    var rowSize = 3,
        galleryLength,
        self = this;
    
    this.setGalleryLength = function(length){
      galleryLength = length;
    };
    
    this.getGalleryLength = function(){
      return galleryLength;
    };
    
    this.setRowSize = function(size){
      var length = self.getGalleryLength;
      
      if(size > length){
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
    
  }
})();