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
    <button
        class="flex items-center gap-2  rounded-full border border-[#DDDFF0] bg-white px-5 py-2 text-lg cursor-pointer font-bold text-gray-800 shadow-sm hover:bg-gray-100">
        <!-- Filter Icon Placeholder -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M6 12h12M10 20h4" />
        </svg>
        Filter
    </button>
      <button class=" flex items-center gap-2  rounded-full border border-[#DDDFF0] bg-white px-3 py-2 text-lg cursor-pointer font-bold text-gray-800 shadow-sm hover:bg-gray-100">
        <span class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <img  class="w-5 h-5" src="../assets/imgs/AdminHeader/menu.png"></img>
        </span>
      </button>
            <button class=" flex items-center gap-2  rounded-full border border-[#DDDFF0] bg-white px-3 py-2 text-lg cursor-pointer font-bold text-gray-800 shadow-sm hover:bg-gray-100">
        <span class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <img  class="w-5 h-5" src="../assets/imgs/AdminHeader/view.png"></img>
        </span>
      </button>
    </div>
  </header>
</template>
<script setup>
</script>