(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, olData, lokasiService, komponenPetaService, tematikService, rencanaService, otherBasemapService) {
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

    //get komponen peta layers from komponenPetaService
    vm.layers = komponenPetaService.data;
    //get lokasi (Points) layer from lokasiService
    vm.lokasi = lokasiService.data;
    //get tematik peta layers from tematikService
    vm.tematik = tematikService.data;
    //get rencana peta layers from rencanaService
    vm.rencana = rencanaService.data;
    //get other basemap layers from otherBasemapService
    vm.bing = otherBasemapService.bing;



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
