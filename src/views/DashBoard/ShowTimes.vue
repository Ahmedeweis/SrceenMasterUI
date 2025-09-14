<template>
  <div class="flex h-screen bg-[#F4F5F9]">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <Header />
      <div class="flex flex-col items-start">
        <!-- العنوان -->
        <h1 class="text-2xl font-bold text-blue-600 mb-8">
          Show Times – {{ screen.name }}
        </h1>
        <!-- Tabs للتواريخ -->
        <div class="mb-8 w-full scrollbar-hide px-2">
          <div class="flex gap-4">
            <div v-for="day in weekDays" :key="day.date" @click="selectedDate = day.date"
              class="relative flex flex-col items-center justify-center cursor-pointer min-w-[70px] h-[85px] rounded-b-2xl rounded-t-lg transition-all duration-300 text-gray-600"
              :class="selectedDate === day.date
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 hover:bg-gray-200'
                ">
              <!-- النقاط الجانبية -->
              <span v-if="selectedDate === day.date" class="absolute top-3 w-3 h-3 bg-white rounded-full"
                style="right: -6px"></span>
              <span v-if="selectedDate === day.date" class="absolute top-3 w-3 h-3 bg-white rounded-full"
                style="left: -6px"></span>
              <div class="flex flex-col items-center justify-center">
                <span class="text-sm font-bold">{{ day.dayNumber }}</span>
                <span class="text-xs">{{ day.dayName }}</span>
              </div>
            </div>
          </div>
        </div>
<div class="flex flex-col md:flex-row md:items-center gap-3 mb-6">
  <!-- Select Movie -->
  <label class="text-gray-700 font-semibold md:mr-2">Choose Movie:</label>
  <select
    v-model="selectedMovieForAll"
    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="">Select Movie</option>
    <option v-for="movie in movies" :key="movie.id" :value="movie.id">
      {{ movie.title }}
    </option>
  </select>
  <!-- Fill All Slots Button -->
  <button
    @click="fillAllSlotsWithMovie"
    class="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
  >
    Fill All Slots with Selected Movie
  </button>
</div>
        <!-- Slots grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          <div v-for="slot in slots" :key="slot.label"
            class="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md">
            <!-- الخلفية أو الصورة -->
            <img v-if="getSlotMovie(slot)" :src="getMoviePoster(getSlotMovie(slot))" alt="Poster"
              class="w-full h-full object-cover" />
            <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500 font-bold text-lg">
              {{ slot.label }}
            </div>
            <!-- زر الحذف -->
            <button v-if="getSlotMovie(slot)" @click.stop="deleteSlotShowtime(getSlotMovie(slot).id)"
              class="absolute top-2 right-2 z-30 text-red-500 cursor-pointer hover:text-red-700 font-bold text-2xl px-2 py-0 rounded-full bg-white/50 shadow-lg">
              ×
            </button>
            <!-- زر اختيار الفيلم -->
            <button v-if="!getSlotMovie(slot)" @click="openMovieModal(slot)"
              class="absolute top-2 right-2 z-20 cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-lg">
              Select Movie
            </button>
          </div>
        </div>
        <!-- Modal مركزي -->
        <transition name="fade">
          <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              <h2 class="text-xl font-bold mb-6">
                Select Movie for {{ modalSlot?.label }}
              </h2>
              <!-- Grid الأفلام -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div v-for="movie in movies" :key="movie.id" @click="newShowtime.movieId = movie.id" :class="[
                  'cursor-pointer rounded-lg overflow-hidden shadow-md border-2 transition-all hover:scale-105',
                  newShowtime.movieId === movie.id
                    ? 'border-indigo-600 scale-105'
                    : 'border-transparent',
                ]">
                  <img :src="movie.posterPath
                      ? BASE_IMG_URL + movie.posterPath
                      : posterImg
                    " :alt="movie.title" class="w-full h-48 object-cover" />
                </div>
              </div>
              <div class="flex justify-end gap-3 mt-6">
                <button @click="saveShowtimeForSlot(modalSlot)"
                  class="bg-indigo-600 text-white cursor-pointer px-5 py-2 rounded-xl hover:bg-indigo-700"
                  :disabled="!newShowtime.movieId">
                  Save
                </button>
                <button @click="closeMovieModal"
                  class="bg-gray-300 px-5 py-2 cursor-pointer rounded-xl hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "../../components/Sidebar.vue";
