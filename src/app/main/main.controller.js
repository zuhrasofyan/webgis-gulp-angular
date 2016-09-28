(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData) {
    var vm = this;

    //set initial data for popup-label
    vm.isiLabel = {};

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
      },
      events: {
        map: ['singleclick']
      }
    };

    //show custom buttons
    // vm.controls = [
    //   {name: zoom2, active: true},
    //   {name: sssss, active: true}
    // ];

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
    vm.controls = [
        { name: 'zoom', active: true },
        { name: 'fullscreen', active: true }
    ];

    var testButtonControl = function(opt_options) {
      var options = opt_options || {};
      var button = document.createElement('button');
      button.innerHTML = 'T';
      var addAlert = function(e) {
          alert('hey!');
      };
      button.addEventListener('click', addAlert);
      var element = document.createElement('div');
      element.className = 'test-button ol-unselectable ol-control';
      element.appendChild(button);
      ol.control.Control.call(this, {
          element: element,
          target: options.target
      });
    };
    ol.inherits(testButtonControl, ol.control.Control);
    vm.testButton= {
        control: new testButtonControl()
    };


    var rotateNorthControl = function(opt_options) {
        var options = opt_options || {};
        var rotation = 0;
        var button = document.createElement('button');
        button.innerHTML = 'N';
        var this_ = this;
        var handleRotateNorth = function(e) {
            rotation += 90;
            this_.getMap().getView().setRotation(rotation);
        };
        button.addEventListener('click', handleRotateNorth, false);
        button.addEventListener('touchstart', handleRotateNorth, false);
        var element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable ol-control';
        element.appendChild(button);
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    };
    ol.inherits(rotateNorthControl, ol.control.Control);

    vm.rotateNorth= {
        control: new rotateNorthControl()
    };

    vm.controls = [
      {name: 'rotateNorth', active:true, btn: vm.rotateNorth},
      {name: 'testButton', active:true, btn: vm.testButton}
    ];

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
      }
    ];

    //separate point layer as different layer
    vm.lokasi = [
      {
        name: 'lokasi',
        desc: 'Lokasi',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_tabel2", "TILED": true}
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        desc: 'Jalan',
        active: false,
        source: {
            name: 'Bing Maps',
            type: 'BingMaps',
            key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
            imagerySet: 'Road'
        },
        zIndex: 10
      },
      {
        name: 'aerial_bing',
        desc: 'Satelit',
        active: false,
        source: {
            name: 'Bing Aerial Maps',
            type: 'BingMaps',
            key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
            imagerySet: 'Aerial'
        },
        zIndex: 10
      }
    ];

    /*vm.citraSatelit = [
      {
        name: 'citra_satelit',
        desc: 'Citra Satelit',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:WorldView-1_BandaAceh_15Jan2015_CD1', 'TILED': true}
        },
        zIndex: 11
      },
      {
        name: 'citra_satelit2',
        desc: 'Citra Satelit',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:WorldView-1_BandaAceh_15Jan2015_CD2', 'TILED': true}
        },
        zIndex: 11
      }
    ];*/


    //add event onclick to show detail information for each point
    $scope.$on('openlayers.map.singleclick', function(event, data) {

      //get projection data
      var prj = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, 'EPSG:3857').map(function(c) {
          return c;
      });

      var prettyCoord = ol.coordinate.toStringHDMS(prj);

      //get lattitude and longitude coordinate. lat = latLon[1]; lon = latLon[0];
      var latLon = ol.proj.transform(prj,'EPSG:3857', 'EPSG:4326');

      //hack view not using angular way to use OL3 getResolution()
      //initialize manual map view to retrieve zoom level, resolution and then get the  feature info JSON data from geoserver url based on this coordinate
      var view = new ol.View({
          center: [0, 0],
          zoom: vm.bandaAceh.zoom
      });
      var viewResolution = /** @type {number} */ (view.getResolution());

      //hack location not using angular way to use OL3 getGetFeatureInfoUrl()
      var wmsLokasi = new ol.source.TileWMS({
          url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
          params: {'LAYERS': 'uptb_gis_bna:lokasi_tabel', 'TILED': true},
          serverType: 'geoserver'
      });
      var myurl = wmsLokasi.getGetFeatureInfoUrl(
              prj, viewResolution, 'EPSG:3857',
              {'INFO_FORMAT': 'application/json'});

      vm.url=myurl;

      $http.get(myurl).success(
        function (data, status) {
          var items = [];

          //if there is data.features returned from geoserver then
          if (data.features[0]) {

            //show point data lengkap
            var properties = data.features[0].properties;
            var nama = properties.nama_lokas;
            var desa = properties.desa;
            vm.lengkap =  nama + '  ' + desa + '<br>' + prettyCoord;

            //place the popup label on the map
            vm.isiLabel = {
                lat: latLon[1],
                lon: latLon[0],
                label: {
                  message: vm.lengkap,
                  show: true,
                  showOnMouseClick: true,
                  showOnMouseHover: true
                }
            };

          } else {
            vm.lengkap = 'no data';
            vm.isiLabel = {};
          }

        }
      );


    }); //end onClick

    vm.isVisible = false;
    vm.showMapMenu = function () {
      vm.isVisible = vm.isVisible ? false : true;
    };
    vm.status = {
      open: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      isCustomHeaderOpen: false,
      isFirstOpen: true,
      isFirstDisabled: false
    }
  }

})();
