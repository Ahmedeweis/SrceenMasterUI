<template>
  <div class="relative  text-[#6F3995] font-sans p-4 min-h-screen flex flex-col   ">
    <!-- Header -->
    <BookingSteps title="Select Cinema" @back="$router.back()" />
    <!-- Main content -->
<section class="flex flex-col-reverse lg:flex-row justify-between items-start mt-6 gap-6 pl-6">
  <div class="w-[300px] rounded-xl   overflow-hidden  shadow-[0_0_10px_rgba(0,0,0,0.3)] py-4 ">
       <h1 class="text-2xl font-bold  text-black text-left  p-4  border-b-[3px] border-[#ddd]">Choose Seats</h1>
<div class="flex flex-col  w-full ">
<!-- Location -->
<div class="overflow-hidden px-4 border-b-[3px]  cursor-pointer border-[#ddd] py-4">
  <!-- Header -->
  <div
    class="flex items-center justify-between py-1 cursor-pointer"
    @click="toggleSection('location')"
  >
    <div class="flex items-center gap-3">
      <img src="/img/location.png" alt="Location" class="w-6 h-6" />
      <label class="text-base font-bold text-black">Choose location</label>
    </div>
    <!-- Arrow -->
    <img
      src="/img/arrow-down.png"
      alt="toggle"
      class="transform transition w-[20px] h-[20px]"
      :class="openSections.includes('location') ? 'rotate-180' : ''"
    />
  </div>
  <!-- Content -->
  <div v-show="openSections.includes('location')" class="mt-3">
    <select
      v-model="selectedLocation"
      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 outline-none"
    >
      <option v-for="cinema in cinemas" :key="cinema" :value="cinema">
        {{ cinema }}
      </option>
    </select>
  </div>
</div>
<!-- Date -->
<div class="overflow-hidden px-4 border-b-[3px] border-[#ddd] py-6">
  <div
    class="flex items-center justify-between py-1 cursor-pointer"
    @click="toggleSection('date')"
  >
    <div class="flex items-center gap-3">
      <img src="/img/date.png" alt="Date" class="w-6 h-6" />
      <label class="text-base font-bold text-black">Select Date</label>
    </div>
    <img
      src="/img/arrow-down.png"
      class="transform transition w-[20px] h-[20px]"
      :class="openSections.includes('date') ? 'rotate-180' : ''"
    />
  </div>
  <div v-show="openSections.includes('date')">
    <div class="flex items-center justify-between relative">
      <!-- زر الشمال -->
      <button
        @click="prevDay"
            style="bottom: -30px;  left: 1px;"
        class="absolute  z-10 font-bold text-4xl cursor-pointer text-black py-2 rounded-full"
      >
        ‹
      </button>
<!-- الأيام -->
<div
  ref="daysContainer"
  class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mt-2 p-2 w-full"
>
  <div
    v-for="(day, index) in days"
    :key="day.date"
    @click="selectDay(index)"
    class="relative flex flex-col items-center cursor-pointer rounded-b-2xl rounded-t-lg transition duration-300 min-w-[64px]"
    :class="selectedDate === day.date ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-[#2A3843] text-white/80'"
  >
    <span class="absolute top-3 w-3 h-3 bg-white rounded-full" style="right: -6px;"></span>
    <span class="absolute top-3 w-3 h-3 bg-white rounded-full" style="left: -6px;"></span>
    <div class="w-10 h-19 rounded-xl flex flex-col items-center justify-center">
      <span class="text-sm font-semibold">{{ day.date }}</span>
      <span class="text-xs">{{ day.day }}</span>
    </div>
  </div>
</div>
      <!-- زر اليمين -->
      <button
        @click="nextDay"
         style="bottom: -30px; right: 1px;"
        class="absolute  z-10  font-bold text-4xl cursor-pointer text-black py-2 rounded-full"
      >
        ›
      </button>
    </div>
  </div>
</div>
<!-- Suite -->
<div class="  overflow-hidden px-4 border-b-[3px] border-[#ddd] py-4 ">
  <div
    class="flex items-center justify-between py-1 cursor-pointer"
    @click="toggleSection('suite')"
  >
    <div class="flex items-center gap-3">
      <img src="/img/vip.png" alt="Suite" class="w-6 h-6" />
      <label class="text-base font-bold text-black">Choose suite</label>
    </div>
    <img
      src="/img/arrow-down.png"
      class="transform transition w-[20px] h-[20px]"
      :class="openSections.includes('suite') ? 'rotate-180' : ''"
    />
  </div>
  <div v-show="openSections.includes('suite')" class="  ">
