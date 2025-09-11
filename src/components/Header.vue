<template>
  <header class="flex justify-between items-center mb-6 " style="font-family: 'Poppins', sans-serif;">
    <div class="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Cinema name or Movie name"
        class="w-full p-2 pl-10 border rounded-3xl placeholder-[#7F839E] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <img
        src="/img/search.png"
        alt="Search Icon"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500  scale-x-[-1]"
      >
    </div>
    <div class="flex space-x-4">
      <button class="p-2 text-gray-500 hover:text-gray-700">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm-1 1h12v10H4V5z"/>
        </svg>
      </button>
      <button class="p-2 text-gray-500 hover:text-gray-700">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H4z"/>
        </svg>
      </button>
    </div>
  </header>
</template>
<script setup>
</script>