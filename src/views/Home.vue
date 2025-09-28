<template>
  <div class="bg-[#14111D] text-white font-sans p-4 min-h-screen">
<Header></Header>
<section class="relative w-full h-[300px]  rounded-lg">
    <!-- سلايدر -->
    <div class=" rounded-lg">
      <transition name="fade" mode="out-in">
        <img
          :src="slides[currentIndex]"
          :key="slides[currentIndex]"
          class="w-full h-[300px] object-cover"
          alt="slide"
        />
      </transition>
    </div>
    <!-- سهم شمال -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 -translate-y-1/2   cursor-pointer text-5xl text-white p-3 rounded-full"
    >
      ❮
    </button>
    <!-- سهم يمين -->
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-2 -translate-y-1/2  cursor-pointer text-5xl text-white p-3 rounded-full"
    >
      ❯
    </button>
</section>
<section class="mt-8">
  <div class="flex justify-between items-center mb-3">
    <h2 class="text-4xl md:text-[30px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mb-2 md:mb-4 leading-snug">Trends</h2>
    <a href="#"
       class="text-[#15DED4] font-bold text-[20px] px-4 py-2 rounded cursor-pointer">
      See all
    </a>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Left Featured Trailer -->
    <!-- Right: 3 smaller cards -->
    <div class="space-y-4">
      <!-- Big main card -->
      <div class="relative rounded-xl overflow-hidden shadow-lg h-[200px] sm:h-[220px]">
        <img src="../assets/imgs/movie/big.webp" alt="Arcane" class="w-full h-full object-cover rounded-xl">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
        <div class="absolute bottom-3 left-3 flex items-center gap-2">
          <button class="w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition cursor-pointer">
            <img src="../assets/imgs/play-button.png" class="w-4 h-4">
          </button>
          <span class="text-white font-semibold text-sm sm:text-base truncate">Civil War</span>
        </div>
      </div>
      <!-- Two smaller cards grid -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Joker Card -->
        <div class="relative rounded-xl overflow-hidden shadow-lg h-[100px] sm:h-[250px]">
          <img src="../assets/imgs/movie/left.webp" alt="Joker" class="w-full h-full object-cover rounded-xl">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
          <button class="absolute top-5 left-5 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition cursor-pointer">
            <img src="../assets/imgs/play-button.png" class="w-4 h-4">
          </button>
          <div class="absolute bottom-5 left-5">
            <span class="text-white font-medium text-2xl  truncate">Joker</span>
          </div>
        </div>
        <!-- Bohemian Rhapsody Card -->
        <div class="relative rounded-xl overflow-hidden shadow-lg h-[100px] sm:h-[250px]">
          <img src="../assets/imgs/movie/right.webp" alt="Bohemian Rhapsody" class="w-full h-full object-cover rounded-xl">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
          <button class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition cursor-pointer">
            <img src="../assets/imgs/play-button.png" class="w-4 h-4">
          </button>
          <div class="absolute bottom-5 right-5">
            <span class="text-white font-medium text-2xl  leading-tight">Bohemian <br> Rhapsody</span>
          </div>
        </div>
      </div>
    </div>
        <div class="relative rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-full">
      <img src="../assets/imgs/movie/3.webp" alt="Featured Trailer" class="w-full h-full object-cover rounded-xl">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
      <!-- Play button & title -->
      <div class="absolute bottom-4 left-4 flex items-center gap-3">
        <button class="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition cursor-pointer">
          <img src="../assets/imgs/play-button.png" class="w-5 h-5">
        </button>
        <span class="text-white font-semibold text-lg sm:text-xl md:text-2xl truncate">Arcane</span>
      </div>
    </div>
  </div>
</section>
    <!-- Most Popular -->
    <section class="mt-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-4xl md:text-[30px] mt-0 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mb-2 md:mb-4 leading-snug break-words">Most Popular</h2>
<a href="#"
   class=" text-[#15DED4] font-bold text-[20px] px-[15px] py-[5px] rounded cursor-pointer">
  See all
</a>
      </div>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
<div  v-for="(movie, i) in movies" :key="i"
@click="openMovie(movie)"
class="relative aspect-[2/3] overflow-hidden rounded-lg cursor-pointer bg-[#1c1b29] hover:scale-102 transition-transform">
  <!-- Movie Image -->
 <img :src="movie.src" class="w-full h-full object-cover" :alt="movie.title" />
  <!-- Rating -->
  <span class="absolute top-2 right-2 font-bold bg-[#1c1b29]/80 px-2 py-1 rounded text-xs sm:text-sm  text-yellow-300">
   {{ formatViews(movie.popularity) }}
    <!-- {{ normalizePopularity(movie.popularity) }} -->
