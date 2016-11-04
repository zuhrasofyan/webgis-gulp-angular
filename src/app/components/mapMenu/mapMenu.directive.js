(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .directive('mapMenu', mapMenu);

  /** @ngInject */
  function mapMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mapMenu/mapMenu.html',
      scope: {},
      controller: MapMenuController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MapMenuController($scope, $location, $http, baseDataService, tematikService, rencanaService, basemapDataService, lokasiService) {
      var vm = this;
      vm.bandaAceh = baseDataService.bandaAceh;

      vm.accordionList = [
        {
          name: 'Peta Dasar',
          open: false,
          data: [],
          checkAll: false
        },
        {
          name: 'Peta Tematik',
          open: false,
          data: tematikService.data,
          checkAll: false
        },
        {
          name: 'Peta Perencanaan',
          open: false,
          data: rencanaService.data,
          checkAll: false
        },
        {
          name: 'Basemap dan Citra Satelit',
          open: false,
          data: basemapDataService.data,
          checkAll: false
        }
      ];

      //toggle all for basic layers
      function toggleMap(input){
        var i = 0;
        for (i=0; i<vm.accordionList[input].data.length; i++) {
          vm.accordionList[input].data[i].active = vm.accordionList[input].checkAll;
        }
      }
      vm.toggleMap = toggleMap;

      //location menu
      vm.status = {
        open: false,
        open2: false,
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };
      vm.lokasi = lokasiService.data;


      //search box functionality using ui-select
      vm.isLoaded = false;
      vm.selected = '';

      vm.searchMarker = {};

      function dropSearchMarker() {
        if (vm.selected !== '') {
          var lat = parseFloat(vm.selected.Lintang);
          var lon = parseFloat(vm.selected.Bujur);
          var message = vm.selected.Nama_Lokasi + '<br>' + vm.selected.Kategori + ' - ' + vm.selected.Sub_Kategori + '<br>' + vm.selected.Alamat;
          vm.bandaAceh.lat = lat;
          vm.bandaAceh.lon = lon;
          //vm.bandaAceh.label.show = true;
          vm.searchMarker = {
            lat: lat,
            lon: lon,
            label: {
              message: message,
              show: true
            }
          };
        } else {
          vm.searchMarker = {};
        }

      }
      vm.dropSearchMarker = dropSearchMarker;

      function resetSearch(){
        vm.searchMarker.label.show = false;
        vm.selected= '';
      }
      vm.resetSearch = resetSearch;

      //vm.showMarker = false;



      //show/hidden accordions interactions
      vm.layerMenuIsVisible = false;
      vm.showMapMenu = function () {
        vm.lokasiMenuIsVisible = false;
        vm.cariMenuIsVisible = false;
        vm.layerMenuIsVisible = vm.layerMenuIsVisible ? false : true;
      };

      vm.lokasiMenuIsVisible = false;
      vm.showMapLokasiMenu = function () {
        vm.layerMenuIsVisible = false;
        vm.cariMenuIsVisible = false;
        vm.lokasiMenuIsVisible = vm.lokasiMenuIsVisible ? false : true;
      };

      vm.cariMenuIsVisible = false;
      vm.showMapCariMenu = function(){
        vm.lokasiMenuIsVisible = false;
        vm.layerMenuIsVisible = false;
        vm.cariMenuIsVisible = vm.cariMenuIsVisible ? false: true;
      };

      $http.get('http://bappeda.bandaacehkota.go.id/webgis/api/api_lokasi.php').then(function (response){
        vm.lokasiList = response.data;
        //convert array of array response.data as array of object (not needed anymore since already processed into array of object in API)
        //vm.bankList = [];
        //vm.getJsonBank.forEach(function(element){
        //  vm.bankList.push(element);
        //});
      });

    }
  }

})();
