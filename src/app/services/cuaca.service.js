(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('cuacaService', cuacaService);

  /** @ngInject */
  function cuacaService() {
    this.data = [
      {
        name: 'Open Weather Cloud Map',
        desc: 'Awan',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            name: 'Awan',
            type: 'XYZ',
            url: "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=1f40d5ffca78c0d1699432083bfe24fc"
        },
        zIndex: 10
      },
      {
        name: 'Open Weather Precipitation Map',
        desc: 'Hujan',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            name: 'Hujan',
            type: 'XYZ',
            url: "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=1f40d5ffca78c0d1699432083bfe24fc"
        },
        zIndex: 10
      },
      {
        name: 'Open Weather Wind Map',
        desc: 'Angin',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            name: 'Angin',
            type: 'XYZ',
            url: "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=1f40d5ffca78c0d1699432083bfe24fc"
        },
        zIndex: 10
      },
      {
        name: 'Open Weather Temperature Map',
        desc: 'Suhu',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            name: 'Suhu',
            type: 'XYZ',
            url: "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=1f40d5ffca78c0d1699432083bfe24fc"
        },
        zIndex: 10
      },
    ];

  }

})();
