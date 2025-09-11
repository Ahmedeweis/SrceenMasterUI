<template>
  <div class="flex h-screen bg-[#F4F5F9]">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <Header />
      <div class="flex items-center justify-between mb-6 w-full">
        <h1 class="text-2xl font-bold text-blue-500">Theater</h1>
        <AddProjectModal @theaterAdded="fetchTheaters" class="cursor-pointer" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
<TheaterCard
  v-for="theater in theaters"
  :key="theater.id"
  :theater="theater"
  @deleted="theaters = theaters.filter(t => t.id !== $event)"
/>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "../../components/Sidebar.vue";
import Header from "../../components/Header.vue";
import TheaterCard from "../../components/Theaters/TheaterCard.vue";
import AddProjectModal from '../../components/Theaters/AddTheater.vue';
import TheaterService from '../../services/Theater.js';
import { theaterStats} from '../../services/theaterStats.js';
const theaters = ref([]);
const fetchTheaters = async () => {
  try {
    const response = await TheaterService.getTheaters();
    // البيانات من API
    const apiData = response.data;
    // دمج بيانات likes و distance بالترتيب
    theaters.value = apiData.map((theater, index) => ({
      ...theater,
      image: `/img/Theater/${theater.id}.png`,
      likes: theaterStats[index]?.likes || 0,
      distance: theaterStats[index]?.distance || 0
    }));
  } catch (error) {
    console.error('Error fetching theaters:', error);
  }
};
onMounted(() => {
  fetchTheaters();
});
</script>
