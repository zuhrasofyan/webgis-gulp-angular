(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('TestingController', TestingController);

  /** @ngInject */
  function TestingController($scope, $http, olData, baseDataService, basemapDataService, lokasiService, pointService) {

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

    vm.lokasiLain = lokasiService.lokasiLain;


    //use this if you want to implement additional info when you click a marker, and use it accordingly use ng-click for example: ng-click="test.showDetails(markerATM)
    // vm.showDetails = function (marker) {
    //   marker.label.show = true;
    //   console.log(marker);
    //   alert(marker.label.message);
    // };

    /* move to point.service */
    // ATM
    var atm_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/atm.png'
                  }
              }
          };
    pointService.atm().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: atm_style
          };
          arr.push(isi);
        });
        vm.atm = arr;
    });

    // Kantor
    var kantor_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/kantor.png'
                  }
              }
          };
    pointService.kantor().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: kantor_style
          };
          arr.push(isi);
        });
        vm.kantor = arr;
    });

    // Pasar
    var pasar_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/market.png'
                  }
              }
          };
    pointService.pasar().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: pasar_style
          };
          arr.push(isi);
        });
        vm.pasar = arr;
    });

    // Penginapan
    var penginapan_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/hotel.png'
                  }
              }
          };
    pointService.penginapan().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: penginapan_style
          };
          arr.push(isi);
        });
        vm.penginapan = arr;
    });

    // Mesjid
    var mesjid_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/mesjid.png'
                  }
              }
          };
    pointService.mesjid().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: mesjid_style
          };
          arr.push(isi);
        });
        vm.mesjid = arr;
    });

    // Sarana Kesehatan
    var kesehatan_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/hospital.png'
                  }
              }
          };
    pointService.saranaKesehatan().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: kesehatan_style
          };
          arr.push(isi);
        });
        vm.saranaKesehatan = arr;
    });

    // Sarana Pendidikan
    var pendidikan_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/university.png'
                  }
              }
          };
    pointService.saranaPendidikan().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: pendidikan_style
          };
          arr.push(isi);
        });
        vm.saranaPendidikan = arr;
    });

    // SPBU
    var spbu_style = {
              image: {
                  icon: {
                      anchor: [0.5, 1],
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'fraction',
                      src: 'assets/icons/spbu.png'
                  }
              }
          };
    pointService.spbu().then(function(d){
        var aa = d.data;
        var arr = []; var isi = {};
        angular.forEach(d.data, function (obj){
          isi = {
            name: obj.NAMA,
            lat: parseFloat(obj.LINTANG, 10),
            lon: parseFloat(obj.BUJUR, 10),
            label: {
              message: obj.NAMA + ' ' + obj.LINTANG,
              show: false,
              showOnMouseClick: true
            },
            style: spbu_style
          };
          arr.push(isi);
        });
        vm.spbu = arr;
    });

    // vm.allData = [
    //   {
    //     name: 'atm',
    //     data: pointService.atm
    //   }
    // ];
    // pointService.lokasi().then(function(d){
    //   vm.lokasi = d.data;
    // });




    $scope.$on('openlayers.map.singleclick', function(event, data) {
      console.log('hahh');
      olData.getMap().then(function(map){

      });
    });

  }

})();
