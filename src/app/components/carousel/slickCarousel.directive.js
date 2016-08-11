(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .directive('slickCarousel', slickCarousel);

  /** @ngInject */
  function slickCarousel() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/carousel/slickCarousel.html',
      scope: {},
      controller: CarouselController,
      controllerAs: 'vm'
    };

    return directive;

    /** @ngInject */
    function CarouselController($scope) {
      var vm = this;

      var atok = [{
        url: 'http://lorempixel.com/100/100/sports'
      }, {
        url: 'http://lorempixel.com/100/100/abstract'
      }, {
        url: 'http://lorempixel.com/100/100/business'
      }, {
        url: 'http://lorempixel.com/100/100/city'
      }, {
        url: 'http://lorempixel.com/100/100/technics'
      }, {
        url: 'http://lorempixel.com/100/100/cats'
      }];
      //vm.good = [];
      vm.goods = atok;
      vm.dsd = [1234234234, 334324234, 5454667];
      // "vm.creationDate" is available by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
