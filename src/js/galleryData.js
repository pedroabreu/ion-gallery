(function(){
  'use strict';
  
  angular
    .module('ion-gallery')
    .service('ionGalleryData',ionGalleryData);
  
  ionGalleryData.$inject = ['ionGalleryConfig'];
  
  function ionGalleryData(ionGalleryConfig) {
    
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
      var rowSize;
      
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
      
      ionGalleryConfig.row_size = rowSize;
      
    };
    
    this.getRowSize = function(){
      return ionGalleryConfig.row_size;
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
        
        items[i].position = i;
        
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