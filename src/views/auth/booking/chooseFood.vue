<template>
    <div class="relative bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
        <!-- Header -->
        <BookingSteps title="Choose Food" @back="$router.back()" />
        <!-- Categories Tabs -->
        <div class="flex gap-4 px-4 mt-4 overflow-x-auto scrollbar-hide">
            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                class="px-4 py-2 rounded-full text-sm font-medium transition" :class="selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border cursor-pointer border-gray-200'">
                {{ cat }}
            </button>
        </div>
        <!-- Food Grid -->
        <div class="flex-1 overflow-y-auto px-4 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in filteredFood" :key="item.name"
                class="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col">
                <div class="w-full h-60 bg-gray-200 rounded-t-xl relative overflow-hidden">
                    <img v-if="item.image" :src="item.image" loading="lazy"
                        class="w-full h-full object-cover rounded-t-xl absolute top-0 left-0" />
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-lg">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 mb-2">{{ item.desc }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-3">
                        <span class="font-semibold text-indigo-600">AED {{ item.price }}</span>
                        <!-- Counter -->
                        <div class="flex items-center gap-2">
                            <button @click="decrease(item)"
                                class="w-8 h-8 cursor-pointer rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                            <span class="w-6 text-center font-medium">{{ item.qty }}</span>
                            <button @click="increase(item)"
                                class="w-8  cursor-pointer h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sticky Footer -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg p-4">
            <h1 class="text-2xl font-bold text-[#24054C] mb-2 text-left tracking-wide">Food Payment</h1>
            <div class="flex justify-between items-center mb-3 px-3">
                <span class="text-lg font-semibold text-[#24054C]">Total:</span>
                <span class="text-xl font-bold text-indigo-600">AED {{ total }}</span>
            </div>
            <div class="flex justify-evenly w-full gap-4 mt-4"><button
                @click="goToPayment"
                    class="w-1/3 bg-gradient-to-r  from-indigo-700 to-purple-700 text-white hover:  py-2.5 rounded-md font-semibold text-sm sm:text-base cursor-pointer shadow-md hover:from-white hover:to-white hover:text-red-500 hover:shadow-lg transition duration-300">
                     Continue →</button><button
                      @click="goToPayment"
                    class="w-1/3 border border-gray-300 cursor-pointer text-gray-700 py-2.5 rounded-md font-medium hover:bg-gray-100 transition text-sm sm:text-base">Cancel food</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue"
import BookingSteps from "../../../components/main/BookingSteps.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const categories = ["Popcorn", "Drinks", "Snacks"]
const food = ref([
    { name: "Salted Popcorn", desc: "Classic cinema popcorn", price: 20, image: "/img/food/popcorn.webp", category: "Popcorn", qty: 0 },
    { name: "Sweet Popcorn", desc: "Caramel flavored popcorn", price: 25, image: "/img/food/sweet-popcorn.webp", category: "Popcorn", qty: 0 },
    { name: "Cola Machine", desc: "Refreshing Coca Cola", price: 15, image: "/img/food/cola.webp", category: "Drinks", qty: 0 },
    { name: "Soda Bottle", desc: "Sparkling soda drink", price: 10, image: "/img/food/soda.webp", category: "Drinks", qty: 0 },
    { name: "Fries", desc: "Crispy golden fries", price: 18, image: "/img/food/fries.webp", category: "Snacks", qty: 0 },
    { name: "Pizza", desc: "Cheesy Pizza", price: 22, image: "/img/food/cheese-pops.webp", category: "Snacks", qty: 0 },
    { name: "Nachos Cheese", desc: "Crunchy nachos with cheese", price: 28, image: "/img/food/nachos.webp", category: "Snacks", qty: 0 },
    { name: "Salad", desc: "Fresh mixed salad", price: 15, image: "/img/food/salad.webp", category: "Snacks", qty: 0 },
])
const selectedCategory = ref("Popcorn")
const filteredFood = computed(() =>
    food.value.filter(item => item.category === selectedCategory.value)
)
const increase = (item) => {
    item.qty++
}
const decrease = (item) => {
    if (item.qty > 0) item.qty--
}
const total = computed(() =>
    food.value.reduce((sum, item) => sum + item.qty * item.price, 0)
)
const goToPayment = () => {
    router.push("/choosePayment")
}
</script>
<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
