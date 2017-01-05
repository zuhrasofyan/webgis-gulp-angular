(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('TestingController', TestingController);

  /** @ngInject */
  function TestingController($scope, $http, olData, baseDataService, basemapDataService, lokasiService) {

    var vm = this;

    var atm_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      opacity: 0.90,
                      src: 'https://bappeda.bandaacehkota.go.id/webgis/icon/arrow.png'
                  }
              }
          };

    //set initial data for popup-label
    vm.isiLabel = {};

    //set base coordinate
    vm.bandaAceh = baseDataService.bandaAceh;

    //set default view configuration
    vm.defaults = baseDataService.defaults;

    vm.mousePosition = {};
    vm.projection = baseDataService.projection;

    //button controls on the map
    vm.controls = baseDataService.controls;
    //get other basemap layers from otherBasemapService
    vm.basemaps = basemapDataService.data;

    vm.atm_style = atm_style;

    $http.get('https://bappeda.bandaacehkota.go.id/webgis/api/api_test_atm.php').then(function(response){

      var aa = response.data;
      var arr = []; var isi = {};
      angular.forEach(aa, function (obj){
        isi = {
          name: obj.NAMA,
          lat: parseFloat(obj.LINTANG, 10),
          lon: parseFloat(obj.BUJUR, 10),
          label: {
            message: obj.NAMA + ' ' + obj.LINTANG,
            show: false,
            showOnMouseClick: true
          },
          style: atm_style
        };
        arr.push(isi);
      });
      vm.atm = arr;
    });

    $scope.$on('openlayers.map.singleclick', function(event, data) {
      console.log('hahh');
      olData.getMap().then(function(map){

      });
    });

  }

})();
