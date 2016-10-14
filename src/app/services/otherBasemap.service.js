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

    
  }

})();
