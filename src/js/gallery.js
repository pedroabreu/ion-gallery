(function () {
  'use strict';

  angular
    .module('ion-gallery', ['templates'])
    .directive('ionGallery', ionGallery);

  ionGallery.$inject = ['$ionicPlatform', 'ionGalleryHelper', 'ionGalleryConfig'];

  function ionGallery($ionicPlatform, ionGalleryHelper, ionGalleryConfig) {
    return {
      restrict: 'AE',
      scope: {
        ionGalleryItems: '=ionGalleryItems',
        ionGalleryRowSize: '=?ionGalleryRow'
      },
      controller: controller,
      link: link,
      replace: true,
      templateUrl: 'gallery.html'
    };

    function controller($scope) {
      var _drawGallery = function () {
        $scope.ionGalleryRowSize = ionGalleryHelper.getRowSize(parseInt($scope.ionGalleryRowSize), $scope.ionGalleryItems.length);
        $scope.actionLabel = ionGalleryConfig.action_label;
        $scope.items = ionGalleryHelper.buildGallery($scope.ionGalleryItems, $scope.ionGalleryRowSize);
        $scope.responsiveGrid = parseInt((1 / $scope.ionGalleryRowSize) * 100);
      };

      _drawGallery();

      (function () {
        $scope.$watch(function () {
          return $scope.ionGalleryItems.length;
        }, function (newVal, oldVal) {
          if (newVal !== oldVal) {
            _drawGallery();
          }
        });
      }());
    }

    function link(scope, element, attrs) {
      scope.ionSliderToggle = attrs.ionGalleryToggle === 'false' ? false : ionGalleryConfig.toggle;
    }
  }
})();