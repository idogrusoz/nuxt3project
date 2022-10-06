<template>
  <div
    :id="location.id"
    class="py-5 px-4 border border-collapse cursor-pointer"
    :class="[{ 'bg-zinc-300': isSelected, 'hover:bg-zinc-100': !isSelected }]"
    @click.prevent="$emit('selectLocation', location)"
  >
    <p class="text-base font-bold leading-normal">
      <i class="ri-admin-fill ri-2x"></i>{{ location.properties.name }}
    </p>
    <p class="text-sm font-light mt-1">
      {{ location.properties.description }}
    </p>
    <p class="text-sm font-light mt-1">
      <span class="text-gray-500">Address:</span>
      {{ location.properties.address }}
    </p>
    <p class="text-sm font-light mt-1">
      <span class="text-gray-500">Phone:</span>
      {{ location.properties.phone }}
    </p>
  </div>
</template>
<script setup lang="ts">
  import { GeoJSON } from '~~/types/location';
  const props = defineProps<{
    location: GeoJSON;
    selectedLocation: GeoJSON | null;
  }>();

  const isSelected = computed((): boolean => {
    return props.selectedLocation === null
      ? false
      : props.selectedLocation.id === props.location.id;
  });

  watch(isSelected, (newValue) => {
    newValue && scroolIntoView();
  });

  function scroolIntoView() {
    const element = document.getElementById(props.location.id!);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>
<style></style>
