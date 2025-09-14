<template>
  <div class="flex h-screen bg-[#F4F5F9]">
    <Sidebar />
<main class="flex-1 p-6 overflow-y-auto">
  <Header />
  <!-- Title -->
  <div class="flex items-center justify-between mb-6 w-full">
    <h1 class="text-2xl font-bold text-blue-500">Screen Details</h1>
  </div>
    <!-- Screen Info (نقلناها فوق الكراسي) -->
<div class="flex justify-start mb-8 w-full">
  <div v-if="screen" class="bg-white rounded-2xl shadow-lg p-6 w-full ">
<!-- Header -->
<div class="flex items-center justify-between mb-4">
  <h2 class="text-2xl font-bold text-gray-800">{{ screen.name }}</h2>
  <div class="flex items-center gap-3">
    <!-- زرار Show Times -->
    <router-link
      :to="`/screens/${screen.id}/showtimes`"
      class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition cursor-pointer"
    >
      Show Times
    </router-link>
    <span
      class="px-3 py-1 rounded-full text-sm font-semibold"
      :class="screen._active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
    >
      {{ screen._active ? 'Active' : 'Inactive' }}
    </span>
  </div>
</div>
    <!-- Details Grid -->
    <div class="flex justify-between gap-4">
            <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
        <p class="text-gray-700"><span class="font-semibold">Theater:</span> {{ screen.theater }}</p>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3h12v2H4V3zM4 7h12v2H4V7zm0 4h12v2H4v-2zm0 4h12v2H4v-2z"/></svg>
        <p class="text-gray-700"><span class="font-semibold">Type:</span> {{ screen.screenType }}</p>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v14H3V3zm2 2v10h10V5H5z"/></svg>
        <p class="text-gray-700"><span class="font-semibold">Total Seats:</span> {{ screen.totalSeats }}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 relative justify-between mt-6">
<div class="flex flex-wrap gap-3 items-center">
  <h1 class="text-lg font-semibold text-gray-800">Seat Types</h1>
  <!-- هنا أنواع المقاعد -->
  <div
    v-for="type in seatTypes"
    :key="type.id"
    class="relative group px-2 py-1.5 rounded-lg text-sm font-medium shadow-sm text-center text-white transition"
    :class="{
      'bg-gray-400 hover:bg-gray-500': type.name.toLowerCase() === 'normal',
      'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700': type.name.toLowerCase() === 'vip',
      'bg-red-500 hover:bg-red-600': type.name.toLowerCase() === 'premium',
      'bg-blue-400 hover:bg-blue-500': type.name.toLowerCase() !== 'normal' && type.name.toLowerCase() !== 'vip' && type.name.toLowerCase() !== 'premium'
    }"
  >
    <button
      @click.stop="confirmDeleteType(type.id)"
      class="absolute -top-2 -right-2 bg-red-600 cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      ✕
    </button>
    {{ type.name }}
  </div>
</div>
          <button
    class="ml-4 px-3 py-1.5 bg-blue-500 cursor-pointer text-white text-sm rounded-lg hover:bg-blue-600 transition"
    @click="openAddTypeModal"
  >
    + Add Type
  </button>
</div>
  <!-- Modal -->
<div
  v-if="showAddTypeModal"
  class="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
>
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-8 h-8" />
        <div>
          <h3 class="text-lg font-bold text-gray-800">Add Seat Type</h3>
          <p class="text-sm text-gray-500">Fill the details to create a new seat type</p>
        </div>
      </div>
      <button
        @click="closeAddTypeModal"
        class="w-8 h-8 flex items-center  cursor-pointer justify-center text-gray-500 hover:text-gray-700 hover:bg-red-100 rounded-full transition"
      >
        ✕
      </button>
    </div>
    <!-- Body -->
    <div class="p-6 flex flex-col gap-4">
      <input
        v-model="newType.name"
        type="text"
        placeholder="Name"
        class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        v-model="newType.priceMultiplier"
        type="number"
        step="0.1"
        placeholder="Price Multiplier"
        class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <textarea
        v-model="newType.description"
        placeholder="Description"
        class="border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
        rows="3"
      ></textarea>
      <label class="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" v-model="newType.is_active" class="rounded text-blue-500" />
        Active
      </label>
    </div>
    <!-- Footer -->
    <div class="flex justify-end gap-2 px-6 py-4 bg-gray-50">
      <button
        class="px-4 py-2  cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        @click="saveSeatType"
      >
        Save
      </button>
    </div>
  </div>
</div>
  </div>
</div>
      <!-- Screen Layout -->
