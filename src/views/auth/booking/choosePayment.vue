<template>
        <div class="relative bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
        <!-- Header -->
        <BookingSteps title="Choose Food" @back="$router.back()" />
      <!-- Title -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold bg-clip-text text-transparent mt-6 bg-gradient-to-r from-indigo-600 to-pink-500 pb-3">
          Choose Your Payment Method
        </h1>
      </div>
      <div class="flex gap-8 flex-wrap lg:flex-nowrap w-full flex-row-reverse">
        <!-- Payment Methods -->
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 flex-1 mr-5">
          <template v-if="loading">
            <!-- Skeleton Cards -->
            <div v-for="n in 3" :key="n" class="h-56 rounded-2xl bg-gray-200 animate-pulse"></div>
          </template>
          <template v-else>
            <div v-for="pm in paymentMethods" :key="pm.PaymentMethodId" @click="selectMethod(pm)"
              class="relative group cursor-pointer rounded-2xl backdrop-blur-xl bg-white/60 border transition-all p-6 flex flex-col items-center text-center hover:scale-105"
              :class="selectedMethod?.PaymentMethodId === pm.PaymentMethodId
                ? 'border-indigo-500 shadow-2xl ring-2 ring-indigo-300'
                : 'border-white/50 shadow-lg hover:shadow-xl'">
              <!-- Card Content -->
              <img :src="pm.ImageUrl" :alt="pm.PaymentMethodEn" class="w-16 h-16 object-contain mb-4" />
              <h3 class="font-bold text-lg text-gray-800">{{ pm.PaymentMethodEn }}</h3>
              <p class="text-sm text-gray-500">{{ pm.PaymentMethodAr }}</p>
              <p class="mt-2 text-indigo-600 font-semibold">
                Service Charge: {{ pm.ServiceCharge }} SAR
              </p>
              <!-- Choose Button -->
              <button class="mt-4 w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:opacity-90">
                Choose
              </button>
            </div>
          </template>
        </div>
        <!-- Invoice -->
        <div class="relative bg-gradient-to-br from-white flex flex-col to-indigo-50 rounded-2xl shadow-xl p-6 border border-indigo-100 w-full lg:w-96 mr-5 transition-all duration-500 ease-in-out"
          :class="loading ? 'h-64' : 'h-auto'">
          <!-- Skeleton -->
          <template v-if="loading">
            <div class="space-y-4 animate-pulse">
              <div class="h-6 bg-gray-200 rounded"></div>
              <div class="h-6 bg-gray-200 rounded"></div>
              <div class="h-6 bg-gray-200 rounded"></div>
              <div class="h-10 bg-gray-300 rounded mt-6"></div>
            </div>
          </template>
          <!-- Real Invoice -->
          <template v-else>
            <div class="flex-1">
              <h3 class="text-2xl font-extrabold text-indigo-700 mb-6 flex items-center gap-2 justify-end flex-row-reverse">
                Invoice
                <img src="../../../assets/imgs/payment/done.png" class="w-8" />
              </h3>
              <!-- Base Price -->
              <div class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
                <span class="font-semibold">{{ price }} SAR</span>
                <div class="flex items-center gap-2">
                  <img src="../../../assets/imgs/payment/reduce-cost.png" class="w-8" />
                  <span>Base Price</span>
                </div>
              </div>
              <!-- Selected Payment Method -->
              <div v-if="selectedMethod" class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
                <span class="font-semibold">{{ selectedMethod.PaymentMethodEn }}</span>
                <div class="flex items-center gap-2">
                  <img src="../../../assets/imgs/payment/credit-card.png" class="w-8" />
                  <span>Payment Method</span>
                </div>
              </div>
              <!-- Service Charge -->
              <div v-if="selectedMethod" class="flex justify-between items-center text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm mb-4 flex-row-reverse">
                <span class="font-semibold">{{ selectedMethod.ServiceCharge }} SAR</span>
                <div class="flex items-center gap-2">
                  <img src="../../../assets/imgs/payment/thunder.png" class="w-8" />
                  <span>Service Charge</span>
                </div>
              </div>
              <!-- Total -->
              <div class="border-t pt-4 flex justify-between items-center font-extrabold text-lg text-indigo-800 flex-row-reverse">
                <span>{{ total }} SAR</span>
                <div class="flex items-center gap-2">
                  <img src="../../../assets/imgs/payment/price-tag.png" class="w-8" />
                  <span>Total</span>
                </div>
              </div>
            </div>
            <!-- Confirm Button -->
            <button
              :disabled="!selectedMethod || loading"
              @click="confirmPayment"
              class="mt-6 w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <template v-if="loading">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Processing...
              </template>
              <template v-else>
                <img src="../../../assets/imgs/payment/coin.png" class="w-8" />
                Confirm Payment
              </template>
            </button>
          </template>
        </div>
      </div>
         </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BookingSteps from "../../../components/main/BookingSteps.vue"
const router = useRouter();
const price = router.options.history.state?.price || 50; // مثال سعر افتراضي
const ide = ref(router.options.history.state?.planId || router.options.history.state?.gameId || 123);
const type = ref(router.options.history.state?.type || "plan");
const paymentMethods = ref([]);
const selectedMethod = ref(null);
const loading = ref(false);
// حساب المجموع الكلي
const total = computed(() => {
  if (!selectedMethod.value) return price;
  return Number(price) + Number(selectedMethod.value.ServiceCharge);
});
// اختيار وسيلة الدفع
const selectMethod = (pm) => {
  selectedMethod.value = pm;
};
// داتا وهمية مؤقتة
const fetchPaymentMethods = async () => {
  loading.value = true;
  try {
    // هنا نضع بيانات وهمية بدل الـ API
    paymentMethods.value = [
      { PaymentMethodId: 1, PaymentMethodEn: "Credit Card", ServiceCharge: 5, IsEmbeddedSupported: true, ImageUrl: "/img/icons/vm.png" },
      { PaymentMethodId: 2, PaymentMethodEn: "PayPal",  ServiceCharge: 3, IsEmbeddedSupported: false, ImageUrl: "/img/icons/paypalColor.png" },
      { PaymentMethodId: 3, PaymentMethodEn: "Apple Pay",  ServiceCharge: 4, IsEmbeddedSupported: true, ImageUrl: "/img/icons/ap.png" },
    { PaymentMethodId: 4, PaymentMethodEn: "Kent", ServiceCharge: 3, IsEmbeddedSupported: false, ImageUrl: "/img/icons/kn.png" },
    ];
  } catch (e) {
    console.error("Error fetching payment methods:", e);
  } finally {
    loading.value = false;
  }
};
// محاكاة الدفع
const confirmPayment = async () => {
router.push({
  path: "/PaymentSuccess",
})
};
// عند تحميل الصفحة نجيب الداتا الوهمية
onMounted(async () => {
  await fetchPaymentMethods();
});
</script>
<style scoped>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 37%, #e0e0e0 63%);
  background-size: 200% 100%;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  animation: shimmer 1.2s infinite linear;
}
</style>