<div class="grid grid-cols-2 gap-4 mt-3">
  <button
    v-for="suite in suites"
    :key="suite"
    @click="selectedSuite = suite"
    class="px-4 py-2 rounded-full text-sm  cursor-pointer font-medium shadow-md transition transform"
    :class="selectedSuite === suite
      ? 'bg-indigo-600 text-white shadow-lg scale-105'
      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg'"
  >
    {{ suite }}
  </button>
</div>
  </div>
</div>
<!-- Showtime -->
<div class="   overflow-hidden px-4 border-b-[3px] border-[#ddd] py-4">
  <div
    class="flex items-center justify-between py-1 cursor-pointer"
    @click="toggleSection('time')"
  >
    <div class="flex items-center gap-3">
      <img src="/img/clock.png" alt="Time" class="w-6 h-6" />
      <label class="text-base font-bold text-black">Available showtime</label>
    </div>
    <img
      src="/img/arrow-down.png"
      class="transform transition w-[20px] h-[20px]"
      :class="openSections.includes('time') ? 'rotate-180' : ''"
    />
  </div>
  <div v-show="openSections.includes('time')" class="  ">
<div class="grid grid-cols-2 gap-4 mt-3">
  <button
    v-for="time in showtimes"
    :key="time"
    @click="selectedTime = time"
    class="px-4 py-2 rounded-full  cursor-pointer text-sm font-medium shadow-md transition transform"
    :class="selectedTime === time
      ? 'bg-indigo-600 text-white shadow-lg scale-105'
      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg'"
  >
    {{ time }}
  </button>
</div>
  </div>
</div>
<!-- Sticky Footer CTA -->
<div class="sticky bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-gray-200/20  shadow-lg">
<section class="bg-gray-100 flex items-center justify-center ">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Movie and Details -->
        <div class="p-6 space-y-4">
            <!-- Movie Title -->
            <div class="flex items-center gap-2">
                <img src="/img/cinemaa.png" alt="Movie" class="w-5 h-5" />
                <span class="text-gray-800 font-medium">Alita Battle Angel</span>
                <span class="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">PG 13</span>
            </div>
            <!-- Location -->
            <div class="flex items-center gap-2 text-gray-600 text-sm">
                <img src="/img/location.png" alt="Location" class="w-5 h-5" />
                <span>Jebel Ali Recreation Club</span>
            </div>
            <!-- Cinema -->
            <div class="flex items-center gap-2 text-gray-600 text-sm">
                <img src="/img/cinemaa.png" alt="Cinema" class="w-5 h-5" />
                <span>Reel Dine-In Cinema</span>
            </div>
            <!-- Date -->
            <div class="flex items-center gap-2 text-gray-600 text-sm">
                <img src="/img/date.png" alt="Date" class="w-5 h-5" />
                <span>26-Mar-2019</span>
            </div>
            <!-- Time -->
            <div class="flex items-center gap-2 text-gray-600 text-sm">
                <img src="/img/clock.png" alt="Time" class="w-5 h-5" />
                <span>19:00</span>
            </div>
        </div>
        <!-- Price Summary -->
        <div class="bg-gradient-to-r from-[#9E38D3] to-[#67318D] text-white p-6">
            <div class="flex justify-between text-sm mb-2">
                <span>Total Price</span>
                <span>AED 340.00</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
                <span>VAT</span>
                <span>AED 50.00</span>
            </div>
            <div class="flex justify-between items-center text-lg font-semibold border-t border-purple-300 pt-3">
                <span>Grand Total</span>
                <span>AED 390.00</span>
            </div>
<!-- Buttons -->
<div class="flex justify-between mt-6 gap-4">
  <!-- Back button -->
  <button
    class="px-6 py-2 border-2 border-white cursor-pointer tran text-white rounded-full font-medium
           hover:bg-white hover:text-purple-600"
  >
    BACK
  </button>
