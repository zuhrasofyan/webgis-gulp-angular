(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('baseDataService', baseDataService);

  /** @ngInject */
  function baseDataService() {
    //set base coordinate
    this.bandaAceh = {
        lat: 5.551,
        lon: 95.322,
        zoom: 15
    };
    //set default view configuration
    this.defaults = {
      view: {
          maxZoom: 20,
          minZoom: 14,
          extent: [10605714.11, 615365.85, 10617256.10, 625990.60]
      },
      events: {
        map: ['singleclick', 'pointermove']
      },
      controls: {
        zoom: false,
        attribution: false
      },
      interactions: {
                mouseWheelZoom: false
            },
    };

    this.projection = 'EPSG:3857';

    //button controls on the map
    this.controls = [
        { name: 'zoom', active: false },
        { name: 'fullscreen', active: true },
        {name: 'scaleline', active: true},
        {name: 'mouseposition', active: false},
        {name: 'overviewmap', active: true},
        {name: 'zoomtoextent', active: false}
    ];

  }

})();
