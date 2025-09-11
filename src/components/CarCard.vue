<template>
  <div class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
    <!-- صورة العربية -->
    <img
      :src="car.image"
      :alt="car.name"
      class="w-full object-cover mb-2 rounded-md"
    />
    <!-- سنة -->
    <div class="text-gray-500 text-sm">{{ car.year }}</div>
    <!-- اسم -->
    <h3 class="text-lg font-semibold text-indigo-800">{{ car.name }}</h3>
    <!-- موديل -->
    <div class="text-gray-600 mb-2">{{ car.model }}</div>
    <!-- تفاصيل -->
    <div class="flex flex-wrap justify-center gap-2 text-gray-400 text-sm mb-2">
      <span>{{ car.type }}</span>
      <span>{{ car.seats }} seats</span>
      <span>{{ car.doors }} doors</span>
      <span>{{ car.luggage }} luggage</span>
    </div>
    <!-- زر -->
    <button
      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mt-auto transition"
    >
      Rent Now
    </button>
    <!-- السعر -->
    <div class="text-indigo-600 font-bold mt-2">
      ${{ car.price }}/day
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  car: {
    type: Object,
    required: true
  }
});
</script>
