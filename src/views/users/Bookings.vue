<template>
  <div class="bg-[#14111D] text-white font-sans p-4 min-h-screen">
    <Header></Header>
    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-purple-400">My Bookings</h1>
      <button
        @click="fetchBookings"
        class="mb-6 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
      >
        Refresh Bookings
      </button>
      <div v-if="loading" class="text-gray-400 text-center text-lg">Loading bookings...</div>
      <div v-else-if="bookings.length === 0" class="text-gray-400 text-center text-lg">No bookings found.</div>
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- الهيدر مع زرار الديليت -->
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-600">
            <p class="text-lg font-bold text-purple-400">#{{ booking.bookingReference }}</p>
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  booking.bookingStatus === 'Confirmed' ? 'bg-green-600' : 'bg-red-600'
                ]"
              >
                {{ booking.bookingStatus }}
              </span>
              <!-- زرار الحذف -->
              <button
                @click="handleDelete(bookings.id)"
                class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-xs font-bold text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
          <!-- تفاصيل الحجز -->
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-white mb-1">{{ booking.showtime.movie.title }}</h3>
            <div class="flex items-center text-gray-400">
              <svg class="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5h8v8H6V7z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <p>{{ booking.showtime.showDate }} at {{ booking.showtime.showTime }}</p>
            </div>
            <div class="flex items-center text-gray-400">
              <svg class="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168a1 1 0 00-.622 1.488l3.496 2.333a1 1 0 000-1.777l-3.496-2.333a1 1 0 00-.622-.044z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <p>Screen: {{ booking.showtime.screen.name }}</p>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-gray-600 flex justify-between items-center">
            <p class="font-bold text-gray-200">Total Amount:</p>
            <span class="text-xl font-bold text-purple-400">${{ booking.totalAmount }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getBookingsByUser, deleteBooking } from "../../services/booking";
import Header from "../../components/main/MainHeader.vue";
const userId = ref(205); // ممكن تجيبه من الـ store أو auth
const bookings = ref([]);
const loading = ref(false);
// دالة لجلب الحجوزات
const fetchBookings = async () => {
  loading.value = true;
  try {
    const response = await getBookingsByUser(userId.value);
    bookings.value = response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  } finally {
    loading.value = false;
  }
};
// دالة الحذف
const handleDelete = async (bookingId) => {
  if (!confirm("Are you sure you want to delete this booking?")) return;
  try {
    await deleteBooking(bookingId);
    // بعد الحذف اعمل refresh
    await fetchBookings();
  } catch (error) {
    console.error("Failed to delete booking:", error);
  }
};
onMounted(() => {
  fetchBookings();
});
</script>
