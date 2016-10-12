(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .directive('mapLokasiMenu', mapLokasiMenu);

  /** @ngInject */
  function mapLokasiMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mapLokasiMenu/mapLokasiMenu.html',
      scope: {},
      controller: MapLokasiMenuController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MapLokasiMenuController($scope, $location, lokasiService) {
      var vm = this;

      vm.hello = "halooo";
      vm.status = {
        open: false,
        open2: false,
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };
      vm.lokasi = lokasiService.data;

    }
  }

})();
