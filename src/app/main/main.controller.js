(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData, lokasiService) {
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
        map: ['singleclick', 'pointermove']
      },
      controls: {
        zoom: false,
        attribution: false
      },
      interactions: {
                mouseWheelZoom: false
            },
    };

    vm.mousePosition = {};
    vm.projection = 'EPSG:3857';

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

    //button controls on the map
    vm.controls = [
        { name: 'zoom', active: false },
        { name: 'fullscreen', active: true },
        {name: 'scaleline', active: true},
        {name: 'mouseposition', active: false},
        {name: 'overviewmap', active: true},
        {name: 'zoomtoextent', active: false}
    ];

    //show map-layers-menu
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

    //inject rotate north button to directive
    var rotateNorthControl = function(opt_options) {
        var options = opt_options || {};
        var rotation = 0;
        var button = document.createElement('div');
        button.className = "btn btn-info btn-sm";
        button.innerHTML = '<i class="fa fa-rotate-right"></i>';
        var this_ = this;
        var handleRotateNorth = function(e) {
            rotation += 90;
            this_.getMap().getView().setRotation(rotation);
            // console.log(this_.getMap().getView().getCenter());
            // console.log(this_.getMap().getLayers());
            // console.log(options.target);
        };
        button.addEventListener('click', handleRotateNorth, false);
        button.addEventListener('touchstart', handleRotateNorth, false);
        var element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable';
        element.setAttribute('title', 'Rotate 90 degree');
        element.appendChild(button);
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    };

    ol.inherits(rotateNorthControl, ol.control.Control);

    vm.rotateNorth = {
        control: new rotateNorthControl()
    };

    function btnZoomIn() {
      if (vm.bandaAceh.zoom < vm.defaults.view.maxZoom) {
        vm.bandaAceh.zoom = vm.bandaAceh.zoom+1;
      }

    }
    vm.btnZoomIn = btnZoomIn;

    function btnZoomOut() {
      if (vm.bandaAceh.zoom > vm.defaults.view.minZoom) {
        vm.bandaAceh.zoom = vm.bandaAceh.zoom-1;
      }
    }

    vm.btnZoomOut = btnZoomOut;

    //save map as image
    function saveAsPNG() {
      var canvas = document.getElementsByTagName('canvas')[0];
      //console.log(canvas);
      canvas.toBlob(function (blob) {
        //console.log(blob);
        saveAs(blob, 'map.png');
      }, 'image/png');
    }
    vm.saveAsPNG = saveAsPNG;


    // vm.controls = [
    //   {name: 'rotateNorth', active:true, btn: vm.rotateNorth},
    //   {name: 'testButton', active:true, btn: vm.testButton}
    // ];

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

    //get lokasi layer from lokasiService
    vm.lokasi = lokasiService.data;

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
        opacity: 1,
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
        opacity: 1,
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
    //add mouse position listener
    $scope.$on('openlayers.map.pointermove', function(event, data){
      //console.log(data.coord);
      if (vm.projection === data.projection) {
        $scope.$apply(function(){
          vm.mousePosition = data.coord;

        });
      } else {
        vm.mousePosition = '000';
      }

    });

    //add event onclick to show detail information for each point
    $scope.$on('openlayers.map.singleclick', function(event, data) {

      //var coordi = data.feature.getGeometry().getCoordinates();
      // olData.getMap().then(function(map){
      //   var layers3 = map.getLayers();
      //   console.log(layers3);
      //   map.setCenter(new ol.LonLat(10611585.430831643,618635.9224546722));
      //   //map.getView().
      // });
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
      var wmsLokasi = new ol.source.TileWMS(vm.lokasi[0].source);
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
            vm.lengkap =  nama + '  ' + desa + '<br>' + prj;

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

  }

})();