<!-- Continue button -->
<button
  @click="goToFood"
  class="px-6 py-2 bg-white text-purple-600 rounded-full tran border font-medium
         hover:bg-[#8A36BA] cursor-pointer hover:text-white hover:border hover:border-white"
>
  CONTINUE
</button>
</div>
        </div>
    </div>
</section>
</div>
</div>
</div>
  <div class="flex-[2] ">
<section class=" text-gray-900 font-sans res">
  <div class="text-gray-900 font-sans res relative">
<div class="flex justify-center mb-6 perspective">
  <div
    class="w-3/4 h-6 bg-gradient-to-b from-gray-100 to-gray-500
           shadow-[0_15px_30px_rgba(139,92,246,0.4)]
           rounded-t-full border border-gray-200
           transform -rotate-x-20 scale-y-110"
  ></div>
</div>
<p class="text-center text-sm text-purple-600 font-semibold tracking-widest mb-8">
  SCREEN
</p>
    <!-- Seat layout -->
    <div class="overflow-x-auto w-full no-scrollbar">
<div class="flex justify-center items-start gap-4 h-full">
  <!-- العمود للأحرف على اليسار -->
  <div class="hidden sm:flex flex-col gap-4 h-full justify-between" style="height: -webkit-fill-available;">
    <span
      v-for="row in rows"
      :key="row"
      class="text-xs sm:text-sm font-medium w-6  text-center"
    >
      {{ row }}
    </span>
  </div>
  <!-- الكراسي -->
<div class="flex flex-col gap-6 sm:gap-8">
  <div
    v-for="row in rows"
    :key="row"
    class="relative flex gap-1 sm:gap-2 flex-nowrap"
  >
    <!-- الخط الموصل فوق الكراسي -->
    <div class="absolute -top-2 left-0 right-0 flex gap-1 sm:gap-2">
      <div
        v-for="i in cols"
        :key="'line-' + i"
        class="flex-1 min-w-[32px] sm:min-w-[40px] max-w-[50px] sm:max-w-[60px]"
      >
        <!-- يظهر خط فقط لو الكرسي مش مخفي -->
      </div>
    </div>
    <!-- الكراسي -->
    <div
      v-for="i in cols"
      :key="i"
      class="flex-1 min-w-[32px] sm:min-w-[40px] max-w-[50px] sm:max-w-[60px] relative"
    >
      <div
        v-if="hiddenSeats.includes(row + i) || hiddenCols.includes(i-1)"
        class="w-full h-8 sm:h-12 rounded-md"
      ></div>
      <div v-else class="relative w-full h-8 sm:h-12">
        <img
          src="/img/chair.png"
          class="w-full h-full object-contain cursor-pointer transition"
          :class="{
            'filter grayscale opacity-30': greySeats.includes(row + i),
            'filter grayscale': fadedSeats.includes(row + i),
            'filter grayscale': clickedSeats.includes(row + i)
          }"
          @click="toggleSeat(row + i)"
        />
      </div>
    </div>
  </div>
</div>
  <!-- العمود للأحرف على اليمين -->
  <div class="hidden sm:flex flex-col gap-4 h-full justify-between" style="height: -webkit-fill-available;">
    <span
      v-for="row in rows"
      :key="row + '-right'"
      class="text-xs sm:text-sm font-medium w-6 text-center"
    >
      {{ row }}
    </span>
  </div>
</div>
<h2 class="text-center py-6 text-xl font-bold text-purple-700 tracking-wide uppercase">
back  row
</h2>
    </div>
<!-- Labels -->
<div class="mt-12 flex justify-center gap-10 flex-wrap">
  <!-- Available -->
  <div class="flex items-center gap-3">
    <img src="/img/chair.png" class="w-10 h-10 object-contain opacity-80" />
    <span class="text-base text-gray-700 font-medium">Available</span>
  </div>
  <!-- Booked -->
  <div class="flex items-center gap-3">
    <img src="/img/chair.png" class="w-10 h-10 object-contain filter grayscale opacity-40" />
    <span class="text-base text-gray-700 font-medium">Booked</span>
  </div>
  <!-- Selected -->
  <div class="flex items-center gap-3">
    <img src="/img/chair.png" class="w-10 h-10 object-contain filter grayscale" />
    <span class="text-base  font-medium">Selected</span>
  </div>
  <!-- Wheelchair -->
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-md flex items-center justify-center">
          <img src="/img/wheel-chair.png" class="w-10 h-10 object-contain " />
    </div>
    <span class="text-base text-gray-700 font-medium">Wheelchair</span>
  </div>
