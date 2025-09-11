<template>
  <section class="min-h-screen bg-cover bg-center flex items-center justify-center p-8 bg-[#471558]">
    <div
      class="bg-white rounded-xl shadow-xl flex justify-between max-w-5xl w-full overflow-hidden transition-all p-4 duration-700">
      <!-- الفورم -->
      <transition name="slide-form" mode="out-in">
        <div class="flex items-center justify-center p-8 bg-gray-50 py-0 ml-3 w-[350px]" :key="isLogin">
          <div>
            <!-- Login Form -->
            <div v-show="isLogin" class="w-[300px]">
                          <!-- Logo -->
            <div class="flex flex-col items-center mb-6">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <img src="/public/logo.png" />
              </div>
              <h1
                class="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                Screen Master
              </h1>
            </div>
              <h2 class="text-3xl font-bold mt-5">Sign In</h2>
              <p class="text-gray-500 my-3">Hi there! Nice to see you again.</p>
              <form class="space-y-5" @submit.prevent="handleLogin">
                <div>
                  <label class="text-lg text-[#4D61EC] font-bold">Email</label>
                  <input type="email" v-model="loginEmail" placeholder="example@email.com"
                    class="w-full border-b font-bold border-gray-300 focus:border-indigo-500 focus:outline-none py-2 mt-1" />
                </div>
                <div>
                  <label class="text-lg text-[#4D61EC] font-bold">Password</label>
                  <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="loginPassword" placeholder="••••••••"
                      class="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-2 mt-1 pr-10" />
                    <button type="button" class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                      @click="togglePassword">
                      <img :src="showPassword ? eyeOff : eye" class="h-6 cursor-pointer" />
                    </button>
                  </div>
                </div>
                <button type="submit" class="w-full bg-[#084ad9] text-white py-2 rounded-lg cursor-pointer transition">
                  Sign in
                </button>
              </form>
              <div class="text-center my-4 text-gray-400">or use one of your social profiles</div>
              <div class="flex gap-4 justify-center mb-4"> <!-- زر Google --> <router-link to=""
                  class="flex-1 flex items-center justify-center gap-2 py-2 border-2 cursor-pointer border-black rounded-lg text-black hover:bg-gray-100 transition">
                  <img src="../../assets/imgs/google.png" class="w-5 h-5" /> <span class="font-medium">Google</span>
                </router-link> <!-- زر Facebook --> <router-link to=""
                  class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer bg-blue-700 text-white hover:bg-blue-800 transition">
                  <img src="../../assets/imgs/facebook.png" class="w-5 h-5" /> <span class="font-medium">Facebook</span>
                </router-link> </div>
            </div>
            <!-- Signup Form -->
            <div v-show="!isLogin">
              <h2 class="text-3xl font-bold mt-5">Sign Up</h2>
              <p class="text-gray-500 my-3">Create your new account</p>
              <form class="space-y-5" @submit.prevent="handleRegister">
                <div>
                  <label class="text-lg text-[#4D61EC] font-bold">Name</label>
                  <input type="text" v-model="name" placeholder="Your Name"
                    class="w-full border-b font-bold border-gray-300 focus:border-indigo-500 focus:outline-none py-2 mt-1" />
                </div>
                <div>
                  <label class="text-lg text-[#4D61EC] font-bold">Email</label>
                  <input type="email" v-model="email" placeholder="example@email.com"
                    class="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-2 mt-1" />
                </div>
                <div>
                  <label class="text-lg text-[#4D61EC] font-bold">Password</label>
                  <input type="password" v-model="password" placeholder="••••••••"
                    class="w-full border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-2 mt-1" />
                </div>
                <div class="flex items-start gap-2">
                  <input type="checkbox" id="terms" class="cursor-pointer scale-125 accent-[#084AD9] mt-1.5" />
                  <label for="terms" class="text-sm text-gray-600 font-bold">
                    I agree to the
                    <router-link to="/terms" class="text-blue-600 font-bold">Terms of Services</router-link>
                    and
                    <router-link to="/privacy" class="text-blue-600 font-bold">Privacy Policy</router-link>
                  </label>
                </div>
                <button type="submit" class="w-full bg-[#084ad9] text-white py-2 rounded-lg cursor-pointer transition">
                  Continue
                </button>
              </form>
            </div>
            <!-- زر التبديل دايمًا ظاهر -->
            <div class="flex justify-center items-center gap-2 text-base mt-8">
              <p class="text-gray-600 font-medium">{{ isLogin ? "Don't have an account?" : "Have an account?" }}</p>
              <button @click="toggleForm" class="text-[#084AD9] font-bold transition cursor-pointer">
                {{ isLogin ? "Sign Up" : "Sign In" }}
              </button>
            </div>
          </div>
        </div>
      </transition>
      <!-- صورة الجانب -->
      <transition name="slide-img" mode="out-in">
        <div class="w-[400px] h-[600px] relative overflow-hidden rounded-xl transition-all ">
          <svg viewBox="0 0 400 600" class="w-full h-full">
            <image :href="bg" class="w-full h-full" clip-path="url(#waveLowerRight)"
              preserveAspectRatio="xMidYMid slice" />
          </svg>
        </div>
      </transition>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import bg from "../../assets/imgs/ballerina.png";
import eye from "../../assets/imgs/eye.png";
import eyeOff from "../../assets/imgs/hide.png";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { register, login } from '../../services/authService';
const toast = useToast();
const loginEmail = ref('');
const loginPassword = ref('');
const router = useRouter();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const splitName = (fullName) => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    firstname.value = parts[0];
    lastname.value = "";
  } else {
    firstname.value = parts[0];
    lastname.value = parts.slice(1).join(" ");
  }
};
// state للتبديل بين login و signup
const isLogin = ref(true);
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
const isSignUp = ref(false)
const name = ref('')
const lastname = ref('')
const firstname = ref('');
const email = ref('');
const password = ref('');
const handleRegister = async () => {
  splitName(name.value);
  try {
    const userData = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    };
    const res = await register(userData);
    if (res && res.status >= 200 && res.status < 300) {
      router.push({ path: '/verify', query: { email: email.value } });
    } else {
      alert('حدث خطأ أثناء التسجيل');
    }
  } catch (err) {
    console.error('Error registering:', err);
    alert('حدث خطأ أثناء التسجيل');
  }
};
const handleLogin = async () => {
  try {
    const res = await login(loginEmail.value, loginPassword.value);
    if (res && res.status === 200) {
      const token = res.data.token;
      localStorage.setItem('token', token); // ✅ خزن التوكن
      toast.success("✅ تم تسجيل الدخول بنجاح");
      router.push("/home"); // أو أي صفحة بعد تسجيل الدخول
    } else {
      toast.error("❌ فشل تسجيل الدخول");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "❌ بيانات الدخول غير صحيحة");
  }
};
</script>
<style scoped>
/* حركة الفورم */
.slide-form-enter-active,
.slide-form-leave-active {
  transition: all 0.5s ease;
}
.slide-form-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-form-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
/* حركة الصورة */
.slide-img-enter-active,
.slide-img-leave-active {
  transition: all 0.5s ease 0.2s;
  /* 👈 خد بالك من 0.2s دي (delay) */
}
.slide-img-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-img-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>