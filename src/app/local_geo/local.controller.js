(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('LocalGeoController', LocalGeoController);

  /** @ngInject */
  function LocalGeoController($scope, $http, olData, baseDataService, basemapDataService, lokasiService) {

    var vm = this;

    //set initial data for popup-label
    vm.isiLabel = {};

    //set base coordinate
    vm.bandaAceh = baseDataService.bandaAceh;

    //set default view configuration
    vm.defaults = baseDataService.defaults;

    vm.mousePosition = {};
    vm.projection = baseDataService.projection;

    //button controls on the map
    vm.controls = baseDataService.controls;
    //get other basemap layers from otherBasemapService
    vm.basemaps = basemapDataService.data;
    //get lokasi (Points) layer from lokasiService
    vm.lokasi = lokasiService.data;

    //popover button
    vm.dynamicPopover = 'hello';
    vm.isOpen = false;

    vm.perizinan = {
      pilihanPerizinan: [
        {id: 1, name: 'Surat Izin Tempat Usaha (SITU)'},
        {id: 2, name: 'Surat Izin Usaha Perdagangan (SIUP)'},
        {id: 3, name: 'Surat Izin Jasa Konstruksi (SIJK)'},
        {id: 4, name: 'Izin Mendirikan Bangunan (IMB)'},
        {id: 5, name: 'Tanda Daftar Perusahaan (TDP)'},
        {id: 6, name: 'Tanda Daftar Industri (TDI)'},
        {id: 7, name: 'Izin Gangguan (HO)'},
        {id: 8, name: 'Surat Izin Trayek'},
        {id: 9, name: 'Surat Izin Angkutan Barang'},
        {id: 10, name: 'Surat Izin Angkutan Umum'},
        {id: 11, name: 'Izin Pariwisata'},
        {id: 12, name: 'Izin Prakter Dokter'},
        {id: 13, name: 'Izin Praktek Bidan'}
      ],
      selectedPerizinan: {id: 1, name: 'Surat Izin Tempat Usaha (SITU)'}
    };

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

    olData.getMap().then(function(map){
      //vm.pos = [10610852.11309153, 618996.6096818928];
      var pos = [];
      vm.marker = new ol.Overlay({
        position: pos,
        positioning: 'center-center',
        element: document.getElementById('marker'),
        stopEvent: false
      });



    });

    vm.data = '';

    $scope.$on('openlayers.map.singleclick', function(event, data) {

      olData.getMap().then(function(map){
        var prj = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, 'EPSG:3857').map(function(c) {
            return c;
        });
        vm.prj = prj;
        //test displaying general information basemapDataService.separateBasemapData[1].source
        var wmsLayers = new ol.source.TileWMS(basemapDataService.separateBasemapData[1].source);

        var view = new ol.View({
            center: [0, 0],
            zoom: vm.bandaAceh.zoom
        });
        var viewResolution = /** @type {number} */ (view.getResolution());

        var genUrl = wmsLayers.getGetFeatureInfoUrl(
          prj, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'application/json'}
        );
        $http.get(genUrl).success(
          function (data, status){
             if (data.features.length > 0) {
               vm.data = data.features[0].properties;
             } else {
               vm.data = 'tidak ada data';
             }
             $scope.popUpData = vm.data;
          }
        );




        //console.log(prj);
        vm.marker.setPosition(prj);
        vm.setPrj = prj;
        map.addOverlay(vm.marker);
      });
      vm.isOpen = true;


    });
    vm.dynamicPopover = {
      content: 'Informasi Koordinat',
      templateUrl: 'myPopoverTemplate.html',
      title: 'Title'
    };

    $scope.myData = {"name": "zuhra"};
  }

})();
