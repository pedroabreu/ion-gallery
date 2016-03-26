(function(){
  'use strict';

  angular
    .module('ion-gallery')
    .service('ionGalleryHelper',ionGalleryHelper);

  ionGalleryHelper.$inject = ['ionGalleryConfig'];

  function ionGalleryHelper(ionGalleryConfig) {

    this.getRowSize = function(size,length){
      var rowSize;

      if(isNaN(size) === true || size <= 0){
        rowSize = ionGalleryConfig.row_size;
      }
      else if(size > length && !ionGalleryConfig.fixed_row_size){
        rowSize = length;
      }
      else{
        rowSize = size;
      }

      return rowSize;

    };

    this.buildGallery = function(items,rowSize){
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

        if(!items[i].hasOwnProperty('thumb')){
          items[i].thumb = items[i].src;
        }

        items[i].position = i;

        _gallery[row][col] = items[i];
        col++;
      }

      return _gallery;
    };
  }
})();
