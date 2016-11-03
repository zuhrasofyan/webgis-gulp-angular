(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('LocalGeoController', LocalGeoController);

  /** @ngInject */
  function LocalGeoController($scope, $http, olData) {

    var vm = this;

    //set initial data for popup-label
    vm.isiLabel = {};

    //set base coordinate
    vm.bandaAceh = {
        lat: 5.551,
        lon: 95.322,
        zoom: 15,
        label: {
          message: vm.lengkap,
          show: false,
          showOnMouseOver: true
        }
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



    //test get http data from API
    $http.get('http://bappeda.bandaacehkota.go.id/webgis/autocomplete/test_api.php').then(function (response){
      vm.getJson = response.data;
    });
    $http.get('http://bappeda.bandaacehkota.go.id/webgis/autocomplete/test_api_bank.php').then(function (response){
      vm.getJsonBank = response.data;
    });

    //separate point layer as different layer
    vm.lokasi = [
      {
        name: 'lokasi',
        desc: 'Lokasi',
        layerName: 'uptb_gis_bna:lokasi_tabel2',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://120.10.11.18:8080/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_tabel2", "TILED": true}
        },
        zIndex: 11
      }
    ];

    // var map = new ol.Map({
    //   target: document.getElementById('angular-openlayers-map')
    // });



    var staticPosition = ol.proj.transform([ 10609085.704948753, 618922.4317438678 ], 'EPSG:3857', 'EPSG:3857').map(function(c) {
        return c;
    });


    $scope.$on('openlayers.map.singleclick', function(event, data) {

        //get projection data
        var prj = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, 'EPSG:3857').map(function(c) {
            return c;
        });
        var prettyCoord = ol.coordinate.toStringHDMS(prj);

        //get lattitude and longitude coordinate. lat = latLon[1]; lon = latLon[0];
        var latLon = ol.proj.transform(prj,'EPSG:3857', 'EPSG:4326');

        //initialize manual map view to retrieve zoom level, resolution and then get the  feature info JSON data from geoserver url based on this coordinate
        var view = new ol.View({
            center: [0, 0],
            zoom: vm.bandaAceh.zoom
        });
        var viewResolution = /** @type {number} */ (view.getResolution());
        var wmsLokasi = new ol.source.TileWMS({
            url: 'http://120.10.11.18:8080/geoserver/uptb_gis_bna/wms',
            params: {'LAYERS': 'uptb_gis_bna:lokasi_tabel', 'TILED': true},
            serverType: 'geoserver'
        });

        var myurl = wmsLokasi.getGetFeatureInfoUrl(
                prj, viewResolution, 'EPSG:3857',
                {'INFO_FORMAT': 'application/json'});

        vm.url=myurl;

        $http.get(myurl).success(
          function (data, status) {

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

    });

  }

})();
