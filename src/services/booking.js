import api from "./axios";
export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};
// دالة لجلب حجوزات user حسب ID
export const getBookingsByUser = (userId) => {
  return api.get(`/bookings/user/${userId}`);
};
// 🆕 دالة لحذف حجز حسب ID
export const deleteBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};