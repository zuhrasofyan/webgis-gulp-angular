(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('RtrwController', RtrwController);

  /** @ngInject */
  function RtrwController($scope, $http, olData, rtrwMapFactory, basemapDataService, baseDataService, rencanaService) {

    var vm = this;

    vm.hello = 'helloworld';

    //set base coordinate
    vm.bandaAceh = rtrwMapFactory.bandaAceh();

    //set default view configuration
    vm.defaults = rtrwMapFactory.defaults();

    vm.mousePosition = {};
    vm.projection = rtrwMapFactory.projection();

    //button controls on the map
    vm.controls = rtrwMapFactory.controls();

    vm.basemaps = [
      {
        name: 'basemap_bappeda',
        desc: 'Basemap Bappeda Kota Banda Aceh',
        active: true,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna_basemap_bappeda', 'TILED': true}
        },
        zIndex:-2
      },
      {
        name: 'lokasi',
        desc: 'Lokasi Penting',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_utama", "TILED": true}
        },
        zIndex: -1
      },
    ];

    vm.rtrw = [{
          name: 'rtrwLayer',
          desc: 'Layer RTRW',
          active: true,
          showLegend: false,
          opacity: 1,
          source: {
              type: 'TileWMS',
              url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
              params:{'LAYERS': 'uptb_gis_bna:prrtrwsimtaru', 'TILED': true}
          },
          zIndex: 0
        }];


    //set initial data for popup-label
    vm.isiTabel = {};
    //add event onclick to show detail information for each point
    $scope.$on('openlayers.map.singleclick', function(event, data) {

      //get projection data
      olData.getMap().then(function(map){
        //prj variable to ensure projection of data.coordinate into EPSG:3857
        var prj = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, 'EPSG:3857').map(function(c) {
            return c;
        });

        //anything elses

        // var layers = map.getLayers();

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

        vm.isiTabel = {};
        var properties = {};
        var wmsLokasi = new ol.source.TileWMS(vm.rtrw[0].source);
        var url = wmsLokasi.getGetFeatureInfoUrl(
                    prj, viewResolution, 'EPSG:3857',
                    {'INFO_FORMAT': 'application/json'});

        // break looping of url.forEach when http.get received data.features[0](es) to avoid refilling vm.isiTabel from two or more overriden point from different layer.
        var BreakException = {};
        try {

          $http.get(url).success(
            function (res, status) {
              var items = [];
              //if there is data.features returned from geoserver then
              if (res.features[0] && angular.equals(vm.isiTabel, {})) {

                // place the features into isiTabel object
                properties = res.features[0].properties;
                console.log(properties);
                var isian = '<table class="table table-striped"><tbody><tr><th>Keterangan</th><td>'+properties.keterangan+'</td></tr><tr><th>Sifat</th><td>'+properties.sifat+'</td></tr><tr><th>Luas (HA)</th><td>'+properties.luas+'</td></tr></tbody></table>';

                //place the popup label on the map
                vm.isiTabel = {
                    lat: latLon[1],
                    lon: latLon[0],
                    label: {
                      message: isian,
                      show: true,
                      showOnMouseClick: true
                    }
                };

              }
              throw BreakException;
            }
          ); // end http get


        } catch (e) {
          if (e !== BreakException) throw e;
        }

      });

    }); //end onClick

  }

})();
