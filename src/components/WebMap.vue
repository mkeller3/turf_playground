<template>
    <div id="map"></div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useMapStore } from '@/store/map';

const mapStore = useMapStore();

onMounted(async () => {
    mapStore.buildMap()
    const dropArea = document.getElementById('map');

    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);

    function handleDragOver(event) {
        event.preventDefault();
        dropArea.style.border = '2px dashed #333';
        dropArea.style.opacity = 0.3;
    }

    function handleDrop(event) {
        event.preventDefault();
        dropArea.style.border = '';
        dropArea.style.opacity = 1;

        const file = event.dataTransfer.files[0];
        handleFile(file);
    }

    function handleFile(file) {
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const geojson = JSON.parse(e.target.result);

                // Add the GeoJSON data to the map
                mapStore.map.addSource('custom-data', {
                    type: 'geojson',
                    data: geojson
                });

                if (geojson['features'][0]['geometry']['type'].toLowerCase().includes('point')) {
                    mapStore.map.addLayer({
                        id: 'custom-layer',
                        type: 'circle',
                        source: 'custom-data',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#B42222'
                        }
                    });
                }
                if (geojson['features'][0]['geometry']['type'].toLowerCase().includes('polygon')) {
                    mapStore.map.addLayer({
                        id: 'custom-layer',
                        type: 'fill',
                        source: 'custom-data',
                        paint: {
                            'fill-opacity': 0.6,
                            'fill-color': '#B42222'
                        }
                    });
                }
                if (geojson['features'][0]['geometry']['type'].toLowerCase().includes('line')) {
                    mapStore.map.addLayer({
                        id: 'custom-layer',
                        type: 'fill',
                        source: 'custom-data',
                        paint: {
                            'line-color': '#B42222'
                        }
                    });
                }
            };

            reader.readAsText(file);
        }
    }
})


</script>


<style scoped>
#map {
    height: 100%;
}
</style>