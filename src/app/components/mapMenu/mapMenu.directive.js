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
    function MapMenuController($scope, $location, komponenPetaService) {
      var vm = this;

      //status of each collapsible accordion
      //TODO: dynamic status.open
      vm.status = {
        open: false,
        open2: false,
        open3: false,
        open4: false,
        open5: false,
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };

      vm.layers = komponenPetaService.data;

      //TODO: use one function and reuse it for different toggle layers
      //toggle all for basic layers
      vm.basicCheckBox = true;
      function toggleBasicMap(){
        var i = 0;
        for (i=0; i<vm.layers.length; i++) {
          vm.layers[i].active = vm.basicCheckBox;
        }
      }

      vm.toggleBasicMap = toggleBasicMap;

      //toggle all for tematik layers
      vm.tematikCheckBox = false;
      function toggleTematikMap(){
        var i = 0;
        for (i=0; i<vm.tematik.length; i++) {
          vm.tematik[i].active = vm.tematikCheckBox;
        }
      }

      vm.toggleTematikMap = toggleTematikMap;

      //toggle all for perencanaan layers
      vm.rencanaCheckBox = false;
      function toggleRencanaMap(){
        var i = 0;
        for (i=0; i<vm.rencana.length; i++) {
          vm.rencana[i].active = vm.rencanaCheckBox;
        }
      }
      vm.toggleRencanaMap = toggleRencanaMap;

    }
  }

})();
