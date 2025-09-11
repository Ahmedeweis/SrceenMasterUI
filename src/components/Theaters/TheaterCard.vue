<template>
<div
  class="bg-white rounded-xl shadow-md  flex flex-col tran cursor-pointer"
>
    <!-- صورة المسرح -->
    <img
      :src="theater.image || '/img/default-theater.jpg'"
      :alt="theater.name"
      class="w-full h-48 object-cover  rounded-md"
    />
    <div class="flex justify-between items-start  p-5">
      <div>
        <h3 class="text-lg md:text-xl font-semibold text-indigo-900 mb-1 text-start">{{ theater.name }}</h3>
        <div class="text-gray-500 text-sm md:text-base text-start">
          {{ theater.city }} - {{ theater.address }}
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <span class="bg-pink-600 text-white text-xs md:text-sm px-2 py-0.5 rounded-full font-semibold">
          {{ theater.likes }} k
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between  px-5 pb-5">
      <div class="flex items-center text-black font-bold text-sm md:text-base">
        <img src="/img/location.png" class="w-4 md:w-5 h-4 md:h-5" />
        <span class="ml-2 ">{{ theater.distance }} km</span>
      </div>
      <button
        @click="handleDelete"
        class="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-md transition-all duration-200 text-sm md:text-base"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script setup>
import TheaterService from '../../services/Theater.js';
import Swal from 'sweetalert2';
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  theater: { type: Object, required: true }
});
const emit = defineEmits(['deleted']);
const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this theater?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No'
  });
  if (result.isConfirmed) {
    try {
      await TheaterService.deleteTheater(props.theater.id);
      emit('deleted', props.theater.id);
      Swal.fire('Deleted!', 'The theater has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting theater:', error);
      Swal.fire('Error!', 'Failed to delete theater', 'error');
    }
  }
};
</script>
<style scoped>
.tran {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* حركة سلسة للتحجيم والظل */
}
.tran:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* ظل أكبر عند hover */
}
</style>
