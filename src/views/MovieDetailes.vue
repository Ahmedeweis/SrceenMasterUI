<template>
  <div class="relative min-h-screen font-sans text-white p-4 overflow-hidden" v-if="movie">
    <!-- الخلفية -->
<div
  class="absolute inset-0 bg-cover bg-center transition duration-300"
  :style="`background-image: ${backgroundImage}`"
></div>
    <!-- Overlay بلون قريب من الأسود -->
    <div class="absolute inset-0" style="background-color: rgba(13,16,22,0.7);"></div>
    <!-- المحتوى -->
    <div class="relative z-10">
      <Header />
<div>
        <section
        class="w-full max-w-4xl md:max-w-6xl mx-auto rounded-3xl  shadow-lg flex flex-col-reverse md:flex-row md:items-start"
      >
<!-- Text Section -->
<div class="w-full md:w-1/2 p-8 flex flex-col justify-center text-white space-y-6" style="height: 600px;">
  <!-- Title -->
  <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
    {{ movie.title }}
  </h2>
  <p class="text-gray-400 text-base md:text-lg font-semibold">
      {{ movie.Director || "Director" }}
  </p>
  <!-- Description -->
<p class="text-gray-200 text-base md:text-lg font-bold leading-relaxed">
  <span class="text-indigo-400 font-extrabold">
    {{ firstWords }}
  </span>
  {{ restOfOverview }}
</p>
  <!-- Action Buttons -->
  <div class="flex items-center space-x-4">
    <button
      class="w-12 h-12 flex items-center justify-center cursor-pointer bg-pink-600 rounded-full shadow-md hover:bg-pink-700 transition"
    >
      <img src="../assets/imgs/play-button.png" class="w-6 h-6" />
    </button>
    <button
      class="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full pr-1 pt-0 hover:bg-pink-600 shadow-md bg-[#2C253D] transition"
    >
      <img src="../assets/imgs/telegram.png" class="w-6 h-6" />
    </button>
    <button
      class="w-12 h-12 flex items-center justify-center cursor-pointer rounded-full shadow-md hover:bg-pink-600  bg-[#2C253D]  transition"
    >
      <img src="../assets/imgs/bookmark.png" class="w-6 h-6" />
    </button>
  </div>
  <!-- Details -->
<div class="grid grid-cols-4 gap-4 text-sm md:text-base font-bold">
  <div>
    <p class="text-gray-400">Release</p>
    <p class="text-white">{{ movie.releaseDate }}</p>
  </div>
  <!-- <div>
    <p class="text-gray-400">Runtime</p>
    <p class="text-white">2h 20m</p>
  </div> -->
  <div>
    <p class="text-gray-400">Genre</p>
    <p class="text-white">
      {{ (movie.genres && movie.genres.length) ? movie.genres[0].name : "No Genre" }}
    </p>
  </div>
  <div>
    <p class="text-gray-400">Language</p>
    <p class="text-white">{{ movie.originalLanguage }}</p>
  </div>
  <div>
    <p class="text-gray-400">IMDb</p>
    <p class="text-white">{{ formatViews(movie.popularity) }}</p>
  </div>
</div>
  <!-- Book Now Button -->
<button
  @click="goToChooseCinema"
  class="mt-2 w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3 px-8 rounded-4xl cursor-pointer shadow-xl transition"
>
  Book Now
</button>
</div>
        <!-- Image Section -->
        <div
          class="w-full md:w-1/2 flex justify-center md:justify-end p-4 rounded-3xl"
        >
          <div class="bg-white p-2 relative ">
            <!-- Top navigation -->
<div class="absolute top-6 left-4">
  <button
    class="bg-black/50 rounded-xl p-2 text-white cursor-pointer"
    @click="$router.back()"
  >
    <img src="../assets/imgs/backI.png" class="w-5" />
  </button>
