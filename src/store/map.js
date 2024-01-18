// map.js
import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import maplibregl from "maplibre-gl";

export const useMapStore = defineStore('mapStore', () => {
    let map = ref(null);

    /**
     * Method used to build map
     */
    async function buildMap() {
        map.value = new maplibregl.Map({
            container: 'map',
            style: {
                'version': 8,
                'sources': {
                    'raster-tiles': {
                        'type': 'raster',
                        'tiles': [
                            'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
                        ],
                        'tileSize': 256,
                        'attribution':
                            '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href= "https://carto.com/about-carto/">CARTO</a>'
                    }
                },
                'layers': [
                    {
                        'id': 'simple-tiles',
                        'type': 'raster',
                        'source': 'raster-tiles',
                        'minzoom': 0,
                        'maxzoom': 22
                    }
                ]
            },
            center: [-95, 40],
            zoom: 4
        })

        map.value.addControl(new maplibregl.NavigationControl());

    }   

    return {
        map,
        buildMap
    }

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}