<section class="bg-white rounded-2xl shadow-lg p-6 w-full">
  <!-- Seat layout wrapper -->
  <div class="overflow-x-auto w-full no-scrollbar">
    <div class="flex justify-center">
      <div class="bg-white shadow-md rounded-xl p-4 sm:p-6">
        <!-- Column Numbers -->
        <div
          class="grid grid-cols-[auto_repeat(17,1fr)_auto] gap-1 sm:gap-2 mb-3 text-center text-xs sm:text-sm font-semibold text-gray-700"
        >
          <div></div> <!-- Empty for left row letter -->
          <div v-for="col in cols" :key="'col-' + col">{{ col }}</div>
          <div></div> <!-- Empty for right row letter -->
        </div>
        <!-- Rows + Seats -->
        <div class="grid gap-2">
          <div
            v-for="row in rows"
            :key="row"
            class="grid grid-cols-[auto_repeat(17,1fr)_auto] items-center gap-1 sm:gap-2"
          >
            <!-- Left row letter -->
            <div class="text-xs sm:text-sm font-medium text-gray-600 text-center">
              {{ row }}
            </div>
            <!-- Seats -->
            <div
              v-for="col in cols"
              :key="col"
              class="relative w-full h-8 sm:h-12 flex items-center justify-center"
            >
              <!-- Empty seat (add new) -->
              <div
                v-if="!getSeat(row, col)"
                class="cursor-pointer w-full h-full flex items-center justify-center"
                @click="openAddSeatModal(row, col)"
              >
                <img
                  src="/img/chair.png"
                  class="w-full h-full object-contain opacity-10 hover:opacity-40 transition"
                  title="Add new seat"
                />
              </div>
              <!-- Existing seat -->
<div v-else class="w-full h-full">
  <img
    src="/img/chair.png"
    class="w-full h-full object-contain cursor-pointer transition hover:scale-105"
    :class="[
      !getSeat(row,col)._available ? 'filter grayscale opacity-30' : '',
      getSeatClass(getSeat(row,col).seatType)
    ]"
    @click="openDeleteSeatModal(getSeat(row,col))"
  />
</div>
            </div>
            <!-- Right row letter -->
            <div class="text-xs sm:text-sm font-medium text-gray-600 text-center">
              {{ row }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <!-- Screen Info -->
      <div class="flex justify-center flex-col gap-8 mt-8">
        <!-- Existing Seats List -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-2">Active Seats:</h3>
          <div class="grid grid-cols-17 gap-2">
            <div
              v-for="seat in seats"
              :key="seat.id"
              class="p-2 text-center rounded border"
              :class="seat._available ? 'bg-green-100' : 'bg-red-100'"
            >
              {{ seat.rowNumber }}{{ seat.seatNumber }}
            </div>
          </div>
        </div>
      </div>
<!-- Modal for Adding Seat -->
<div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
  <div class="bg-white rounded-xl shadow-2xl w-full max-w-[600px] p-6 relative">
    <!-- زرار الإغلاق -->
    <button
      @click="closeModal"
      class="absolute top-4 right-4 font-bold text-xl cursor-pointer text-black hover:text-gray-700 hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center transition"
    >
      ✕
    </button>
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6 border-b pb-3">
      <img src="/logo.png" alt="Logo" class="w-10 h-10" />
      <div>
        <h2 class="text-xl font-bold text-gray-800">Select Seat Type</h2>
        <p class="text-sm text-gray-500">Choose the seat type for this position</p>
      </div>
    </div>
<!-- Seat Types (كروت تذاكر) -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div
    v-for="type in seatTypes"
    :key="type.id"
    class="relative flex flex-col px-5 py-4 rounded-lg cursor-pointer transition transform hover:scale-105 shadow-md"
    :class="{
      // Normal → فاتح نخلي النص غامق
      'bg-gray-200 border-l-4 border-gray-500 text-gray-800': type.name.toLowerCase() === 'normal',
      // VIP → أصفر جريديانت نخلي النص أبيض مع شادو بسيط
      'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-l-4 border-yellow-700 shadow-lg': type.name.toLowerCase() === 'vip',
      // Premium → أحمر غامق نخلي النص أبيض
      'bg-red-500 text-white border-l-4 border-red-700 shadow-lg': type.name.toLowerCase() === 'premium',
      // أي نوع جديد → أزرق مع نص أبيض
      'bg-blue-500 text-white border-l-4 border-blue-700 shadow-lg':
        type.name.toLowerCase() !== 'normal' &&
        type.name.toLowerCase() !== 'vip' &&
        type.name.toLowerCase() !== 'premium'
    }"
    @click="addSeat(selectedRow, selectedCol, type.id)"
  >
    <!-- شكل قص التذكرة -->
    <div class="absolute top-1/2 -left-2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
    <div class="absolute top-1/2 -right-2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
    <!-- محتوى البطاقة -->
    <span class="text-lg font-bold drop-shadow">{{ type.name }}</span>
    <span class="text-sm opacity-90">x{{ type.priceMultiplier }}</span>
    <p v-if="type.description" class="text-xs mt-1 opacity-80">{{ type.description }}</p>
  </div>
</div>
  </div>
</div>
      <!-- Modal for Delete Seat -->
<div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  <div class="bg-white rounded-lg p-6 w-80">
    <h3 class="text-lg font-semibold mb-4">Delete Seat</h3>
    <p>Do you want to delete seat {{ seatToDelete?.rowNumber }}{{ seatToDelete?.seatNumber }}?</p>
    <div class="mt-4 flex justify-start gap-2">
            <button class="px-4 py-2 bg-red-500 text-white rounded  cursor-pointer" @click="confirmDeleteSeat">Yes</button>
      <button class="px-4 py-2 bg-gray-300 rounded  cursor-pointer" @click="closeDeleteModal">No</button>
    </div>
  </div>
