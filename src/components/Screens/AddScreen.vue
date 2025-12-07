<template>
  <div>
    <slot name="trigger">
      <button
        @click="openModal"
        class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
      >
        Add Screen
      </button>
    </slot>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-[999] p-6 bg-black/40 backdrop-blur-sm"
    >
<div
  class="bg-white rounded-lg shadow-xl w-full max-w-[800px] p-6 relative overflow-auto"
>
  <!-- Close button -->
  <button
    @click="closeModal"
    class="absolute top-4 right-4 font-bold text-xl cursor-pointer text-black hover:text-gray-700 hover:bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center transition"
  >
    ✕
  </button>
        <!-- Header -->
        <div class="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" class="w-8 h-8" />
          <span class="text-xl font-bold text-black">Screen Master</span>
        </div>
        <h2 class="text-2xl font-semibold mb-2 text-black">Add Screen</h2>
        <p class="text-gray-700 mb-2">Fill in all information of the <span class="text-blue-600 font-bold">Screen</span> for better movie experiences.</p>
  <!-- Form -->
  <div class="space-y-6">
    <!-- Row 1 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-gray-700 font-medium mb-1">Screen Name</label>
        <input
          type="text"
          v-model="screen.name"
          placeholder="Enter Screen Name"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
<label class="block text-gray-700 font-medium mb-1">Screen Type</label>
<select
  v-model="screen.screenType"
  class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>Select Type</option>
  <option value="Front_Screen">Front Screen</option>
  <option value="Screen_3D">3D</option>
  <option value="Rear_Projection">Rear Projection</option>
</select>
      </div>
    </div>
    <!-- Row 2 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-gray-700 font-medium mb-1">Total Seats</label>
<input
  type="number"
  v-model="screen.totalSeats"
  placeholder="Enter total seats"
  class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinners"
/>
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-1">Select Theater</label>
<select
  v-model="screen.theaterId"
  class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <!-- Default option -->
  <option :value="null" disabled>Select Theater</option>
  <!-- Theaters list -->
  <option
    v-for="theater in theaters"
    :key="theater.id"
    :value="theater.id"
  >
    {{ theater.name }}
  </option>
</select>
      </div>
    </div>
    <!-- Row 3 (Active Checkbox) -->
    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="screen.is_active" id="isActive" class="w-4 h-4" />
      <label for="isActive" class="text-gray-700 font-medium">Active</label>
    </div>
    <!-- Row 4 (Add button) -->
    <div class="flex justify-end">
      <button
        @click="submitForm"
        :disabled="isLoading"
        class="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
      >
        {{ isLoading ? "Processing..." : "Add" }}
      </button>
    </div>
  </div>
</div>
    </div>
  </div>
</template>
<script setup>
import { ref ,onMounted} from "vue";
import ScreenService from "../../services/screen.js";
import { useToast } from "vue-toastification";
const emit = defineEmits(["screenAdded"]);
const toast = useToast();
const isModalOpen = ref(false);
const isLoading = ref(false);
const screen = ref({
  name: "",
  totalSeats: 0,
  screenType: "",
  theaterId: null,
  is_active: true,
});
const props = defineProps({
  selectedTheaterId: {
    type: Number,
    default: null
  }
});
const openModal = () => {
  isModalOpen.value = true;
  // لما يفتح المودال خليه يختار الـ theater اللي مفتوح
  if (props.selectedTheaterId) {
    screen.value.theaterId = props.selectedTheaterId;
  }
};
const closeModal = () => {
  isModalOpen.value = false;
  screen.value = {
    name: "",
    totalSeats: 0,
    screenType: "",
    theaterId: props.selectedTheaterId || null,
    is_active: true
  };
  isLoading.value = false;
};
const submitForm = async () => {
  if (!screen.value.name || !screen.value.totalSeats || !screen.value.theaterId) {
    toast.error("Please fill in all required fields.");
    return;
  }
  isLoading.value = true;
  try {
    const response = await ScreenService.addScreen(screen.value);
    if (response.status === 200) {
      toast.success("Screen added successfully!");
      emit("screenAdded");
      closeModal();
    } else {
      toast.error("Failed to add screen. Try again.");
    }
  } catch (error) {
    console.error("Error adding screen:", error);
    toast.error("An error occurred. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
import TheaterService from '../../services/Theater.js';
const theaters = ref([]);
const fetchTheaters = async () => {
  try {
    const response = await TheaterService.getTheaters();
    theaters.value = response.data.map((theater) => ({
      ...theater,
      image: `/img/Theater/${theater.id}.png`
    }));
  } catch (error) {
    console.error("Error fetching theaters:", error);
  }
};
onMounted(() => {
  fetchTheaters();
});
</script>
<style scoped>
/* اخفاء الأسهم من input number */
.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinners[type=number] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