</div>
        <!-- Zoom controls -->
        <div class="absolute top-1/2 right-0 flex flex-col gap-2">
            <button class="w-8 h-8 bg-white border rounded shadow flex items-center justify-center">+</button>
            <button class="w-8 h-8 bg-white border rounded shadow flex items-center justify-center">-</button>
        </div>
  </div>
</section>
  </div>
    </section>
  </div>
</template>
<script setup>
import { ref ,onMounted  } from "vue";
import BookingSteps from "../../../components/main/BookingSteps.vue";
import { useRoute, useRouter } from "vue-router";
const cinemas = ref(["Dubai Mall", "Mall of Emirates", "City Centre", "Festival City"])
const selectedLocation = ref("Dubai Mall")
const openSections = ref(["location", "date", "suite", "time"]) // كله مفتوح افتراضيًا
const toggleSection = (section) => {
  if (openSections.value.includes(section)) {
    openSections.value = openSections.value.filter((s) => s !== section)
  } else {
    openSections.value.push(section)
  }
}
const route = useRoute();
const router = useRouter();
const theaterId = route.query.theaterId;
const days = ref([
  { date: "22", day: "FRI" },
  { date: "23", day: "SAT" },
  { date: "24", day: "SUN" },
  { date: "25", day: "MON" },
  { date: "26", day: "TUE" },
]);
const suites = ["Standard", "Dolby 3D", "Platinum", "MX4D"];
const showtimes = ["01:45 pm", "03:30 pm", "05:30 pm"];
const selectedDate = ref("22");
const selectedSuite = ref("Standard");
const selectedTime = ref("01:45 pm");
const goToSeats = () => {
  router.push({
    path: "/chooseChair",
    query: {
      theaterId,
      date: selectedDate.value,
      suite: selectedSuite.value,
      time: selectedTime.value,
    },
  });
};
// الكراسي المخفية
// بيانات
const rows = ['A', 'B', 'C', 'D', 'E'];
const cols = 17;
const hiddenSeats = ["A1","A2","B1","B2","C3","D3","E3","E5","E8","E10","E12","E16","A15","B15","C15","D15"];
const hiddenCols = [4,6,8,10,12];
const greySeats = ["D10","E4"];
const fadedSeats = ["E6"];
const goToFood = () => {
  router.push("/chooseFood")
}
// seats اللي المستخدم ضغط عليها
const clickedSeats = ref([]);
// دالة Toggle
const toggleSeat = (seat) => {
  if (clickedSeats.value.includes(seat)) {
    clickedSeats.value = clickedSeats.value.filter(s => s !== seat);
  } else {
    clickedSeats.value.push(seat);
  }
};
const currentIndex = ref(0);
const daysContainer = ref(null)
const selectDay = (index) => {
  currentIndex.value = index
  selectedDate.value = days.value[index].date
  scrollToDay(index)   // ⬅️ هنا
}
const nextDay = () => {
  if (currentIndex.value < days.value.length - 1) {
    currentIndex.value++
    selectedDate.value = days.value[currentIndex.value].date
    scrollToDay(currentIndex.value)   // ⬅️ هنا
  }
}
const prevDay = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    selectedDate.value = days.value[currentIndex.value].date
    scrollToDay(currentIndex.value)   // ⬅️ هنا
  }
}
const scrollToDay = (index) => {
  const el = daysContainer.value?.children[index]
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }
}
onMounted(() => {
  const defaultIndex = days.value.findIndex(d => d.date === selectedDate.value);
  // لو لقي اليوم
  if (defaultIndex !== -1) {
    currentIndex.value = defaultIndex;
    scrollToDay(defaultIndex);
  } else {
    // fallback: لو selectedDate مش موجود في الليستة
    currentIndex.value = 0;
    selectedDate.value = days.value[0].date;
    scrollToDay(0);
  }
});
</script>
<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.res {
  max-width: 100%;
  overflow-x: auto;
}
.perspective {
  perspective: 1000px;
}
/* CSS */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE & Edge */
  scrollbar-width: none;     /* Firefox */
}
.tran {
  transition: all 0.4s ease;
}
</style>