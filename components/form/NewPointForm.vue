<template>
  <div class="flex justify-center p-10">
    <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block tracking-wide text-gray-700 text-xs mb-2"
            for="name-input"
          >
            Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            v-model="locationProperties.name"
            id="name-input"
            type="text"
            placeholder="Name of the POI"
            maxlength="100"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block tracking-wide text-gray-700 text-xs mb-2"
            for="description-input"
          >
            Description
          </label>
          <input
            v-model="locationProperties.description"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description-input"
            type="text"
            placeholder="Brief description"
            maxlength="200"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3">
          <label
            class="block tracking-wide text-gray-700 text-xs mb-2"
            for="address-input"
          >
            Address
          </label>
          <input
            v-model="locationProperties.address"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="address-input"
            type="text"
            placeholder="Address"
            maxlength="200"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label
            class="block tracking-wide text-gray-700 text-xs mb-2"
            for="phone-input"
          >
            Phone
          </label>
          <input
            v-model="locationProperties.phone"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="phone-input"
            type="text"
            placeholder="+32(***)*******"
          />
        </div>
      </div>
      <div class="flex justify-between w-full">
        <button
          type="button"
          @click="handleCancel"
          class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSave"
          class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-500 font-medium text-xs rounded leading-tight hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LocationProperties } from '../../types/location';
  const initialProperties: LocationProperties = {
    name: '',
    description: '',
    address: '',
    phone: '',
  };

  const locationProperties = ref<LocationProperties>(initialProperties);

  const emit = defineEmits<{
    (e: 'updateEditMode', editing: boolean): void;
    (e: 'saveNewLocationProperties', properties: LocationProperties): void;
  }>();

  function handleCancel() {
    emit('updateEditMode', false);
    clearProperties();
  }

  function clearProperties() {
    locationProperties.value = initialProperties;
  }

  function handleSave() {
    emit('saveNewLocationProperties', locationProperties.value);
    clearProperties();
  }
</script>

<style></style>
