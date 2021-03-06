(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        bindToController: true
      })
      .state("about",{
        url: "/about",
        templateUrl: "app/about/about.html",
        controller: "AboutPageController",
        controllerAs: "about"
      })
      .state('local', {
        url: '/local',
        templateUrl: 'app/local_geo/local.html',
        controller: 'LocalGeoController',
        controllerAs: 'local'
      })
      .state('testing', {
        url: '/testing',
        templateUrl: 'app/testing/testing.html',
        controller: 'TestingController',
        controllerAs: 'test'
      })
      .state('single', {
        url: '/single-map',
        templateUrl: 'app/single_map/single.html',
        controller: 'SingleController',
        controllerAs: 'vm'
      })
      .state('rtrw', {
        url: '/rtrw-map',
        templateUrl: 'app/rtrw_map/rtrw.html',
        controller: 'RtrwController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
