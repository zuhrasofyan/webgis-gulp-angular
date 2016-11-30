(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .directive('mapSmallButtons', mapSmallButtons);

  /** @ngInject */
  function mapSmallButtons() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mapSmallButtons/mapSmallButtons.html',
      scope: {},
      controller: MapSmallButtonsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MapSmallButtonsController($scope, olData, baseDataService, html2canvasAngular) {
      var vm = this;
      vm.bandaAceh = baseDataService.bandaAceh;
      vm.defaults = baseDataService.defaults;

      //inject rotate north button to directive
      var rotateNorthControl = function(opt_options) {
          var options = opt_options || {};
          var rotation = 0;
          var button = document.createElement('div');
          button.className = "btn btn-info btn-sm";
          button.innerHTML = '<i class="fa fa-rotate-right"></i>';
          var this_ = this;
          var handleRotateNorth = function(e) {
              rotation += 90;
              this_.getMap().getView().setRotation(rotation);
              // console.log(this_.getMap().getView().getCenter());
              // console.log(this_.getMap().getLayers());
              // console.log(options.target);
          };
          button.addEventListener('click', handleRotateNorth, false);
          button.addEventListener('touchstart', handleRotateNorth, false);
          var element = document.createElement('div');
          element.className = 'rotate-north ol-unselectable';
          element.setAttribute('title', 'Rotate 90 degree');
          element.appendChild(button);
          ol.control.Control.call(this, {
              element: element,
              target: options.target
          });
      };

      ol.inherits(rotateNorthControl, ol.control.Control);

      vm.rotateNorth = {
          control: new rotateNorthControl()
      };

      //recenter the map functionality
      function btnRecenter() {
        olData.getMap().then(function(map){
          //this coordinate is coordinate of Mesjid Raya Baiturrahman
          var latLon = [10610664.603506522,619192.4795668736];
          map.getView().setCenter(latLon);
          map.getView().setZoom(15);
        });
      }

      vm.btnRecenter = btnRecenter;

      function btnZoomIn() {
        if (vm.bandaAceh.zoom < vm.defaults.view.maxZoom) {
          vm.bandaAceh.zoom = vm.bandaAceh.zoom+1;
        }

      }
      vm.btnZoomIn = btnZoomIn;

      function btnZoomOut() {
        if (vm.bandaAceh.zoom > vm.defaults.view.minZoom) {
          vm.bandaAceh.zoom = vm.bandaAceh.zoom-1;
        }
      }

      vm.btnZoomOut = btnZoomOut;

      //save map as image
      function saveAsPNG() {
        html2canvasAngular.renderBody().then(function(canvas){
          canvas.toBlob(function (blob) {
            //console.log(blob);
            saveAs(blob, 'map.png');
          }, 'image/png');
          //document.body.appendChild(canvas);
        });
      }
      vm.saveAsPNG = saveAsPNG;
    }
  }

})();
