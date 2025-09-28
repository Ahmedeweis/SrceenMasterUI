<template>
  <div class="flex h-screen bg-[#F4F5F9]">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <Header />
      <!-- Screens Section -->
      <div >
        <div class="flex items-center justify-between mb-6 w-full">
          <h2 class="text-xl font-bold text-blue-500">
            Screens for {{ getTheaterName(selectedTheaterId) }}
          </h2>
<AddScreenModal
  :selectedTheaterId="selectedTheaterId"
  @screenAdded="() => {
    if (selectedTheaterId) {
      selectTheater(selectedTheaterId);
    } else {
      fetchScreens();
    }
  }"
/>
        </div>
      </div>
<!-- Theaters Section -->
<h1 class="text-2xl font-bold text-blue-500 mb-4">Theaters</h1>
<div class="overflow-x-auto bg-white rounded-lg shadow">
<!-- جدول الـ Theaters -->
<table class="min-w-full text-sm text-left text-gray-600">
<thead class="bg-gray-100 text-gray-800 text-sm font-semibold">
  <tr>
    <th class="px-6 py-3"></th>
    <th class="px-6 py-3">Name</th>
    <th class="px-6 py-3">Image</th>
    <!-- <th class="px-6 py-3">ID</th> -->
    <th class="px-6 py-3">City</th>
    <th class="px-6 py-3">Address</th>
    <th class="px-6 py-3">Created</th>
    <th class="px-6 py-3">Active</th>
    <th class="px-6 py-3 text-right">Action</th>
  </tr>
</thead>
<tbody>
  <!-- صفوف Theaters -->
  <template v-for="(theater, index) in theaters" :key="theater.id">
    <tr
      @click="selectTheater(theater.id)"
      class=" cursor-pointer transition"
      :class="selectedTheaterId === theater.id ? 'bg-blue-50' : ''"
    >
      <td class="px-6 py-4 font-medium">{{ index + 1 }}</td>
      <td class="px-6 py-4 font-semibold text-gray-900">{{ theater.name }}</td>
      <td class="px-6 py-4">
        <img
          :src="theater.image"
          alt="Theater"
          class="w-16 h-12 object-cover rounded-md shadow-sm"
        />
      </td>
            <!-- <td class="px-6 py-4">{{ theater.id }}</td> -->
      <td class="px-6 py-4">{{ theater.city }}</td>
      <td class="px-6 py-4">{{ theater.address }}</td>
      <td class="px-6 py-4">{{ new Date(theater.createdDate).toLocaleDateString() }}</td>
<td class="px-6 py-4">
  <span
    v-if="theater._active"
    class="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md"
  >
    Yes
  </span>
  <span
    v-else
    class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md"
  >
    No
  </span>
</td>
<td class="px-6 py-4 text-right flex justify-end">
  <button
    @click.stop="selectTheater(theater.id)"
    class=" flex items-center justify-end  text-4xl text-blue-500  font-bold  transition"
  >
    <span class="text-right cursor-pointer" v-if="selectedTheaterId === theater.id">−</span>
    <span v-else class="text-right cursor-pointer">+</span>
  </button>
</td>
    </tr>
    <!-- شوف هنا: الصف التاني جوه نفس التمبليت -->
    <tr class="w-full" v-if="selectedTheaterId === theater.id">
<td colspan="5" class="bg-gray-50 pl-10 w-full">
<div class="p-4 w-full">
  <h3 class="font-bold text-gray-700 mb-2">Screens</h3>
  <table class=" text-sm text-left text-gray-600 w-full">
    <thead class="bg-gray-100 text-gray-800 text-xs font-semibold">
      <tr>
        <th class="px-4 py-2"></th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Type</th>
        <th class="px-4 py-2">Total Seats</th>
        <!-- <th class="px-4 py-2">ID</th> -->
        <th class="px-4 py-2 text-right">Active</th>
        <th class="px-4 py-2 text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(screen, sIndex) in filteredScreens"
        :key="screen.id"
        class=" transition"
      >
        <td class="px-4 py-2">{{ sIndex + 1 }}</td>
<td class="px-4 py-2 font-semibold text-blue-600 hover:underline cursor-pointer">
  <router-link :to="`/seats/${screen.id}`">
    {{ screen.name }}
  </router-link>
</td>
        <td class="px-4 py-2">{{ screen.screenType }}</td>
        <td class="px-4 py-2">{{ screen.totalSeats }}</td>
        <!-- <td class="px-4 py-2">{{ screen.id }}</td> -->
        <td class="px-4 py-2 text-right">
          <span
            v-if="screen._active"
            class="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md"
          >
            Yes
          </span>
          <span
            v-else
            class="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md"
          >
            No
          </span>
        </td>
        <td class="px-4 py-2 text-right">
<button
  class="px-3 py-1 text-sm rounded-md bg-red-500 cursor-pointer text-white hover:bg-red-600 transition"
  @click.stop="handleDeleteScreen(screen.id)"
>
  Delete
</button>
        </td>
      </tr>
      <tr v-if="!filteredScreens.length">
        <td colspan="7" class="px-4 py-2 text-center text-gray-500 italic">
          No screens found for this theater.
        </td>
      </tr>
    </tbody>
  </table>
</div>
      </td>
    </tr>
  </template>
</tbody>
</table>
</div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted,computed } from "vue";
import Sidebar from "../../components/Sidebar.vue";
import Header from "../../components/Header.vue";
import AddScreenModal from "../../components/Screens/AddScreen.vue";
import ScreenService from "../../services/screen.js";
import TheaterService from "../../services/Theater.js";
import Swal from "sweetalert2";
const theaters = ref([]);
const screens = ref([]);
const selectedTheaterId = ref(null);
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
const fetchScreens = async () => {
  try {
    const response = await ScreenService.getScreens();
    screens.value = response.data.map((screen) => ({
      ...screen,
      image: `/img/Screen/${screen.id}.png`
    }));
  } catch (error) {
    console.error("Error fetching screens:", error);
  }
};
// Get theater name
const getTheaterName = (id) => {
  const t = theaters.value.find((th) => th.id === id);
  return t ? t.name : "";
};
const filteredScreens = ref([]);
const selectTheater = async (id) => {
  // لو المسرح المفتوح هو نفس اللي دوست عليه → اقفله
  if (selectedTheaterId.value === id) {
    selectedTheaterId.value = null;
    filteredScreens.value = [];
    return;
  }
  // غير كده → افتح المسرح
  selectedTheaterId.value = id;
  try {
    const response = await ScreenService.getScreensByTheater(id);
    filteredScreens.value = response.data.map((screen) => ({
      ...screen,
      image: `/img/Screen/${screen.id}.png`
    }));
  } catch (error) {
    console.error("Error fetching screens for theater:", error);
    filteredScreens.value = [];
  }
};
const handleDeleteScreen = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This screen will be deleted permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6", // لون زرار Yes
    cancelButtonColor: "#d33",     // لون زرار No
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await ScreenService.deleteScreen(id);
        // تحديث الجدول
        filteredScreens.value = filteredScreens.value.filter(
          (screen) => screen.id !== id
        );
        // Toast Success
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Screen deleted successfully",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error deleting screen:", error);
        // Toast Error
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Error deleting screen",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
  });
};
onMounted(() => {
  fetchTheaters();
  fetchScreens();
});
</script>