import Header from "../../components/Header.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { getMovies } from "../../services/moviesService";
import { deleteShowtime, addShowtime, getShowtimesByMovie } from "../../services/showtime";
const route = useRoute();
const screenId = route.params.id;
const movies = ref([]);
const showtimes = ref([]);
const selectedDate = ref(new Date().toISOString().split("T")[0]);
const selectedSlot = ref(null);
const newShowtime = ref({
  movieId: "",
  basePrice: 100,
  showDate: selectedDate.value,
  showTime: "12:00:00",
  status: "SCHEDULED",
});
// Generate week days
const weekDays = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    date: d.toISOString().split("T")[0], // 2025-09-13
    dayNumber: d.getDate(), // 13
    dayName: d.toLocaleDateString("en-US", { weekday: "short" }) // Sat, Sun
  };
});
// Fixed slots
const slots = ref([
  { label: "12:00 PM", value: "12:00:00" },
  { label: "3:30 PM", value: "15:30:00" },
  { label: "6:45 PM", value: "18:45:00" },
  { label: "10:00 PM", value: "22:00:00" },
  { label: "1:15 AM", value: "01:15:00" },
]);
// Check if slot is already taken
const isSlotTaken = (slot) => {
  return showtimes.value.some(
    (s) =>
      s.showDate === selectedDate.value &&
      s.showTime === slot.value &&
      s.screenId === parseInt(screenId)
  );
};
const saveShowtimeForSlot = async (slot) => {
  if (!newShowtime.value.movieId) {
    Swal.fire("Warning", "Please select a movie!", "warning");
    return;
  }
  // Double-check slot is not taken
  if (isSlotTaken(slot)) {
    Swal.fire("Error", "This slot is already taken!", "error");
    return;
  }
  try {
    await addShowtime({
      ...newShowtime.value,
      screenId: parseInt(screenId),
      movieId: newShowtime.value.movieId, // Already number
    });
    Swal.fire("Success", "Showtime added successfully!", "success");
    selectedSlot.value = null;
    newShowtime.value.movieId = ""; // Reset movieId after saving
    newShowtime.value.showTime = "12:00:00"; // Reset showTime
    newShowtime.value.showDate = selectedDate.value; // Reset showDate
    await fetchAllShowtimes(); // Refresh list
    closeMovieModal(); // Close modal after saving
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to save showtime", "error");
  }
};
// Fetch movies & their showtimes
const fetchAllShowtimes = async () => {
  try {
    showtimes.value = [];
    for (const movie of movies.value) {
      const res = await getShowtimesByMovie(movie.id);
      const movieShowtimes = res.data || res;
      showtimes.value.push(...movieShowtimes);
    }
  } catch (err) {
    console.error("Error fetching showtimes:", err);
  }
};
onMounted(async () => {
  const res = await getMovies({ page: 0, size: 5, adult: false });
  movies.value = res.content || res;
  await fetchAllShowtimes();
});
// Helpers
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
const posterImg = "/placeholder-poster.png";
const getMoviePoster = (slotMovie) => {
  if (!slotMovie?.movie) return posterImg;
  return slotMovie.movie.posterPath ? BASE_IMG_URL + slotMovie.movie.posterPath : posterImg;
};
const screen = ref({
  _active: true,
  createdDate: "2025-09-10T23:39:14.724032",
  id: 2,
  name: "Hall 1",
  screenType: "Front_Screen",
  totalSeats: 87,
  theater: "Mall Egypt",
});
const getSlotMovie = (slot) => {
  return showtimes.value.find(
    (s) =>
      s.showDate === selectedDate.value &&
      s.showTime === slot.value &&
      (s.screenId === parseInt(screenId) || s.screen?.id === parseInt(screenId))
  );
};
const deleteSlotShowtime = async (id) => {
  try {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });
    if (confirm.isConfirmed) {
      await deleteShowtime(id);
      Swal.fire("Deleted!", "Showtime has been deleted.", "success");
      await fetchAllShowtimes(); // Refresh data after deletion
    }
  } catch (error) {
    console.error("Error deleting showtime:", error);
    Swal.fire("Error", "Failed to delete showtime", "error");
  }
};
const getMovieTitle = (slotMovie) => {
  return slotMovie?.movie?.originalTitle || "Unknown";
};
const isModalOpen = ref(false);
const modalSlot = ref(null);
const openMovieModal = (slot) => {
  modalSlot.value = slot;
  newShowtime.value.showTime = slot.value;
  newShowtime.value.showDate = selectedDate.value;
  newShowtime.value.movieId = ""; // Ensure movieId is reset
  isModalOpen.value = true;
};
const closeMovieModal = () => {
  isModalOpen.value = false;
  modalSlot.value = null;
  newShowtime.value.movieId = ""; // Reset movieId when closing modal
};
// Handle movie selection
const onMovieSelect = () => {
  if (newShowtime.value.movieId) {
    const selectedMovie = movies.value.find((m) => m.id === parseInt(newShowtime.value.movieId));
    if (selectedMovie) {
      console.log("Selected movie:", selectedMovie.title); // Debugging
    }
  }
};
const selectedMovieForAll = ref(""); // بدل newShowtime.movieId للزرار
const fillAllSlotsWithMovie = async () => {
  if (!selectedMovieForAll.value) {
    Swal.fire("Warning", "Please select a movie first!", "warning");
    return;
  }
  for (const slot of slots.value) {
    if (isSlotTaken(slot)) continue;
    try {
      await addShowtime({
        ...newShowtime.value,
        screenId: parseInt(screenId),
        showTime: slot.value,
        showDate: selectedDate.value,
        movieId: selectedMovieForAll.value,
      });
      await sleep(300);
    } catch (err) {
      console.error(`Failed to add showtime for slot ${slot.label}:`, err);
    }
  }
  Swal.fire("Success", "All slots filled!", "success");
  await fetchAllShowtimes();
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>