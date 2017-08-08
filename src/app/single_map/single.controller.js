(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('SingleController', SingleController);

  /** @ngInject */
  function SingleController($scope, $http, olData, singleMapFactory, basemapDataService, baseDataService, rencanaService) {

    var vm = this;

    vm.hello = 'helloworld';
 
    //set base coordinate
    vm.bandaAceh = singleMapFactory.bandaAceh();

    //set default view configuration
    vm.defaults = singleMapFactory.defaults();

    vm.mousePosition = {};
    vm.projection = singleMapFactory.projection();

    //button controls on the map
    vm.controls = singleMapFactory.controls();

    vm.basemaps = basemapDataService.data;

    vm.single = baseDataService.singleLayer;


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

        var layers = map.getLayers();

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

        /* Mencoba mengambil data untuk layer paling akhir dari array map layer*/
        //get the active layer length
        var arrleng = layers.getArray().length;
        if (arrleng > 1) {
          //get the last added layer from the layers list
          var aa = layers.getArray()[arrleng-2];

          //console.log(aa.get('name') + ' adalah layer paling atas dari : ' + (arrleng-1) + 'layer');
        }

        // initialize wmsLokasi and url as array to store information for each location layer.
        var wmsLokasi = {};
        var url = [];

        /* Tampilkan data yang diambil dari spesifik layer (layer 'lokasi')*/
        // use this type of code to get data from each layer based on the name
        layers.forEach(function(layer) {
          vm.isiTabel = {};
          //hack location not using angular way to use OL3 getGetFeatureInfoUrl()
          //we can add array of active layers to list all getFeatureInfoUrl (but consider the data load when create new ol.source.TileWMS. so if possible find solution for this)
          wmsLokasi = new ol.source.TileWMS(vm.single[0].source);
          var myurl = wmsLokasi.getGetFeatureInfoUrl(
                  prj, viewResolution, 'EPSG:3857',
                  {'INFO_FORMAT': 'application/json'});
          url[0]=myurl;

        }); // end layers.forEach()

        // break looping of url.forEach when http.get received data.features[0](es) to avoid refilling vm.isiTabel from two or more overriden point from different layer.
        var BreakException = {};
        try {
          url.forEach(function(entry){
            $http.get(entry).success(
              function (res, status) {
                var items = [];
                //if there is data.features returned from geoserver then
                if (res.features[0] && angular.equals(vm.isiTabel, {})) {
                  
                  // place the features into isiTabel object
                  vm.isiTabel = res.features[0].properties;
                }
                throw BreakException;
              }
            ); // end http get

          }); //end url.forEach
        } catch (e) {
          if (e !== BreakException) throw e;
        }

      });

    }); //end onClick

  }

})();
