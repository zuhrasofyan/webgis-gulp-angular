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
          active: true,
          open: false,
          data: basemapDataService.dataDasar,
          checkAll: false
        },
        {
          name: 'Peta Tematik',
          active: true,
          open: false,
          data: tematikService.data,
          checkAll: false
        },
        {
          name: 'Peta Perencanaan',
          active: true,
          open: false,
          data: rencanaService.data,
          checkAll: false
        },
        {
          name: 'Basemap dan Citra Satelit',
          active: true,
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
      vm.selected = {};

      vm.searchMarker = {};

      function dropSearchMarker() {
        if (vm.selected && !angular.equals({}, vm.selected)) {
          var lat = parseFloat(vm.selected.originalObject.Lintang);
          var lon = parseFloat(vm.selected.originalObject.Bujur);
          var message = vm.selected.originalObject.Nama_Lokasi + '<br>' + vm.selected.originalObject.Kategori + ' - ' + vm.selected.originalObject.Sub_Kategori + '<br>' + vm.selected.originalObject.Alamat;
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
        if (!angular.equals({}, vm.searchMarker)){
          vm.searchMarker.label.show = false;
          vm.selected= {};
        }
        clearInput('input-lokasi');

      }
      vm.resetSearch = resetSearch;

      //clear search inputbox
      function clearInput(id) {
        if (id) {
          $scope.$broadcast('angucomplete-alt:clearInput', id);
        }
        else{
          $scope.$broadcast('angucomplete-alt:clearInput');
        }
      }


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

      vm.lokasiList = [];
      vm.showMapCariMenu = function(){
        vm.lokasiMenuIsVisible = false;
        vm.layerMenuIsVisible = false;
        vm.cariMenuIsVisible = vm.cariMenuIsVisible ? false: true;
        // only request and load api_lokasi to vm.lokasiList array after button showMapCariMenu for the first time clicked
        if (vm.lokasiList.length === 0) {
          $http.get('http://bappeda.bandaacehkota.go.id/webgis/api/api_lokasi.php').then(function (response){
            vm.lokasiList = response.data;
            //convert array of array response.data as array of object (not needed anymore since already processed into array of object in API)
            //vm.bankList = [];
            //vm.getJsonBank.forEach(function(element){
            //  vm.bankList.push(element);
            //});
          });
        }
      };

      //show legend
      function showLegend(data){
        if (data.hasOwnProperty('showLegend')){
          data.showLegend = data.showLegend ? false : true;
        }

      }
      vm.showLegend = showLegend;

      //show opacity
      function showOpacity(data){
        if (data.hasOwnProperty('showOpacity')){
          data.showOpacity = data.showOpacity ? false : true;
        }

      }
      vm.showOpacity = showOpacity;

    }
  }

})();
