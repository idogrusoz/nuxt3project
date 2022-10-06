<template>
  <div
    v-if="locations && locations.length > 0"
    class="max-h-screen overflow-y-scroll"
  >
    <div
      v-for="location in locations"
      :key="location.id"
    >
      <ListItem
        :location="location"
        :selected-location="selectedLocation"
        @select-location="(id) => $emit('selectLocation', id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GeoJSON } from '~~/types/location';

  const props = defineProps<{
    locations: GeoJSON[];
    selectedLocation: GeoJSON | null;
  }>();
</script>
<style></style>
