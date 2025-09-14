<template>
  <div class=" relative bg-[#18122B] text-white font-sans p-4 min-h-screen">
    <!-- المحتوى -->
    <!-- <div class="relative z-10">
      <Header />
      </div> -->
    <section class=" min-h-screen flex justify-center items-start ">
    <div class="w-full  bg-[#18122b] rounded-3xl overflow-hidden shadow-xl">
        <!-- Header -->
    <BookingSteps title="Select Cinema" @back="$router.back()" />
        <!-- Search -->
        <div class="px-6 mt-4">
            <div class="text-2xl  mb-3 font-extrabold text-transparent  text-white drop-shadow-md">
   Choose Theater
</div>
            <div class="flex items-center bg-[#2d1f47] rounded-xl px-3 py-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Type name or location"
                    class="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-3">
                <button class="text-gray-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.447.832l-4 2.667A1 1 0 018 21V13.414L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                </button>
            </div>
        </div>
        <!-- Sections -->
        <div class="px-6 mt-8 space-y-10 pb-8">
            <!-- Near You -->
<section>
    <!-- Near You -->
    <h2 class="text-white font-medium">Near You</h2>
    <p class="text-gray-400 text-sm">The nearest cinemas based on your location</p>
    <div class="mt-4 pb-2 overflow-x-auto md:overflow-visible">
      <div class="flex space-x-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        <article
          v-for="theater in theaters.near"
          :key="theater.id"
          @click="goToSeats(theater)"
          class="cursor-pointer relative w-56 md:w-full flex-shrink-0 bg-transparent transform hover:scale-105 transition-transform"
        >
          <div class="relative">
  <img :src="theater.img" :alt="theater.name"
              class="w-56 md:w-full h-36 md:h-48 rounded-lg object-cover"
            />
            <span class="absolute bottom-2 right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ theater.views }}
            </span>
          </div>
          <div class="mt-3">
            <h3 class="text-white text-sm md:text-base font-medium">{{ theater.name }}</h3>
            <p class="text-gray-400 text-xs md:text-sm flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
              </svg>
              {{ theater.distance }}
            </p>
          </div>
        </article>
      </div>
    </div>
    <!-- Popular -->
    <h2 class="text-white font-medium mt-8">Popular</h2>
    <p class="text-gray-400 text-sm">Most popular cinema near you</p>
    <div class="mt-4 pb-2 overflow-x-auto md:overflow-visible">
      <div class="flex space-x-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        <article
          v-for="theater in theaters.popular"
          :key="theater.id"
          @click="goToSeats(theater)"
          class="cursor-pointer relative w-56 md:w-full flex-shrink-0 bg-transparent transform hover:scale-105 transition-transform"
        >
          <!-- نفس الكارت فوق -->
          <div class="relative">
            <img :src="theater.img" :alt="theater.name"
                 class="w-56 md:w-full h-36 md:h-48 rounded-lg object-cover" />
            <span class="absolute bottom-2 right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ theater.views }}
            </span>
          </div>
          <div class="mt-3">
            <h3 class="text-white text-sm md:text-base font-medium">{{ theater.name }}</h3>
            <p class="text-gray-400 text-xs md:text-sm flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
              </svg>
              {{ theater.distance }}
            </p>
          </div>
        </article>
      </div>
    </div>
    <!-- Recommended -->
    <h2 class="text-white font-medium mt-8">Recommended</h2>
    <p class="text-gray-400 text-sm">Your friends recommended</p>
    <div class="mt-4 pb-2 overflow-x-auto md:overflow-visible">
      <div class="flex space-x-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        <article
          v-for="theater in theaters.recommended"
          :key="theater.id"
          @click="goToSeats(theater)"
          class="cursor-pointer relative w-56 md:w-full flex-shrink-0 bg-transparent transform hover:scale-105 transition-transform"
        >
          <!-- نفس الكارت -->
          <div class="relative">
            <img :src="theater.img" :alt="theater.name"
                 class="w-56 md:w-full h-36 md:h-48 rounded-lg object-cover" />
            <span class="absolute bottom-2 right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
              {{ theater.views }}
            </span>
          </div>
          <div class="mt-3">
            <h3 class="text-white text-sm md:text-base font-medium">{{ theater.name }}</h3>
            <p class="text-gray-400 text-xs md:text-sm flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
              </svg>
              {{ theater.distance }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
        </div> <!-- end px-6 container -->
    </div> <!-- end main card -->
</section>
      </div>
</template>
<script setup>
// import Header from "../../../components/main/MainHeader.vue";
import BookingSteps from "../../../components/main/BookingSteps.vue";
import { useRoute, useRouter } from "vue-router"; // ✅ استورد useRouter
const route = useRoute();
const router = useRouter();
const movie = route.state?.movie || null; // safety
const bg = movie?.backdropPath || "";
const movieId = route.query.movieId;
console.log("Selected movie ID:", movieId);
// ✅ بيانات السينمات مقسمة حسب القسم
const theaters = {
  near: [
    { id: 1, name: "CINEWORLD", img: "/img/Theater/1.png", distance: "2.4 Km", views: "8k" },
    { id: 2, name: "PALACE", img: "/img/Theater/2.png", distance: "6 Km", views: "6.2k" },
    { id: 3, name: "MEGAPLEX", img: "/img/Theater/3.png", distance: "3.2 Km", views: "5.5k" },
    { id: 4, name: "MOVIES", img: "/img/Theater/4.png", distance: "8 Km", views: "4.3k" },
  ],
  popular: [
    { id: 5, name: "CINEMA CITY", img: "/img/Theater/5.png", distance: "34 Km", views: "9k" },
    { id: 6, name: "SHOWCASE", img: "/img/Theater/6.png", distance: "20 Km", views: "7.5k" },
    { id: 7, name: "IMAX", img: "/img/Theater/7.png", distance: "12 Km", views: "5.8k" },
    { id: 8, name: "GRAND", img: "/img/Theater/8.png", distance: "14 Km", views: "6k" },
  ],
  recommended: [
    { id: 9, name: "CINEMA MAX", img: "/img/Theater/1.png", distance: "15 Km", views: "7.5k" },
    { id: 10, name: "FRIEND'S PICK", img: "/img/Theater/2.png", distance: "9 Km", views: "6.9k" },
  ],
};
// ✅ لما يضغط على سينما يروح يختار الكراسي
const goToSeats = (theater) => {
router.push({
  path: "/chooseChair",
  query: { theaterId: theater.id },
});
};
</script>
