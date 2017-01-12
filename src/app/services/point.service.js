(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('pointService', pointService);

  /** @ngInject */
  function pointService($http, $q) {
    var vm = this;

    //all lokasi in one place
    // vm.lokasi = function(){
    //   return $http.get('http://localhost:1337/lokasi');
    // };

    //different req for different point data
    vm.atm = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/ATM');
    };
    vm.kantor = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Kantor'); //1. this returns promise
    };
    vm.pasar = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Pasar');
    };
    vm.penginapan = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Penginapan');
    };
    vm.mesjid = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Rumah%20Ibadah/Mesjid');
    };

    vm.saranaKesehatan = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Sarana%20Kesehatan');
    };
    vm.saranaPendidikan = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Sarana%20Pendidikan');
    };
    vm.spbu = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/SPBU');
    };


    //notyet called
    vm.militer = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Militer');
    };
    vm.fasilitasUmum = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Fasilitas%20Umum');
    };
    vm.kuliner = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Kuliner');
    };
    vm.lembagaKeuangan = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Lembaga%20Keuangan');
    };
    vm.tempatUsaha = function(){
      return $http.get('https://bappeda.bandaacehkota.go.id/service/lokasi/Tempat%20Usaha');
    };


    // implement this later if I figured out the solution
    // this.styleName = function pointStyle(iconSrc) {
    //   return {
    //     image: {
    //       icon: {
    //         anchor: [0.5, 1],
    //         anchorXUnits: 'fraction',
    //         anchorYUnits: 'fraction',
    //         opacity: 0.90,
    //         src: iconSrc
    //       }
    //     }
    //   };
    // };

    // // ATM
    // var atm_style = {
    //           image: {
    //               icon: {
    //                   anchor: [0.5, 1],
    //                   anchorXUnits: 'fraction',
    //                   anchorYUnits: 'fraction',
    //                   opacity: 0.90,
    //                   src: 'https://bappeda.bandaacehkota.go.id/webgis/icon/arrow.png'
    //               }
    //           }
    //       };
    // //vm.atm_style = atm_style;
    // this.get = function(){
    //   return $http.get('https://bappeda.bandaacehkota.go.id/webgis/api/api_test_atm.php').then(function(response) {
    //     console.log(response.data);
    //     return response.data;
    //   });
    //
    // };
    //
    // this.atm = function(){
    //   var dfrd = $q.defer();
    //   $http.get('https://bappeda.bandaacehkota.go.id/webgis/api/api_test_atm.php').then(function(response){
    //     if (response.data.success === true) {
    //
    //     } else {
    //
    //     }
    //     // var aa = response.data;
    //     // var arr = []; var isi = {};
    //     // angular.forEach(aa, function (obj){
    //     //   isi = {
    //     //     name: obj.NAMA,
    //     //     lat: parseFloat(obj.LINTANG, 10),
    //     //     lon: parseFloat(obj.BUJUR, 10),
    //     //     label: {
    //     //       message: obj.NAMA + ' ' + obj.LINTANG,
    //     //       show: false,
    //     //       showOnMouseClick: true
    //     //     },
    //     //     style: atm_style
    //     //   };
    //     //   arr.push(isi);
    //     // });
    //     // console.log(arr);
    //     // return arr;
    //   }, function (x){
    //     dfrd.reject(true);
    //   });
    //   return dfrd.response;
    // };
    //
    // // Travel
    //
    // var travel_style = {
    //           image: {
    //               icon: {
    //                   anchor: [0.5, 1],
    //                   anchorXUnits: 'fraction',
    //                   anchorYUnits: 'fraction',
    //                   opacity: 0.90,
    //                   src: 'https://bappeda.bandaacehkota.go.id/webgis/icon/vespa.png'
    //               }
    //           }
    //       };
    //
    // $http.get('https://bappeda.bandaacehkota.go.id/webgis/api/api_test_travel.php').then(function(response){
    //
    //   var aa = response.data;
    //   var arr = []; var isi = {};
    //   angular.forEach(aa, function (obj){
    //     isi = {
    //       name: obj.NAMA,
    //       lat: parseFloat(obj.LINTANG, 10),
    //       lon: parseFloat(obj.BUJUR, 10),
    //       label: {
    //         message: obj.NAMA + ' ' + obj.LINTANG,
    //         show: false,
    //         showOnMouseClick: true
    //       },
    //       style: travel_style
    //     };
    //     arr.push(isi);
    //   });
    //   //console.log(arr);
    //   vm.travel = arr;
    // });
    //
    // this.allData = [vm.travel];
  }

})();
