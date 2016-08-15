(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData) {
    var vm = this;

    //set base coordinate
    vm.bandaAceh = {
        lat: 5.551,
        lon: 95.322,
        zoom: 15
    };
    //set default view configuration
    vm.defaults = {
      view: {
          maxZoom: 20,
          minZoom: 14,
          extent: [10605714.11, 615365.85, 10617256.10, 625990.60]
      }
    }


    /*vm.wms = {
      source: {
        type: 'ImageWMS',
        url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
        params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
      }
    };*/

    //render all basic layers land,perumahan,bangunan,laut,tambak,sungai,hutan,taman,lapangan,jalan,lokasi
    vm.layers = [
      {
        name: 'land',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:bna_ab_merge', 'TILED': true}
        }
      },
      {
        name: 'perumahan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:perumahan_2011', 'TILED': true}
        }
      },
      {
        name: 'bangunan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Bangunan_2011', 'TILED': true}
        }
      },
      {
        name: 'laut',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:laut_2011_dissolve', 'TILED': true}
        }
      },
      {
        name: 'tambak',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:tambak_2011', 'TILED': true}
        }
      },
      {
        name: 'sungai',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:sungai_2011_dissolve', 'TILED': true}
        }
      },
      {
        name: 'hutan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:hutan_kota_2011', 'TILED': true}
        }
      },
      {
        name: 'taman',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:taman_2011', 'TILED': true}
        }
      }, 
      {
        name: 'lapangan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:lapangan_2011', 'TILED': true}
        }
      },    
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
      }
      ];

  }
  
})();
