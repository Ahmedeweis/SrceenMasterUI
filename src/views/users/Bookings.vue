<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-purple-600">My Bookings</h1>
    <button
      @click="fetchBookings"
      class="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      Refresh Bookings
    </button>
    <div v-if="loading" class="text-gray-500">Loading bookings...</div>
    <div v-else-if="bookings.length === 0" class="text-gray-500">No bookings found.</div>
    <ul v-else class="space-y-4">
      <li
        v-for="booking in bookings"
        :key="booking.id"
        class="border p-4 rounded shadow hover:shadow-lg transition"
      >
        <p><strong>Booking Reference:</strong> {{ booking.bookingReference }}</p>
        <p><strong>Status:</strong> {{ booking.bookingStatus }}</p>
        <p><strong>Payment:</strong> {{ booking.paymentStatus }}</p>
        <p><strong>Showtime:</strong> {{ booking.showtime.showDate }} {{ booking.showtime.showTime }}</p>
        <p><strong>Screen:</strong> {{ booking.showtime.screen.name }}</p>
        <p><strong>Movie:</strong> {{ booking.showtime.movie.title }}</p>
        <p><strong>Total Amount:</strong> ${{ booking.totalAmount }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getBookingsByUser } from "../../services/booking";
const userId = ref(205); // ممكن تجيبه من الـ store أو auth
const bookings = ref([]);
const loading = ref(false);
// دالة قابلة للاستدعاء لجلب الحجوزات
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
</script>