<!-- {{ Math.min(movie.popularity, 10).toFixed(2) }} -->
  </span>
  <!-- Play Trailer -->
<span
  @click="openTrailer(movie.title)"
  class="absolute top-2 left-2 flex items-center gap-1 cursor-pointer
         bg-white/30 backdrop-blur-md px-2 py-1 rounded text-xs sm:text-sm text-white
         hover:text-white hover:bg-red-500 transition z-50"
>
  <img src="../assets/imgs/youtube.png" alt="youtube"
       class="w-4 h-4 sm:w-5 sm:h-5 transition-transform hover:scale-125" />
  Play Trailer
</span>
  <!-- Overlay Content -->
  <div class="absolute bottom-0 left-0 w-full p-4 text-white"
       :style="{
         background: `linear-gradient(to top, ${movie.bgColor} 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.6) 70%, transparent 100%)`
       }"
  >
    <h2 class="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-md">{{ movie.title }}</h2>
    <p class="text-xs sm:text-sm md:text-base text-gray-200 drop-shadow-sm">{{ movie.releaseDate }} · {{ movie.director || " Director" }}</p>
    <!-- <p class="text-xs sm:text-sm md:text-base text-gray-300 mt-1 drop-shadow-sm">{{ movie.duration || "2h 49m"}}</p> -->
    <!-- Tags -->
<div class="flex flex-wrap gap-2 mt-3">
  <span
    v-for="genre in (movie.genres && movie.genres.length ? movie.genres : ['Action', 'Drama', 'Adventure'])"
    :key="genre"
    class="px-2 py-1 bg-black/60 text-white rounded-full font-bold text-[10px] sm:text-[11px] md:text-[12px] drop-shadow-sm"
  >
    {{ genre.name }}
  </span>
</div>
  </div>
</div>
  </div>
    </section>
    <!-- Friends Recommend -->
    <section class="mt-8">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-4xl md:text-[30px] mt-0 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mb-2 md:mb-4 leading-snug break-words"> Recommended</h2>
<a href="#"
     class=" text-[#15DED4] font-bold text-[20px] px-[15px] py-[5px] rounded cursor-pointer">
  See all
</a>
      </div>
  <div class="overflow-hidden relative w-full">
    <!-- Container السلايدر -->
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
<div
  v-for="(movie, i) in moviesWithBackdrop"
  :key="movie.id"
  class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 relative rounded-lg overflow-hidden bg-[#1c1b29]"
>
  <img
    :src="BASE_IMG_URL + movie.backdropPath"
    :alt="movie.title"
    class="w-full h-56 object-cover rounded-lg"
  />
  <div class="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
    <div>
      <p class="text-lg font-bold text-white truncate">{{ movie.title }}</p>
      <p class="text-sm text-gray-300">Director</p>
    </div>
    <div class="flex gap-2">
      <!-- أيقونة ✔ -->
      <button class="w-9 h-9 flex items-center justify-center cursor-pointer bg-white/20 rounded-full hover:bg-white/40 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <!-- أيقونة القلب -->
      <button class="w-9 h-9 flex items-center justify-center cursor-pointer bg-pink-500 rounded-full hover:bg-pink-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white"
             viewBox="0 0 24 24" class="w-5 h-5">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81
               4.5 2.09C13.09 3.81 14.76 3
               16.5 3 19.58 3 22 5.42 22 8.5c0
               3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  </div>
</div>
    </div>
    <!-- أزرار السحب -->
<button
  v-if="currentIndex > 0"
  @click="prevMovie"
  class="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-5xl text-white p-3 rounded-full"
>
  ❮
</button>
<button
  v-if="currentIndex < moviesWithBackdrop.length - visibleCards"
  @click="nextMovie"
  class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-5xl text-white p-3 rounded-full"
>
  ❯
</button>
  </div>
    </section>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted ,computed} from "vue";