</div>
            <div class="absolute top-6 right-4 ">
                <button class="bg-black/50 rounded-xl p-2 text-white cursor-pointer">
                       <img src="../assets/imgs/more.png" class="w-5"></img>
                </button>
            </div>
            <img
              :src="movie.src"
              :alt="movie.title"
              class="max-h-[550px] w-auto object-cover"
            />
          </div>
        </div>
      </section>
      <section class="w-full max-w-4xl md:max-w-6xl mx-auto rounded-3xl p-8  shadow-lg flex flex-col md:items-start">
                        <!-- Tabs -->
  <div class="flex space-x-6 mb-5 ">
    <button
      class="px-6 py-2 rounded-full bg-gray-100 text-gray-900 font-extrabold shadow cursor-pointer hover:bg-white transition"
    >
      Shots
    </button>
    <button class="text-white rounded-full  px-6 py-2 font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition">
      Stars
    </button>
    <button class="text-white rounded-full px-6 py-2 font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-900  transition">
      Reviews
    </button>
  </div>
  <!-- Shots Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-bold">
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
        src="../assets/imgs/movie/5.png"
        alt="Shot 1"
    class="w-full h-full object-cover img-hover cursor-pointer"
      />
    </div>
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
       src="../assets/imgs/movie/4.png"
        alt="Shot 2"
         class="w-full h-full object-cover img-hover cursor-pointer"
      />
    </div>
    <div class="rounded-xl overflow-hidden shadow-lg">
      <img
      src="../assets/imgs/movie/6.png"
        alt="Shot 3"
    class="w-full h-full object-cover img-hover cursor-pointer"
      />
    </div>
<div class="rounded-xl overflow-hidden shadow-lg">
  <img
    src="../assets/imgs/movie/2.png"
    alt="Shot 4"
    class="w-full h-full object-cover img-hover cursor-pointer"
  />
</div>
  </div>
      </section>
</div>
    </div>
  </div>
</template>
<script setup>
import Header from "../components/main/MainHeader.vue";
import bg from "../assets/imgs/back.png";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, watch , computed  } from "vue";
const route = useRoute();
const movie = ref(null);
const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
import posterImg from "../assets/imgs/poster.png";
const goToChooseCinema = () => {
  router.push('/chooseCinma'); // هنا تحط اسم الصفحة أو المسار الصحيح
};
// استرجاع الكائن من query
if (route.query.movie) {
  try {
    movie.value = JSON.parse(route.query.movie);
    // ضيف src عشان تضمن وجود صورة
    movie.value.src = movie.value.posterPath
      ? BASE_IMG_URL + movie.value.posterPath
      : posterImg;
    console.log("🎬 Movie received:", movie.value);
  } catch (err) {
    console.error("❌ Failed to parse movie:", err);
  }
}
const formatViews = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toFixed(0);
};
// تابع أي تغيير
watch(
  () => route.query.movie,
  (newVal) => {
    if (newVal) {
      try {
        movie.value = JSON.parse(newVal);
        movie.value.src = movie.value.posterPath
          ? BASE_IMG_URL + movie.value.posterPath
          : posterImg;
        console.log("🔄 Movie updated:", movie.value);
      } catch (err) {
        console.error("❌ Failed to parse updated movie:", err);
      }
    }
  }
);
const firstWords = computed(() => {
  if (!movie.value?.overview) return "";
  return movie.value.overview.split(" ").slice(0, 2).join(" ");
});
const restOfOverview = computed(() => {
  if (!movie.value?.overview) return "Overview not available.";
  return movie.value.overview.split(" ").slice(2).join(" ");
});
const backgroundImage = computed(() => {
  if (movie.value?.backdropPath) {
    // رابط كامل للصورة من TMDB
    return `url(${BASE_IMG_URL + movie.value.backdropPath})`;
  }
  // الصورة الافتراضية
  return `url(${bg})`;
});
</script>
<style scoped>
.img-hover {
  transition: transform 0.3s ease-in-out; /* زمن الحركة + نوعها */
  cursor: pointer;
}
.img-hover:hover {
  transform: scale(1.05); /* تكبير عند الـ hover */
}
.background {
  background-position: center center;
  background-size: cover; /* حفظ نسبة العرض للطول */
  background-repeat: no-repeat;
  filter: brightness(0.7) saturate(1.1); /* تحسين الألوان */
}
</style>
