<template>
  <aside class="w-64 bg-white shadow-lg py-4">
    <div class="flex items-center mb-12 justify-start mt-3 pl-5">
      <img src="/logo.png" alt="Logo" class="w-8" />
      <h2 class="text-2xl font-bold ml-2 text-[#4D61EC]" style="font-family: 'Playfair', sans-serif;">
        Ticket Corn
      </h2>
    </div>
    <nav>
      <ul class="space-y-6">
<li v-for="item in menuItems" :key="item.name"
  class="flex items-center justify-between pr-3 py-2 pl-5 border-r-4"
  :class="route.path.startsWith(item.path)
    ? 'border-[#4D61EC] bg-[#d6e7ff]'
    : 'border-transparent bg-white hover:border-[#4D61EC] hover:bg-[#d6e7ff]'">
  <RouterLink :to="item.path" class="flex font-bold items-center"
    :class="route.path.startsWith(item.path) ? 'text-[#4D61EC]' : 'text-[#313131]'">
    <img :src="item.icon" alt="Icon" class="w-6 h-6 mr-4 transition-filter duration-200"
      :class="route.path.startsWith(item.path) ? '' : 'icon-black'" />
    {{ item.label }}
  </RouterLink>
</li>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const menuItems = [
  { name: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '/img/DashBoard.png' },
  { name: 'theater', label: 'Theater', path: '/theater', icon: '/img/applications.png' },
  { name: 'screens', label: 'Screens', path: '/screen', icon: '/img/cinemaa.png' },
  { name: 'seats', label: 'Seats', path: '/seats/1', icon: '/img/chair.png' },
  { name: 'movies', label: 'Movies', path: '/movies', icon: '/img/movie.png' },
    { name: 'Fill DB', label: 'DB', path: '/FillDatabase', icon: '/img/movie.png' },
]
</script>
<style scoped>
.icon-black {
  filter: brightness(100) invert(1) grayscale(5) opacity(0.8);
}
</style>
