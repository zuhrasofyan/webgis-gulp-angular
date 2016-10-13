(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('otherBasemapService', otherBasemapService);

  /** @ngInject */
  function otherBasemapService() {
    //List all tematik layers jml_kk_2011, total_pddk_2013, total_pddk_2014,
    //List all perencanaan layers pola_ruang,kawasan_strategis,pusat_pelayanan
    this.bing = [{
        name: 'bing',
        desc: 'Jalan',
        active: false,
        opacity: 1,
        source: {
            name: 'Bing Maps',
            type: 'BingMaps',
            key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
            imagerySet: 'Road'
        },
        zIndex: 12
      },
      {
        name: 'aerial_bing',
        desc: 'Satelit',
        active: false,
        opacity: 1,
        source: {
            name: 'Bing Aerial Maps',
            type: 'BingMaps',
            key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
            imagerySet: 'Aerial'
        },
        zIndex: 12
      }
    ];

    /*this.citraSatelit = [
      {
        name: 'citra_satelit',
        desc: 'Citra Satelit',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:WorldView-1_BandaAceh_15Jan2015_CD1', 'TILED': true}
        },
        zIndex: 11
      },
      {
        name: 'citra_satelit2',
        desc: 'Citra Satelit',
        active: false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:WorldView-1_BandaAceh_15Jan2015_CD2', 'TILED': true}
        },
        zIndex: 11
      }
    ];*/

  }

})();
