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
    };

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



    //test get http data from API 
    /*$http.get('https://jsonplaceholder.typicode.com/posts').then(function (response){
      vm.getJson = response.data;
    });*/


    //List all basic layers land,perumahan,bangunan,laut,tambak,sungai,hutan,taman,lapangan,jalan,lokasi
    vm.layers = [
      {
        name: 'land',
        desc: 'Land',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:bna_ab_merge', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'perumahan',
        desc: 'Perumahan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:perumahan_2011', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'bangunan',
        desc: 'Bangunan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Bangunan_2011', 'TILED': true}
        },
        zIndex: 3
      },
      {
        name: 'laut',
        desc: 'Laut',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:laut_2011_dissolve', 'TILED': true}
        },
        zIndex: 4
      },
      {
        name: 'tambak',
        desc: 'Tambak',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:tambak_2011', 'TILED': true}
        },
        zIndex: 5
      },
      {
        name: 'sungai',
        desc: 'Sungai',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:sungai_2011_dissolve', 'TILED': true}
        },
        zIndex: 6
      },
      {
        name: 'hutan',
        desc: 'Hutan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:hutan_kota_2011', 'TILED': true}
        },
        zIndex: 7
      },
      {
        name: 'taman',
        desc: 'Taman',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:taman_2011', 'TILED': true}
        },
        zIndex: 8
      }, 
      {
        name: 'lapangan',
        desc: 'Lapangan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:lapangan_2011', 'TILED': true}
        },
        zIndex: 9
      },    
      {
        name: 'jalan',
        desc: 'Jalan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
        },
        zIndex: 10
      }, 
      {
        name: 'lokasi',
        desc: 'Lokasi',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:lokasi_tabel', 'TILED': true}
        },
        zIndex: 11
      }
    ];

    //List all tematik layers jml_kk_2011, total_pddk_2013, total_pddk_2014, 
    vm.tematik = [
      {
        name: 'jml_kk_2011',
        desc: 'Jumlah KK 2011',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:tematik_jml_kk', 'TILED': true}
        },
        zIndex: 12
      },
      {
        name: 'total_pddk_2013',
        desc: 'Total Penduduk 2013',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:total_pddk_2013', 'TILED': true}
        },
        zIndex: 12
      },
      {
        name: 'total_pddk_2014',
        desc: 'Total Penduduk 2014',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:total_pddk_2014', 'TILED': true}
        },
        zIndex: 12
      },
      {
        name: 'landuse_2011',
        desc: 'Landuse 2011',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:landuse_20110', 'TILED': true}
        },
        zIndex: 12
      }
    ];

    //List all perencanaan layers pola_ruang,kawasan_strategis,pusat_pelayanan
    vm.rencana = [
      {
        name: 'pola_ruang',
        desc: 'Pola Ruang',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:pola_ruang_banda_aceh_utm', 'TILED': true}
        },
        zIndex: 13
      },
      {
        name: 'kawasan_strategis',
        desc: 'Kawasan Strategis',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:kawasan strategis1', 'TILED': true}
        },
        zIndex: 13
      },
      {
        name: 'pusat_pelayanan',
        desc: 'Pusat Pelayanan',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:struktur_ruang', 'TILED': true}
        },
        zIndex: 13
      }
    ];

    vm.bing = [{
        name: 'bing',
        active: false,
        source: {
            name: 'Bing Maps',
            type: 'BingMaps',
            key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
            imagerySet: 'Road'
        },
        zIndex: 11
      }
    ];
  }
  
})();
