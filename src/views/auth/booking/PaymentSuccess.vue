<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <!-- أيقونة نجاح الدفع -->
    <div class="bg-green-100 rounded-full p-6 mb-6">
      <img src="../../../assets/imgs/Book/tick.png" alt="Success" class="w-16 h-16">
    </div>
    <!-- رسالة نجاح الدفع -->
    <h1 class="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
    <p class="text-gray-700 mb-6 text-center">
      Your payment has been processed successfully.
    </p>
    <!-- تفاصيل الدفع -->
    <div class="bg-white rounded-xl shadow p-6 w-full max-w-md mb-6">
      <div class="flex justify-between mb-2">
        <span class="font-semibold">Payment Method:</span>
        <span>{{ paymentMethod?.PaymentMethodEn || "N/A" }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="font-semibold">Service Charge:</span>
        <span>{{ paymentMethod?.ServiceCharge || 0 }} SAR</span>
      </div>
      <div class="flex justify-between font-bold text-lg mt-4 border-t pt-3">
        <span>Total Paid:</span>
        <span>{{ total }} SAR</span>
      </div>
    </div>
    <!-- زر تحميل PDF -->
    <button
      @click="downloadPDF"
      class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
    >
      Download Receipt (PDF)
    </button>
    <!-- زر العودة للصفحة الرئيسية -->
    <button
      @click="goHome"
      class="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg shadow transition-all"
    >
      Back to Home
    </button>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import jsPDF from "jspdf";
const router = useRouter();
const route = useRoute();
// استلام بيانات الدفع من query
const paymentUrl = route.query.paymentUrl || "";
const embedded = route.query.embedded || false;
const paymentMethod = ref(route.query.method ? JSON.parse(route.query.method) : null);
const price = ref(Number(route.query.price) || 50);
const total = computed(() => {
  if (!paymentMethod.value) return price.value;
  return price.value + Number(paymentMethod.value.ServiceCharge || 0);
});
// تحميل PDF
const downloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Payment Receipt", 20, 20);
  doc.setFontSize(14);
  doc.text(`Payment Method: ${paymentMethod.value?.PaymentMethodEn || "N/A"}`, 20, 40);
  doc.text(`Service Charge: ${paymentMethod.value?.ServiceCharge || 0} SAR`, 20, 50);
  doc.text(`Total Paid: ${total.value} SAR`, 20, 60);
  doc.save("PaymentReceipt.pdf");
};
// العودة للصفحة الرئيسية
const goHome = () => {
  router.push("/home");
};
onMounted(() => {
  if (!paymentUrl) {
    console.warn("No payment URL, showing demo success page.");
  }
});
</script>
<style scoped>
</style>
