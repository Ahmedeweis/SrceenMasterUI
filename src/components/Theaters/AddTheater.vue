<template>
  <div>
    <slot name="trigger">
      <button
        @click="openModal"
        class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
      >
        Add Theater
      </button>
    </slot>
    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-[999] p-6 bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl  w-full max-w-[1000px] h-[600px]  p-6 relative overflow-auto">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 font-bold text-xl cursor-pointer text-black hover:text-gray-700 hover:bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>
        <!-- Header -->
        <div class="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" class="w-8 h-8" />
          <span class="text-xl font-bold text-black">Screen Master</span>
        </div>
        <h2 class="text-2xl font-semibold mb-2 text-black">Add Theater</h2>
        <p class="text-gray-700 mb-2">Fill in all information of the <span class="text-blue-600 font-bold">Theater</span> for better movie experiences.</p>
        <!-- Form -->
        <div class="space-y-4">
<div class="flex gap-4">
  <!-- Theater Name -->
  <div class="flex-1">
    <label class="block text-gray-700 font-medium mb-1">Theater Name</label>
    <input
      type="text"
      v-model="theater.name"
      placeholder="Enter Theater Name"
      class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
<!-- City Select -->
<div class="flex-1">
  <label class="block text-gray-700 font-medium mb-1">City</label>
<select
  v-model="theater.city"
  class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>Select City</option>
  <option v-for="city in cities" :key="city" :value="city">
    {{ city }}
  </option>
</select>
</div>
</div>
          <!-- Address -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              v-model="theater.address"
              placeholder="Enter Address"
              class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- Is Active -->
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="theater.is_active" id="isActive" class="w-4 h-4" />
            <label for="isActive" class="text-gray-700 font-medium">Active</label>
          </div>
          <!-- Image Upload -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Upload Image</label>
            <div
              @click="$refs.fileInput.click()"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              :class="{'border-blue-500 bg-blue-50': isDragging}"
              class="w-full h-48 border-2 border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer transition hover:border-blue-500"
            >
              <img v-if="selectedImage" :src="selectedImageUrl" class="h-28 object-contain mb-2" />
              <div v-else class="text-gray-500 text-center">
                <p class="font-semibold">Click or Drag & Drop</p>
                <p class="text-sm">Upload Theater Image (UI only)</p>
              </div>
              <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload" />
            </div>
          </div>
          <!-- Status & Submit -->
<div class="flex justify-between items-center w-full">
  <div class="flex items-center gap-3">
      <img src="/photo.png" alt="PDF Icon" class="w-5 h-5 mt-3" />
    <p class="text-[#2B7FFF] font-bold  mt-3">Max size
      <span class="text-red-600 font-bold">10Mb</span>
    </p>
  </div>
  <button
    @click="submitForm"
    :disabled="isLoading"
    class="bg-blue-500 text-white px-4 py-2 mt-2.5 rounded-md cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
  >
    {{ isLoading ? 'Processing...' : 'Add' }}
  </button>
</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TheaterService from '../../services/Theater.js';
import { useToast } from 'vue-toastification'
import { City } from '../../services/theaterStats.js'
import { defineEmits } from 'vue';
const emit = defineEmits(['theaterAdded']);
const cities = ref(City); // هذا اللي نستخدمه في v-for
const toast = useToast()
const isModalOpen = ref(false)
const isLoading = ref(false)
const statusMessage = ref("")
const isDragging = ref(false)
const selectedImage = ref(null)
const selectedImageUrl = ref(null)
// Theater data
const theater = ref({
  name: '',
  address: '',
  city: '',
  is_active: true
})
const openModal = () => {
  isModalOpen.value = true
  statusMessage.value = ''
}
const closeModal = () => {
  isModalOpen.value = false
  theater.value = { name: '', address: '', city: '', is_active: true }
  selectedImage.value = null
  selectedImageUrl.value = null
  isLoading.value = false
  statusMessage.value = ''
}
// Handle image selection (UI only)
const handleFileUpload = (e) => {
  selectedImage.value = e.target.files[0]
  selectedImageUrl.value = URL.createObjectURL(selectedImage.value)
}
const handleDrop = (e) => {
  const files = e.dataTransfer.files
  if (files.length > 0) {
    selectedImage.value = files[0]
    selectedImageUrl.value = URL.createObjectURL(selectedImage.value)
  }
  isDragging.value = false
}
// Submit form: send data to theater-controller
const submitForm = async () => {
  if (!theater.value.name || !theater.value.address || !theater.value.city) {
    toast.error('Please fill in all theater fields.');
    return;
  }
  isLoading.value = true;
  try {
    const response = await TheaterService.addTheater({
      name: theater.value.name,
      address: theater.value.address,
      city: theater.value.city,
      is_active: theater.value.is_active
    });
    if (response.status === 200) {
      toast.success('Theater added successfully!');
      emit('theaterAdded'); // ⬅️ هذا السطر يرسل الحدث للوالد لتحديث القائمة
      setTimeout(() => closeModal(), 500);
    } else {
      toast.error('Failed to add theater. Try again.');
    }
  } catch (error) {
    console.error('[Debug] Error adding theater:', error);
    toast.error('An error occurred. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>
