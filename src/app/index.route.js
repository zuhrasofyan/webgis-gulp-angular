(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about',{
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutPageController',
        controllerAs: 'about'
      })
      .state('local', {
        url: '/local',
        templateUrl: 'app/local_geo/local.html',
        controller: 'LocalGeoController',
        controllerAs: 'local'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
