(function() {
  'use strict';

  angular
      .module('gulpAngular')
      .service('basemapDataService', basemapDataService);

  /** @ngInject */
  function basemapDataService() {

    this.data = [
      {
        name: 'basemap_bappeda',
        desc: 'Basemap Bappeda Kota Banda Aceh',
        active: true,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna_basemap_bappeda', 'TILED': true}
        },
        zIndex:-1
      },
      {
        name: 'basemap_ikonos_2005',
        desc: 'Basemap IKONOS 2005',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Ikonos_Jan2005_V2', 'TILED': true}
        },
        zIndex:-1
      },
      {
        name: 'basemap_ikonos_2002',
        desc: 'Basemap IKONOS 2002',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Ikonos_2002', 'TILED': true}
        },
        zIndex:-1
      },
      {
          name: 'bing',
          desc: 'Jalan (Bing Maps)',
          active: false,
          showOpacity:false,
          opacity: 1,
          source: {
              name: 'Bing Maps',
              type: 'BingMaps',
              key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
              imagerySet: 'Road'
          },
          zIndex: -1
        },
        {
          name: 'aerial_bing',
          desc: 'Satelit (Bing Maps)',
          active: false,
          showOpacity:false,
          opacity: 1,
          source: {
              name: 'Bing Aerial Maps',
              type: 'BingMaps',
              key: 'AlShs5Jq3KqQxpuRNEtxI4_LL5H4-okI9vxBBE_TZo2TNtJNe2Kl2le-rJ4F9jS7',
              imagerySet: 'Aerial'
          },
          zIndex: -1
        }
    ];

    //peta dasar layer komponen untuk self service user preview data
    this.dataDasar = [
      {
        name: 'land',
        desc: 'Basemap Kosong',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:bna_ab_merge', 'TILED': true}
        },
        zIndex:1
      },
      {
        name: 'jalan',
        desc: 'Jalan Banda Aceh',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:jalan_banda_aceh', 'TILED': true}
        },
        zIndex:1
      },
      {
        name: 'batas_desa',
        desc: 'Batas Desa',
        active: false,
        showLegend: true,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:batas_desa0', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'batas_desa_2018',
        desc: 'Batas Desa 2018',
        active: false,
        showLegend: true,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:administrasi_gampong_bappedabna_2018_full', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'batas_kecamatan',
        desc: 'Batas Kecamatan',
        active: false,
        showLegend: true,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:Bna_kecamatan', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'batas_kecamatan_2018',
        desc: 'Batas Kecamatan 2018',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:administrasi_kecamatan_bappedabna_2018', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'batas_kota',
        desc: 'Batas Kota Banda Aceh',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:batas_kota_banda_aceh', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'batas_kota_2018',
        desc: 'Batas Kota Banda Aceh 2018',
        active: false,
        showOpacity:false,
        opacity: 1,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:administrasi_kota_bandaaceh_bappedabna_q', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'sungai_2018',
        desc: 'Sungai 2018',
        active: false,
        showLegend: true,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:sungai_2018', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'garis_pantai_2018',
        desc: 'Garis Pantai 2018',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: false,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:garispantai_bappeda_2018_q', 'TILED': true}
        },
        zIndex: 1
      },
      {
        name: 'kontur',
        desc: 'Kontur Kota Banda Aceh',
        active: false,
        showLegend: false,
        showOpacity:false,
        opacity: 1,
        canOpen: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:kontur_bna', 'TILED': true}
        },
        zIndex: 1
      }
    ];

    //List all basic layers land,perumahan,bangunan,laut,tambak,sungai,hutan,taman,lapangan,jalan,lokasi (use this if you want separate components to display the Bappeda Kota Basemap instead)
    this.separateBasemapData = [
      {
        name: 'perumahan',
        desc: 'Perumahan',
        active: true,
        source: {
            type: 'TileWMS',
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:jalan_line_wgs0', 'TILED': true}
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
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
            url: 'https://bappeda.bandaacehkota.go.id/geoserver/uptb_gis_bna/wms',
            params:{'LAYERS': 'uptb_gis_bna:WorldView-1_BandaAceh_15Jan2015_CD2', 'TILED': true}
        },
        zIndex: 11
      }
    ]; */

  }

})();
