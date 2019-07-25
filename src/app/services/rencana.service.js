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
        desc: 'Pola Ruang RTRW Revisi',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:prrtrwsimtaru', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'pola_ruang',
        desc: 'Pola Ruang 2009-2029',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:pola_ruang_banda_aceh_utm', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'kawasan_strategis',
        desc: 'Rencana Kawasan Strategis 2009-2029',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:kawasan strategis1', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'jaringan_jalan',
        desc: 'Rencana Jaringan Jalan 2009-2029',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:rencana_jaringan_jalan', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'pusat_pelayanan',
        desc: 'Rencana Pusat Pelayanan 2009-2029',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:struktur_ruang', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'rupm_2018_kawasan',
        desc: 'Lokasi RUPM Kota Banda Aceh',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:rupmlokasi2018', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'rupm_2018_lokasi',
        desc: 'Kawasan RUPM Kota Banda Aceh',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:rupmkawasan2018', 'TILED': true}
        },
        zIndex: 2
      }
    ];

  }

})();
