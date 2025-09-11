<template>
<div class="min-h-screen w-full flex flex-col items-center justify-center p-4  relative"
     style="background: linear-gradient(to bottom left,#031846 , #2966A9 );">
      <div class="bg-white rounded-xl shadow-xl items-center p-3 overflow-hidden flex justify-between max-w-5xl w-full transition-all duration-700">
<div class="w-[400px] h-[600px] relative overflow-hidden rounded-xl transition-all">
      <svg viewBox="0 0 400 600" class="w-full h-full">
      <image
        :href="bg"
        class="w-full h-full"
        clip-path="url(#waveLowerRight)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
</div>
        <div class=" p-3 mr-6">
<div class="flex justify-center mb-2">
  <img src="../../assets/imgs/secure.png" class="h-28 w-auto object-contain mb-4">
</div>
      <h3 class="text-2xl mb-5 text-center text-[#32357B] font-bold">Verification code</h3>
      <p class="text-lg text-[#7177A8] text-center" > We have sent verification code <br> to Your Email </p>
      <div class="flex gap-3 justify-center mb-2 flex-col">
<div class="flex gap-3 justify-center mb-2">
<input
  v-for="(char, index) in code"
  :key="index"
  v-model="code[index]"
  :id="`code-${index}`"
  maxlength="1"
  type="text"
  :class="[
    'w-12 h-12 mt-[30px] text-center text-2xl rounded-lg bg-[#F5F6FB] focus:outline-none placeholder-[#32357B] text-[#32357B] transition-all duration-200',
    char ? 'border-2 border-[#32357B] ' : 'border border-transparent',
    'focus:border-[#32357B]'
  ]"
  @input="(e) => {
    // هنا مش هنعمل فلترة على الحروف/أرقام
    focusNext(e, index);
  }"
/>
</div>
<div class="flex justify-evenly items-center">
  <h2 class="text-[#010e65] font-bold">{{ email }}</h2>
<img src="../../assets/imgs/edit.png" class="w-10 rounded-full p-2 cursor-pointer" style="border: 2px solid #E3E3ED;">
</div>
 <button
  type="button"
  class="w-full text-[#33377B] font-bold py-2 rounded-xl cursor-pointer transition"
  style="border: solid #E6E6EF 3px"
  @click="handleResend"
>
  Send Again
</button>
<button
  type="submit"
  class="w-full bg-[#33377B] text-white py-2  rounded-xl cursor-pointer transition"
  @click="handleVerify"
>
  Submit
</button>
</div>
</div>
      </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import bg from "../../assets/imgs/ballerina.png";
import { verifyOTP, resendOTP } from '../../services/authService';
import { useToast } from "vue-toastification"
const router = useRouter()
const route = useRoute()
const toast = useToast()
// جاي من signup
const email = route.query.email || ''
// الحقول بتاعة الكود
const code = ref(['', '', '', '', '', ''])
// نجمع الكود
const verificationCode = computed(() => code.value.join(''))
const handleVerify = async () => {
  try {
    const otp = verificationCode.value
    if (!otp || otp.length < 6) {
      toast.warning("⚠️ من فضلك أدخل الكود كامل")
      return
    }
    const res = await verifyOTP(otp, email)
    if (res && res.status === 200) {
      toast.success("✅ تم التحقق بنجاح", {
        autoClose: 2000,
        position: "top-right"
      })
      setTimeout(() => {
        router.push("/signup") // 👈 هيوديك ع signup
      }, 1500)
    } else {
      toast.error("❌ حصل خطأ أثناء التحقق")
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "❌ رمز التحقق غير صحيح")
  }
}
const handleResend = async () => {
  try {
    if (!email) {
      toast.warning("⚠️ مفيش إيميل مسجل")
      return
    }
    const res = await resendOTP(email)
    if (res && res.status === 200) {
      toast.success("📧 تم إعادة إرسال الكود على إيميلك")
    } else {
      toast.error("❌ حصل خطأ أثناء إعادة الإرسال")
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "❌ فشل إعادة إرسال الكود")
  }
}
// التنقل بين الخانات
const focusNext = (event, index) => {
  const input = event.target
  if (input.value.length === 1 && index < code.value.length - 1) {
    const nextInput = document.getElementById(`code-${index + 1}`)
    nextInput?.focus()
  }
}
</script>
