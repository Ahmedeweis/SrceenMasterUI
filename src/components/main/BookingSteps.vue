<template>
 <div class="flex items-center justify-between py-3 px-6  border-b border-[#2d1f47]">
    <!-- Logo & Title -->
    <div class="flex items-center gap-3">
      <img src="/public/logo.png" class="w-12 h-12 object-contain" alt="Logo" />
      <h1
        class="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Screen Master
      </h1>
    </div>
    <!-- Steps -->
    <div class="flex items-center justify-center space-x-4">
<div v-for="(step, index) in steps" :key="index" class="flex items-center mr-0">
  <div class="text-center flex items-center flex-col">
    <img
      :src="step.icon"
      class="w-10 h-10 object-cover rounded-lg"
      :alt="step.label"
      :class="isActive(index) ? 'opacity-100' : 'opacity-30 grayscale'"
    />
    <h2  class="text-sm mt-2 font-bold">
      {{ step.label }}
    </h2>
  </div>
  <!-- Arrow -->
  <div v-if="index < steps.length - 1">
    <img src="../../assets/imgs/Book/right-arrow.png" class="w-6 h-6 object-cover mx-6" alt="Arrow Right" />
  </div>
</div>
    </div>
   <div class=" w-1/5 text-lg font-bold text-purple-400">
   Movie Name : <span class="text-white">{{ movieTitle || "Movie" }}</span>
</div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const props = defineProps({
    movieTitle: String,
  title: {
    type: String,
    default: "Select Cinema",
  },
  steps: {
    type: Array,
    default: () => [
      { label: "Theater", icon: "img/theater.png", route: "/chooseCinma" },
      { label: "Chair", icon: "img/chairr.png", route: "/chooseChair" },
      { label: "Food", icon: "img/fries.png", route: "/chooseFood" },
      { label: "Payment", icon: "img/card.png", route: "/choosePayment" },
    ],
  },
})
/** نحدد index للـ step الحالي */
const currentStepIndex = computed(() =>
  props.steps.findIndex((s) => s.route === route.path)
)
/** نشوف لو الـ step ≤ المرحلة الحالية */
const isActive = (index) => index <= currentStepIndex.value
</script>
