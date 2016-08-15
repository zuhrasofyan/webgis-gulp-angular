(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData) {
    var vm = this;

    vm.bandaAceh = {
        lat: 5.551,
        lon: 95.322,
        zoom: 15,
        minZoom: 14,
        maxZoom: 20
    };
    vm.defaults = {
      view: {
          maxZoom: 20,
          minZoom: 14
      }
    }
    vm.wms = {
      source: {
        type: 'ImageWMS',
        url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
      }
    };

    vm.layers = [
      {
        name: 'jalan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
        }
      }, 
      {
        name: 'lokasi',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:lokasi_tabel', 'TILED': true}
        }
      }];

  }
  
})();
