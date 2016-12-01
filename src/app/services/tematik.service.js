(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('tematikService', tematikService);

  /** @ngInject */
  function tematikService() {
    //List all tematik layers jml_kk_2011, total_pddk_2013, total_pddk_2014,
    this.data = [
      {
        name: 'jml_kk_2011',
        desc: 'Jumlah KK 2011',
        active: false,
        opacity: 1,
        showLegend: false,
        showOpacity:false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:tematik_jml_kk', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'total_pddk_2013',
        desc: 'Total Penduduk 2013',
        active: false,
        opacity: 1,
        showLegend: false,
        showOpacity:false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:total_pddk_2013', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'total_pddk_2014',
        desc: 'Total Penduduk 2014',
        active: false,
        opacity: 1,
        showLegend: false,
        showOpacity:false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:total_pddk_2014', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'landuse_2011',
        desc: 'Landuse 2011',
        active: false,
        opacity: 1,
        showLegend: false,
        showOpacity:false,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:landuse_20110', 'TILED': true}
        },
        zIndex: 2
      }
    ];

  }

})();
