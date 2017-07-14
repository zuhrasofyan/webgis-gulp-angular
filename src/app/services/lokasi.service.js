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
      },
      {
        name: 'kantor',
        desc: 'Lokasi Perkantoran',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_kantor", "TILED": true}
        },
        zIndex: 0
      },
      {
        name: 'mini_market_2016',
        desc: 'Lokasi Mini Market Survey Bappeda 2016',
        active: false,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:mini_market_2016_mysql", "TILED": true}
        },
        zIndex: 0
      },
    ];

  }

})();
