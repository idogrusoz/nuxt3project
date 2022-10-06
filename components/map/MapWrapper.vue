<template>
  <div
    id="map"
    class="h-100"
  ></div>
</template>
<script setup lang="ts">
  import mapboxgl, { LngLatLike } from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { onMounted } from 'vue';
  import featuresCollection from '~~/types/featuresCollection';
  import { GeoJSON } from '~~/types/location';

  const props = defineProps<{
    locations: featuresCollection;
    selectedLocation: GeoJSON | null;
    isEditing: boolean;
  }>();

  const newCoordinates = ref<number[]>([]);

  const emit = defineEmits<{
    (e: 'selectLocation', selection: GeoJSON): void;
    (e: 'updateEditMode', editing: boolean): void;
    (e: 'setSelectedCoordinates', coordinates: number[]): void;
  }>();

  const runtimeConfig = useRuntimeConfig();
  const defaultCenter = runtimeConfig.public.mapCenter as LngLatLike;
  let map: any;

  onMounted(() => {
    mapboxgl.accessToken = runtimeConfig.mapBoxToken;
    laodMap();
  });

  function laodMap() {
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: defaultCenter,
      zoom: 11,
    });
    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: props.locations,
      });
    });
    map.on('click', (event: any) => {
      if (!props.isEditing) {
        newCoordinates.value = Object.values(event.lngLat);
        createPopUp(event.point.x, event.point.y);
      }
    });
    addMarkers();
  }

  function createPopUp(x: number, y: number) {
    removePopUp();
    const popup = document.createElement('button');
    popup.setAttribute('id', 'popUp');
    popup.classList.add(
      'bg-transparent',
      'bg-white',
      'hover:bg-blue-400',
      'text-blue-500',
      'font-semibold',
      'hover:text-white',
      'py-2',
      'px-4',
      'border',
      'border-blue-400',
      'hover:border-transparent',
      'rounded',
      '-translate-x-2/4',
      '-translate-y-full',
      'absolute'
    );
    popup.style.top = `${y}px`;
    popup.style.left = `${x}px`;
    popup.innerHTML = 'Add new';
    popup.addEventListener('click', handlePopUpClick, false);
    const mapElement = document.getElementById('map');
    mapElement && mapElement.appendChild(popup);
  }

  function handlePopUpClick() {
    emit('updateEditMode', true);
    emit('setSelectedCoordinates', newCoordinates.value);
    removePopUp();
  }

  function removePopUp() {
    const popUp = document.getElementById('popUp');
    popUp && popUp.remove();
  }

  function addMarkers() {
    for (const marker of props.locations.features) {
      const el = document.createElement('div');

      el.id = `marker-${marker.id}`;

      el.className = `marker ${
        props.selectedLocation && props.selectedLocation.id === marker.id
          ? 'active'
          : ''
      }`;

      el.addEventListener('click', (e) => markerClickHandler(e, marker));

      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry!.coordinates)
        .addTo(map);
    }

    function markerClickHandler(e: MouseEvent, marker: GeoJSON) {
      if (props.isEditing) {
        return;
      }
      removePopUp();
      emit('selectLocation', marker);

      updateSelectedMarker(marker);
      if (props.selectedLocation) {
        flyToLocation();
      }

      e.stopPropagation();
    }

    function flyToLocation() {
      map.flyTo({
        center:
          props.selectedLocation && props.selectedLocation.geometry
            ? props.selectedLocation.geometry.coordinates
            : [],
        zoom: 13,
      });
    }

    watch(
      () => props.selectedLocation,
      (newValue) => {
        if (newValue === null) {
          return;
        }
        removePopUp();
        updateSelectedMarker(newValue);
        flyToLocation();
      }
    );

    function updateSelectedMarker(marker: GeoJSON) {
      const activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      const markers = document.getElementById(`marker-${marker.id}`);
      markers && markers.classList.add('active');
    }
  }
</script>
<style>
  .marker {
    cursor: pointer;
    height: 36px;
    width: 36px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' fill='rgba(65,164,231,1)'/%3E%3C/svg%3E");
    background-size: cover;
  }

  .active {
    height: 56px;
    width: 56px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' fill='rgba(242,11,74,1)'/%3E%3C/svg%3E");
  }
</style>
