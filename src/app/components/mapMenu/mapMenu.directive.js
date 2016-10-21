(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .directive('mapMenu', mapMenu);

  /** @ngInject */
  function mapMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mapMenu/mapMenu.html',
      scope: {},
      controller: MapMenuController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MapMenuController($scope, $location, tematikService, rencanaService, basemapDataService, lokasiService) {
      var vm = this;

      vm.accordionList = [
        {
          name: 'Peta Dasar',
          open: false,
          data: [],
          checkAll: false
        },
        {
          name: 'Peta Tematik',
          open: false,
          data: tematikService.data,
          checkAll: false
        },
        {
          name: 'Peta Perencanaan',
          open: false,
          data: rencanaService.data,
          checkAll: false
        },
        {
          name: 'Basemap dan Citra Satelit',
          open: false,
          data: basemapDataService.data,
          checkAll: false
        }
      ];

      //toggle all for basic layers
      function toggleMap(input){
        var i = 0;
        for (i=0; i<vm.accordionList[input].data.length; i++) {
          vm.accordionList[input].data[i].active = vm.accordionList[input].checkAll;
        }
      }
      vm.toggleMap = toggleMap;

      //location menu
      vm.status = {
        open: false,
        open2: false,
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };
      vm.lokasi = lokasiService.data;

      //show/hidden accordions interactions
      vm.layerMenuIsVisible = false;
      vm.showMapMenu = function () {
        vm.lokasiMenuIsVisible = false;
        vm.layerMenuIsVisible = vm.layerMenuIsVisible ? false : true;
      };
      
      vm.lokasiMenuIsVisible = false;
      vm.showMapLokasiMenu = function () {
        vm.layerMenuIsVisible = false;
        vm.lokasiMenuIsVisible = vm.lokasiMenuIsVisible ? false : true;
      };


    }
  }

})();
