(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('lokasiService', lokasiService);

  /** @ngInject */
  function lokasiService() {
    this.data = [
      {
        name: 'lokasi',
        desc: 'Lokasi Penting',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_utama", "TILED": true}
        },
        zIndex: 0
      }
    ];

    this.lokasiLain = [
      {
        name: 'ATM',
        desc: 'Lokasi ATM',
        active: false,
        query_page: 'api_test_atm.php'
      }
    ];
  }

})();
