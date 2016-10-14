(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('komponenPetaService', komponenPetaService);

  /** @ngInject */
  function komponenPetaService() {
    //List all basic layers land,perumahan,bangunan,laut,tambak,sungai,hutan,taman,lapangan,jalan,lokasi
    this.data = [
      {
        name: 'land',
        desc: 'Land',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:bna_ab_merge', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'perumahan',
        desc: 'Perumahan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:perumahan_2011', 'TILED': true}
        },
        zIndex: 2
      },
      {
        name: 'bangunan',
        desc: 'Bangunan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Bangunan_2011', 'TILED': true}
        },
        zIndex: 3
      },
      {
        name: 'laut',
        desc: 'Laut',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:laut_2011_dissolve', 'TILED': true}
        },
        zIndex: 4
      },
      {
        name: 'tambak',
        desc: 'Tambak',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:tambak_2011', 'TILED': true}
        },
        zIndex: 5
      },
      {
        name: 'sungai',
        desc: 'Sungai',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:sungai_2011_dissolve', 'TILED': true}
        },
        zIndex: 6
      },
      {
        name: 'hutan',
        desc: 'Hutan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:hutan_kota_2011', 'TILED': true}
        },
        zIndex: 7
      },
      {
        name: 'taman',
        desc: 'Taman',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:taman_2011', 'TILED': true}
        },
        zIndex: 8
      },
      {
        name: 'lapangan',
        desc: 'Lapangan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:lapangan_2011', 'TILED': true}
        },
        zIndex: 9
      },
      {
        name: 'jalan',
        desc: 'Jalan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'http://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
        },
        zIndex: 12
      }
    ];


  }

})();