import ColorThief from "colorthief";
import Header from "../components/main/MainHeader.vue";
import { getMovies } from "../services/moviesService";
import { useRouter } from "vue-router";
const router = useRouter();
import img1 from "../assets/imgs/slider/1.webp";
import img2 from "../assets/imgs/slider/2.webp";
import img3 from "../assets/imgs/slider/3.webp";
import img4 from "../assets/imgs/slider/4.webp";
import img5 from "../assets/imgs/slider/5.webp";
// سلايدر
const slides = ref([img1, img2, img3, img4, img5]);
const currentIndex = ref(0);
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
}
function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + slides.value.length) % slides.value.length;
}
// بيانات الأفلام
const movies = ref([]);
const loading = ref(false);
const filters = reactive({
  page: 0,
  size: 15, // عدد الأفلام
  title: "",
  overview: "",
  adult: false,
  sort: [
    { field: "popularity", direction: "desc" }
  ]
});
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
import posterImg from "../assets/imgs/poster.png";
// جلب بيانات الأفلام وحساب الألوان
async function fetchMovies() {
  loading.value = true;
  try {
    const data = await getMovies(filters);
    // اضف src و rating لكل فيلم
// بعد ما تجيب البيانات من API
/*
movies.value = data
  .sort((a, b) => b.popularity - a.popularity)
  .map(movie => ({
    ...movie,
    rating: popularityToRating(movie.popularity),
    src: movie.posterPath ? BASE_IMG_URL + movie.posterPath : posterImg,
    bgColor: "#000"
  }));
  */
movies.value = data
  .sort((a, b) => b.popularity - a.popularity) // ترتيب من الأعلى للأقل شعبية
  .map(movie => ({
    ...movie,
    src: movie.posterPath ? BASE_IMG_URL + movie.posterPath : posterImg,
    bgColor: "#000"
  }));
    // احصل على اللون الرئيسي لكل صورة
    const colorThief = new ColorThief();
    for (const movie of movies.value) {
      await new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // لو الصور من TMDB
        img.src = movie.src;
        img.onload = () => {
          const color = colorThief.getColor(img);
          movie.bgColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          resolve();
        };
        img.onerror = () => resolve(); // لو الصورة فشلت
      });
    }
  } catch (err) {
    console.error(err);
    movies.value = [];
  } finally {
    loading.value = false;
  }
}
// جلب البيانات عند تحميل الصفحة
onMounted(fetchMovies);
const moviesWithBackdrop = computed(() =>
  movies.value.filter(movie => movie.backdropPath)
);
const cardWidth = 272; // w-64 + mx-2*2
function nextMovie() {
  if ((currentIndex.value + 1) * cardWidth < moviesWithBackdrop.value.length * cardWidth - cardWidth) {
    currentIndex.value++;
  }
}
function prevMovie() {
  if (currentIndex.value > 0) currentIndex.value--;
}
const visibleCards = ref(1); // default على موبايل
function updateVisibleCards() {
  const width = window.innerWidth;
  if (width >= 1024) visibleCards.value = 3; // desktop
  else if (width >= 768) visibleCards.value = 2; // tablet
  else visibleCards.value = 1; // mobile
}
onMounted(() => {
  updateVisibleCards();
  window.addEventListener("resize", updateVisibleCards);
});
const openMovie = (movie) => {
  router.push({
    name: "MovieDetailes",
    query: { movie: JSON.stringify(movie) } // 👈 نبعت الكائن كله
  });
};
const formatViews = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toFixed(0);
};
const openTrailer = (title) => {
  if (!title) return;
  // نحط كلمة Trailer جنب الاسم
  const query = encodeURIComponent(`${title} trailer`);
  const url = `https://www.youtube.com/results?search_query=${query}`;
  window.open(url, "_blank");
};
// const normalizePopularity = (popularity) => {
//   const maxPop = 600;
//   return Math.min(10, (popularity / maxPop) * 10).toFixed(1);
// };
// import movie1 from "../assets/imgs/movie/1.png";
// import movie2 from "../assets/imgs/movie/2.png";
// import movie3 from "../assets/imgs/movie/3.png";
// import movie4 from "../assets/imgs/movie/4.png";
// بيانات الأفلام
// const movies = ref([
//   {
//     title: "Bohemian Rhapsody",
//     year: 2019,
//     director: "Bryan Singer",
//     duration: "2h 10m",
//     rating: 8.0,
//     tags: ["Drama", "Music", "Biography"],
//     trailer: "https://www.youtube.com/watch?v=mP0VHJYFOAU",
//     src: movie1,
//     bgColor: "#000"
//   },
//   {
//     title: "Inception",
//     year: 2010,
//     director: "Christopher Nolan",
//     duration: "2h 28m",
//     rating: 8.8,
//     tags: ["Action", "Sci-Fi", "Thriller"],
//     trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
//     src: movie2,
//     bgColor: "#000"
//   },
//   {
//     title: "Interstellar",
//     year: 2014,
//     director: "Christopher Nolan",
//     duration: "2h 49m",
//     rating: 8.6,
//     tags: ["Adventure", "Drama", "Sci-Fi"],
//     trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
//     src: movie3,
//     bgColor: "#000"
//   },
//   {
//     title: "Avatar",
//     year: 2009,
//     director: "James Cameron",
//     duration: "2h 42m",
//     rating: 7.9,
//     tags: ["Action", "Fantasy", "Adventure"],
//     trailer: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
//     src: movie4,
//     bgColor: "#000"
//   },
// ]);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
a {
  position: relative;
   transition:0.3s;
}
a:hover {
 color: #15ded4;
}
</style>
