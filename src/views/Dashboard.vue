<template>
  <div class="flex h-screen bg-[#F4F5F9]">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <Header />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CarCard v-for="car in cars" :key="car.id" :car="car" />
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import CarCard from "../components/CarCard.vue";
// لو الصور في public/img
const cars = ref([
  { id: 1, year: 2023, name: "Audi Q7", model: "Premium Plus", type: "SUV", seats: 4, doors: 7, luggage: 2, price: 250, image: "/img/car.jpg" },
  { id: 2, year: 2023, name: "Mercedes-Benz", model: "S 500 4MATIC S-Class", type: "Sedan", seats: 4, doors: 5, luggage: 3, price: 400, image: "/img/car.jpg" },
  { id: 3, year: 2023, name: "Tesla", model: "Model 3", type: "Sedan", seats: 4, doors: 5, luggage: 2, price: 199, image: "/img/car.jpg" },
  { id: 4, year: 2023, name: "BMW", model: "X5 xDrive40i", type: "SUV", seats: 4, doors: 5, luggage: 2, price: 220, image: "img/car.jpg" },
  { id: 5, year: 2023, name: "Porsche", model: "Cayenne Turbo GT", type: "SUV", seats: 4, doors: 5, luggage: 3, price: 380, image: "img/car.jpg" },
  { id: 6, year: 2023, name: "Lamborghini", model: "Urus", type: "SUV", seats: 4, doors: 5, luggage: 2, price: 999,image: "img/car.jpg" },
]);
</script>
