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
    function MapMenuController($scope, $location, tematikService, rencanaService, basemapDataService) {
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

    }
  }

})();
