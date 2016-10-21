(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData, lokasiService, basemapDataService, tematikService, rencanaService, baseDataService) {
    var vm = this;

    //set initial data for popup-label
    vm.isiLabel = {};

    //set base coordinate
    vm.bandaAceh = baseDataService.bandaAceh;
    //set default view configuration
    vm.defaults = baseDataService.defaults;
    vm.mousePosition = {};
    vm.projection = baseDataService.projection;

    //test get http data from API
    /*$http.get('https://jsonplaceholder.typicode.com/posts').then(function (response){
      vm.getJson = response.data;
    });*/

    //button controls on the map
    vm.controls = baseDataService.controls;

    
    // vm.controls = [
    //   {name: 'rotateNorth', active:true, btn: vm.rotateNorth},
    //   {name: 'testButton', active:true, btn: vm.testButton}
    // ];

    //get komponen peta layers from komponenPetaService
    //vm.layers = basemapDataService.data;
    //get lokasi (Points) layer from lokasiService
    vm.lokasi = lokasiService.data;
    //get tematik peta layers from tematikService
    vm.tematik = tematikService.data;
    //get rencana peta layers from rencanaService
    vm.rencana = rencanaService.data;
    //get other basemap layers from otherBasemapService
    vm.basemaps = basemapDataService.data;



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

      //use this type of code to setcenter to a new coordinate and place marker (eg from user input or from searchbox)
      //var coordi = data.feature.getGeometry().getCoordinates();
      // olData.getMap().then(function(map){
      //   var layers3 = map.getLayers();
      //   console.log(layers3);
      //   map.setCenter(new ol.LonLat(10611585.430831643,618635.9224546722));
      //   //map.getView().
      // });
      //get projection data

      //use this type of code to get data from each layer based on the name
      // olData.getMap().then(function(map){
      //   var layers = map.getLayers();
      //   layers.forEach(function(layer) {
      //     if (layer.get('name') === 'landuse_2011') {
      //       console.log ('haha');
      //     }
      //   });
      // });

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
      //we can add array of active layers to list all getFeatureInfoUrl (but consider the data load when create new ol.source.TileWMS. so if possible find solution for this)
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

  }

})();
