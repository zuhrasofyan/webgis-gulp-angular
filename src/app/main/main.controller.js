(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.london = {
            lat: 51.505,
            lon: -0.09,
            zoom: 4
        };
    vm.bandaAceh = {
        lat: 5.551,
        lon: 95.322,
        zoom: 13
    };
  }
  
})();
