(function() {
  'use strict';
  angular
      .module('gulpAngular')
      .factory('rtrwMapFactory', rtrwMapFactory);

  function rtrwMapFactory(){

    return {
      bandaAceh: function(){
        return ({
          lat: 5.551,
          lon: 95.322,
          zoom: 15,
          label: {
              message: 'Center of Banda Aceh',
              show: false,
              showOnMouseOver: true
          }
        })
      },
      myPosition: function() {
        return({
          lat: 0,
          lon: 0,
          zoom: 1,
          autodiscover: true,
          label: {
            message: 'my position',
            show: true
          }
        })
      },
      defaults: function() {
        return({
          view: {
            maxZoom: 20,
            minZoom: 12,
            extent: [10605714.11, 615365.85, 10617256.10, 625990.60]
          },
          events: {
            map: ['singleclick', 'pointermove']
          },
          controls: {
            zoom: true,
            attribution: true
          },
          interactions: {
            mouseWheelZoom: true
          }
        });
      },
      projection: function(){
        return 'EPSG:3857';
      },
      controls: function(){
        return([
          { name: 'zoom', active: true },
          { name: 'fullscreen', active: true },
          {name: 'scaleline', active: true},
          {name: 'mouseposition', active: false},
          {name: 'overviewmap', active: true},
          {name: 'zoomtoextent', active: true}
        ]);
      }

    };
  }

})();
