<template>
  <CommonLoading v-if="loading" />
  <div
    v-else
    class="max-h-screen flex flex-col"
  >
    <div>
      <FormNewPointForm
        v-if="isEditing"
        @update-edit-mode="updateEditMode"
        @save-new-location-properties="saveNewPoint"
      />
    </div>
    <div
      v-if="locations"
      class="flex w-screen shrink overflow-scroll"
    >
      <ListColumnLocationList
        :locations="locations.features"
        class="w-3/12"
        @select-location="setSelectedLocation"
        :selected-location="selectedLocation"
      />
      <MapWrapper
        :locations="locations"
        :key="locations.features.length"
        class="w-9/12"
        @select-location="setSelectedLocation"
        @update-edit-mode="updateEditMode"
        @set-selected-coordinates="createNewPointObject"
        :selected-location="selectedLocation"
        :is-editing="isEditing"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import locationListPromise from '~~/assets/locationsList';
  import featuresCollection from '~~/types/featuresCollection';
  import { GeoJSON, LocationProperties } from '~~/types/location';

  const locations = ref<featuresCollection | null>(null);
  const withError = ref(false);
  const loading = ref(false);
  const isEditing = ref(false);
  const selectedLocation = ref<GeoJSON | null>(null);

  let newPoint: GeoJSON | null = null;

  onMounted(async () => {
    loading.value = true;
    try {
      locations.value = await locationListPromise();
    } catch (error) {
      console.error(error);
      withError.value = true;
    } finally {
      loading.value = false;
    }
  });

  function updateEditMode(editing: boolean) {
    isEditing.value = editing;
  }

  function createNewPointObject(coordinates?: number[]) {
    newPoint = {
      type: 'Feature',
      id: `${locations.value ? locations.value.features.length + 1 : -1}`,
      geometry: {
        type: 'Point',
        coordinates: (coordinates ? coordinates : []) as [number, number],
      },
      properties: {
        name: '',
        description: '',
        address: '',
        phone: '',
      },
    };
  }

  function setSelectedLocation(selection: GeoJSON) {
    if (!isEditing.value) {
      selectedLocation.value = { ...selection };
    }
  }

  function saveNewPoint(properties: LocationProperties) {
    newPoint = { ...newPoint, properties };
    locations.value = {
      ...locations.value,
      features: [
        ...(locations.value?.features as GeoJSON[]),
        newPoint as GeoJSON,
      ],
    };
    isEditing.value = false;
    nextTick(() => setSelectedLocation(newPoint as GeoJSON));
  }
</script>
<style></style>
