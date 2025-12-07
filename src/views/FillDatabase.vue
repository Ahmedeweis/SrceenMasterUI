<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Fill Database / Test Data</h1>
    <!-- Buttons لتشغيل الوظائف المختلفة -->
    <div class="flex flex-col gap-4">
      <button @click="fillTheaters" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Sample Theaters
      </button>
<button @click="fillScreens" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
  Add Sample Screens
</button>
      <!-- <button @click="fillSeats" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Add Seats
      </button> -->
      <!-- <button @click="fillShowtimes" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Add Showtimes
      </button> -->
    </div>
    <div class="mt-6 text-gray-700">
      <p v-if="statusMessage">{{ statusMessage }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import TheaterService from "../services/Theater.js";
import ScreenService from "../services/screen.js";
import { addSeat } from "../services/seats.js";
import { addShowtime } from "../services/showtime.js";
const statusMessage = ref("");
const sampleTheaters = [
  { name: "Mall Egypt", city: "Cairo", address: "123 Street", _active: true },
  { name: "City Center", city: "Alex", address: "45 Road", _active: true },
];
const fillTheaters = async () => {
  try {
    statusMessage.value = "Adding sample theaters...";
    for (const t of sampleTheaters) {
      await TheaterService.addTheater(t);
    }
    statusMessage.value = "Theaters added successfully!";
  } catch (err) {
    console.error(err);
    statusMessage.value = "Error adding theaters!";
  }
};
// عدد الصفوف والأعمدة للمقاعد
const rows = ['A', 'B', 'C', 'D', 'E'];
const cols = 17;
// المقاعد المخفية وأنواع المقاعد الأخرى (حتى تستخدمها لاحقاً في fillSeats)
const hiddenSeats = ["A1","A2","B1","B2","C3","D3","E3","E5","E8","E10","E12","E16","A15","B15","C15","D15"];
const greySeats = ["D10","E4"];
const fadedSeats = ["E6"];
// أنواع الشاشات
const screenTypes = ["Front_Screen", "Screen_3D", "Rear_Projection"];
const fillScreens = async () => {
  try {
    statusMessage.value = "Adding screens...";
    const theatersRes = await TheaterService.getTheaters();
    const theaters = theatersRes.data;
    if (!theaters || theaters.length === 0) {
      statusMessage.value = "No theaters found. Please add theaters first.";
      return;
    }
    for (const theater of theaters) {
      if (!theater.id) continue;
      const existingScreensRes = await ScreenService.getScreensByTheater(theater.id);
      const existingScreens = existingScreensRes.data || [];
      for (let i = existingScreens.length; i < 5; i++) {
        const typeIndex = i % screenTypes.length; // حماية من تجاوز المصفوفة
        const screenData = {
          name: `Hall ${i + 1}`,
          theaterId: theater.id,
          totalSeats: rows.length * cols, // تأكد أن cols و rows معرفين
          screenType: screenTypes[typeIndex],
          is_active: true
        };
        try {
          const screenRes = await ScreenService.addScreen(screenData);
          console.log("Added screen:", screenRes.data);
        } catch (error) {
          console.error(`Failed to add screen Hall ${i + 1} for theater ${theater.name}:`, error.response?.data || error);
        }
      }
    }
    statusMessage.value = "Screens added successfully!";
  } catch (err) {
    console.error(err);
    statusMessage.value = "Error adding screens!";
  }
};
const fillSeats = async () => {
  try {
    statusMessage.value = "Adding seats...";
    const theatersRes = await TheaterService.getTheaters();
    const theaters = theatersRes.data;
    for (const theater of theaters) {
      const screensRes = await ScreenService.getScreensByTheater(theater.id);
      const screens = screensRes.data;
      for (const screen of screens) {
        for (const row of rows) {
          for (let col = 1; col <= cols; col++) {
            const seatCode = row + col;
            if (hiddenSeats.includes(seatCode)) continue;
            let seatTypeId = 1;
            if (greySeats.includes(seatCode)) seatTypeId = 2;
            if (fadedSeats.includes(seatCode)) seatTypeId = 3;
            await addSeat({
              rowNumber: row,
              seatNumber: col,
              screenId: screen.id,
              seatTypeId,
              is_available: true
            });
          }
        }
      }
    }
    statusMessage.value = "Seats added successfully!";
  } catch (err) {
    console.error(err);
    statusMessage.value = "Error adding seats!";
  }
};
// ثابتات التوقيت
const slots = [
  { label: "12:00 PM", value: "12:00:00" },
  { label: "3:30 PM", value: "15:30:00" },
  { label: "6:45 PM", value: "18:45:00" },
  { label: "10:00 PM", value: "22:00:00" },
  { label: "1:15 AM", value: "01:15:00" },
];
// تحويل string وقت إلى كائن كما يتطلب backend
const parseTimeToObject = (timeStr) => {
  const [hourStr, minuteStr, secondStr] = timeStr.split(":");
  return {
    hour: parseInt(hourStr),
    minute: parseInt(minuteStr),
    second: parseInt(secondStr),
    nano: 0
  };
};
const fillShowtimes = async () => {
  try {
    statusMessage.value = "Adding showtimes...";
    const theatersRes = await TheaterService.getTheaters();
    const theaters = theatersRes.data;
    if (!theaters || theaters.length === 0) {
      statusMessage.value = "No theaters found. Please add theaters first.";
      return;
    }
    for (const theater of theaters) {
      const screensRes = await ScreenService.getScreensByTheater(theater.id);
      const screens = screensRes.data || [];
      for (const screen of screens) {
        // لكل شاشة، أضف جميع الـ slots
        for (const slot of slots) {
          try {
await addShowtime({
  screenId: 1,  // تأكد انه موجود
  movieId: 1,   // تأكد انه موجود
  showDate: "2025-09-13",
  showTime: "12:00:00",
  basePrice: 100,
  status: "SCHEDULED"
});
            console.log(`Added showtime ${slot.label} for screen ${screen.name}`);
          } catch (err) {
            console.error(`Failed to add showtime ${slot.label} for screen ${screen.name}:`, err.response?.data || err);
          }
        }
      }
    }
    statusMessage.value = "Showtimes added successfully!";
  } catch (err) {
    console.error(err);
    statusMessage.value = "Error adding showtimes!";
  }
};
</script>