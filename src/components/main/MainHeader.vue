<template>
        <!-- Header -->
<header class="flex items-center justify-between mb-6">
  <!-- Left section (User info) -->
  <div class="flex items-center gap-3">
    <!-- User Avatar -->
    <img
      src="../../assets/imgs/4.jpg"
      alt="User Avatar"
      class="w-10 h-10 rounded-full object-cover border-2 border-[#14111D]
             transition-transform duration-300 hover:scale-110 hover:shadow-lg"
    />
    <div>
      <h1 class="text-lg font-semibold bg-clip-text text-transparent
                 bg-gradient-to-r from-purple-400 to-pink-500">
        Hi Reza
      </h1>
      <p class="text-sm text-gray-400">Good Evening</p>
    </div>
  </div>
  <!-- وسط الهيدر -->
<div class="hidden sm:flex gap-4 items-center">
      <a href="#faq"
     class="bg-[#69fff8] text-black font-semibold px-4 py-2 rounded-lg hover:bg-white transition">
    Home
  </a>
  <a href="#about" class="text-gray-300 hover:text-white font-medium transition">About Us</a>
  <a href="#services" class="text-gray-300 hover:text-white font-medium transition">Services</a>
  <a href="#contact" class="text-gray-300 hover:text-white font-medium transition">Contact</a>
  <!-- Last item styled as a button -->
</div>
  <!-- Right section (Buttons) -->
  <div class="flex gap-3">
    <!-- Search -->
    <button
      class="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full
             transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-600 hover:to-purple-500
             hover:scale-110">
      <img src="../../assets/imgs/search.png" alt="search" class="w-5 h-5" />
    </button>
    <!-- Notifications -->
    <button
      class="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full
             transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-600 hover:to-purple-500
             hover:scale-110">
      <img src="../../assets/imgs/bell.png" alt="notifications" class="w-5 h-5" />
    </button>
    <!-- Inbox with notification badge -->
    <div class="relative">
      <button
        class="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full
               transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-600 hover:to-purple-500
               hover:scale-110">
        <img src="../../assets/imgs/inbox-.png" alt="inbox" class="w-5 h-5" />
      </button>
      <!-- Ping badge -->
      <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
    </div>
  </div>
</header>
</template>
<script setup>
</script>