</div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar.vue";
import Header from "../../components/Header.vue";
import { getSeatsByScreenId, getSeatTypes, addSeatType,  deleteSeatType  } from "../../services/seats.js";
import api from "../../services/axios";
const confirmDeleteType = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will delete the seat type permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
    confirmButtonColor: "#e3342f",
    cancelButtonColor: "#6c757d",
  });
  if (result.isConfirmed) {
    try {
      await deleteSeatType(id);
      await loadSeatTypes(); // refresh list
      Swal.fire("Deleted!", "Seat type has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting seat type:", err);
      Swal.fire("Error", "Failed to delete seat type", "error");
    }
  }
};
// Screen info
const screen = ref({
  _active: true,
  createdDate: "2025-09-10T23:39:14.724032",
  id: 2,
  lastModifiedDate: null,
  name: "Hall 1",
  screenType: "Front_Screen",
  totalSeats: 87,
  theater: "Mall Egypt",
});
// Seats & layout
const seats = ref([]);
const rows = ['A','B','C','D','E'];
const cols = 17;
// Admin clicked seats
const clickedSeats = ref([]);
// Modal state
const showModal = ref(false);
const selectedRow = ref(null);
const selectedCol = ref(null);
// Seat types
const seatTypes = ref([]);
const loadingTypes = ref(true);
const errorTypes = ref(null);
// Fetch seats for screen
onMounted(async () => {
  try {
    const response = await getSeatsByScreenId(screen.value.id);
    seats.value = response.data;
  } catch (err) {
    console.error("Error fetching seats:", err);
  }
  // Fetch seat types
  try {
    const res = await getSeatTypes();
    seatTypes.value = res.data;
  } catch (err) {
    errorTypes.value = err.message;
  } finally {
    loadingTypes.value = false;
  }
});
// Helper: get seat object by row/col
const getSeat = (row, col) => seats.value.find(s => s.rowNumber === row && s.seatNumber === col);
// Open modal to add seat
const openAddSeatModal = (row, col) => {
  selectedRow.value = row;
  selectedCol.value = col;
  showModal.value = true;
};
// Close modal
const closeModal = () => {
  showModal.value = false;
  selectedRow.value = null;
  selectedCol.value = null;
};
// Add seat API
const addSeat = async (row, col, seatTypeId) => {
  try {
    await api.post('/theater/add-screen-seat', {
      rowNumber: row,
      seatNumber: col,
      seatTypeId,
      screenId: screen.value.id,
      is_available: true,
      is_accessible: true
    });
    // Refresh seats list
    const response = await getSeatsByScreenId(screen.value.id);
    seats.value = response.data;
    closeModal();
  } catch (err) {
    console.error("Error adding seat:", err);
  }
};
import { deleteSeat } from "../../services/seats.js";
const showDeleteModal = ref(false);
const seatToDelete = ref(null);
const openDeleteSeatModal = (seat) => {
  seatToDelete.value = seat;
  showDeleteModal.value = true;
};
const closeDeleteModal = () => {
  seatToDelete.value = null;
  showDeleteModal.value = false;
};
const confirmDeleteSeat = async () => {
  if (!seatToDelete.value) return;
  try {
    await deleteSeat(seatToDelete.value.id);
    // Refresh seats list
    const response = await getSeatsByScreenId(screen.value.id);
    seats.value = response.data;
  } catch (err) {
    console.error("Error deleting seat:", err);
  } finally {
    closeDeleteModal();
  }
};
const showAddTypeModal = ref(false);
const newType = ref({
  name: "",
  priceMultiplier: 0.1,
  description: "",
  is_active: true,
});
// Fetch seat types
const loadSeatTypes = async () => {
  try {
    const res = await getSeatTypes();
    seatTypes.value = res.data;
  } catch (err) {
    console.error("Error fetching seat types:", err);
  }
};
loadSeatTypes();
// Open/close modal
const openAddTypeModal = () => {
  newType.value = {
    name: "",
    priceMultiplier: 0.1,
    description: "",
    is_active: true,
  };
  showAddTypeModal.value = true;
};
const closeAddTypeModal = () => {
  showAddTypeModal.value = false;
};
// Save new seat type
const saveSeatType = async () => {
  try {
    await addSeatType(newType.value);
    await loadSeatTypes(); // refresh
    closeAddTypeModal();
  } catch (err) {
    console.error("Error adding seat type:", err);
  }
};
// helper: رجع كلاس حسب seatType (اللي جاي من API)
const getSeatClass = (seatType) => {
  if (!seatType) return "";
  switch (seatType.name.toLowerCase()) {
    case "normal":
      return "bg-gray-200 p-1 rounded";
    case "vip":
      return "bg-yellow-200  p-1 rounded shadow-md";
    case "premium":
      return "bg-red-200 p-1 rounded shadow-md";
    default:
      return "bg-blue-200 p-1 rounded shadow-md";
  }
};
</script>
