(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('LocalGeoController', LocalGeoController);

  /** @ngInject */
  function LocalGeoController($scope, $http, olData) {
    var vm = this;


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
    /*$http.get('https://jsonplaceholder.typicode.com/posts').then(function (response){
      vm.getJson = response.data;
    });*/

    //separate point layer as different layer
    vm.lokasi = [
      {
        name: 'lokasi',
        desc: 'Lokasi',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://120.10.11.18:8080/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_tabel2", "TILED": true}
        },
        zIndex: 11
      }
    ];


    vm.showDetails = showPopUp;
    function showPopUp(lo){
      alert(lo);
    }

    vm.markers = [];

    $scope.$on('openlayers.map.singleclick', function(event, data) {
      console.log(data);
        var prj = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, 'EPSG:3857').map(function(c) {
            return c;
        });
        var view = new ol.View({
            center: [0, 0],
            zoom: vm.bandaAceh.zoom
        });
        //console.log(view);
        var viewResolution = /** @type {number} */ (view.getResolution());
        //console.log('view resoultion: ' + viewResolution);
        //console.log(prj);
        var wmsLokasi = new ol.source.TileWMS({
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params: {'LAYERS': 'uptb_gis_bna:lokasi_tabel', 'TILED': true},
            serverType: 'geoserver'
        });

        var myurl = wmsLokasi.getGetFeatureInfoUrl(
                prj, viewResolution, 'EPSG:3857',
                {'INFO_FORMAT': 'application/json'});

        vm.url=myurl;

        $http.get(myurl).success(
          function (data, status) {
            var items = [];
            console.log(data);
            //var properties = data.features[0].properties;
            if (data.features[0]) {

              var properties = data.features[0].properties;
              var nama = properties.nama_lokas;
              var desa = properties.desa;
              vm.lengkap = 'Detail Data : ' + nama + '  ' + desa;
            } else {
              vm.lengkap = 'no data'
            }
            //console.log('the datas: ' + nama + '  ' + desa);
          }
        );
        //console.log(viewRes);


    });

  }

})();
