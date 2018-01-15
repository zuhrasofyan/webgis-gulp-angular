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
        canOpen: true,
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
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:lokasi_kantor", "TILED": true}
        },
        zIndex: 0
      },
      {
        name: 'mini_market_2016',
        desc: 'Lokasi Swalayan Survey Bappeda 2016',
        active: false,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:mini_market_2016_mysql", "TILED": true}
        },
        zIndex: 0
      },
      {
        name: 'baliho_2016',
        desc: 'Lokasi Baliho Survey Bappeda 2016',
        active: false,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:baliho_2016", "TILED": true}
        },
        zIndex: 0
      },
      {
        name: 'fiber_optic_2017',
        desc: 'Titik Fiber Optic Tower - Dinas Perhubungan Banda Aceh 2017',
        active: false,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{"LAYERS": "uptb_gis_bna:tiang_fo_jenis_tinggi_tiang_dengan_style", "TILED": true}
        },
        zIndex: 0
      },
    ];

  }

})();
