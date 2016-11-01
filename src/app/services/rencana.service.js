(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('rencanaService', rencanaService);

  /** @ngInject */
  function rencanaService() {
    //List all tematik layers jml_kk_2011, total_pddk_2013, total_pddk_2014,
    //List all perencanaan layers pola_ruang,kawasan_strategis,pusat_pelayanan
    this.data = [
      {
        name: 'pola_ruang',
        desc: 'Pola Ruang',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:pola_ruang_banda_aceh_utm', 'TILED': true}
        }
      },
      {
        name: 'kawasan_strategis',
        desc: 'Kawasan Strategis',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:kawasan strategis1', 'TILED': true}
        }
      },
      {
        name: 'pusat_pelayanan',
        desc: 'Pusat Pelayanan',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:struktur_ruang', 'TILED': true}
        }
      }
    ];

  }

})();
