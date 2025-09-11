import api from "./axios";
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response; // 🔹 ترجع response كامل وليس response.data
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
// ✅ دالة التحقق من الكود
export const verifyOTP = async (code, email) => {
  try {
    const response = await api.post('/auth/verify', {
      email,
      code
    });
    return response;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
// ✅ دالة إعادة إرسال الكود
export const resendOTP = async (email) => {
  try {
    const response = await api.post('/auth/resend-verification', {
      email
    });
    return response;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
// ✅ تسجيل الدخول
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/authenticate', {
      email,
      password
    });
    return response; // بيرجع الـ response كامل
  } catch (error) {
    throw error.response ? error.response : error;
  }
};