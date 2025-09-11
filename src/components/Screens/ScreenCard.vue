<template>
  <div class="bg-white rounded-xl shadow-md flex flex-col tran cursor-pointer">
    <img
      :src="screen.image || '/img/default-screen.jpg'"
      :alt="screen.name"
      class="w-full h-40 object-cover rounded-md"
    />
    <div class="flex justify-between items-start p-5">
      <div>
        <h3 class="text-lg md:text-xl font-semibold text-indigo-900 mb-1 text-start">
          {{ screen.name }}
        </h3>
        <div class="text-gray-500 text-sm md:text-base text-start">
          Seats: {{ screen.totalSeats }} | Type: {{ screen.screenType }}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between px-5 pb-5">
      <div class="text-black font-bold text-sm md:text-base">
        Theater ID: {{ screen.theaterId }}
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
import ScreenService from "../../services/Screen.js";
import Swal from "sweetalert2";
const props = defineProps({
  screen: { type: Object, required: true },
});
const emit = defineEmits(["deleted"]);
const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this screen?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No",
  });
  if (result.isConfirmed) {
    try {
      await ScreenService.deleteScreen(props.screen.id);
      emit("deleted", props.screen.id);
      Swal.fire("Deleted!", "The screen has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting screen:", error);
      Swal.fire("Error!", "Failed to delete screen", "error");
    }
  }
};
</script>
<style scoped>
.tran {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.tran:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>