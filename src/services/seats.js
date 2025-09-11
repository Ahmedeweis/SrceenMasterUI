// services/seats.js
import api from "./axios";
// جلب جميع المقاعد لشاشة معينة
export const getSeatsByScreenId = (screenId) => {
  return api.get(`/theater/get-screen-seats/${screenId}`);
};
// جلب جميع أنواع المقاعد
export const getSeatTypes = () => {
  return api.get('/theater/get-seat-types');
};
// حذف مقعد بناءً على seatId
export const deleteSeat = (seatId) => {
  return api.delete(`/theater/seat/${seatId}`);
};
export const addSeatType = (seatTypeData) => {
  return api.post('/theater/add-seat-type', seatTypeData);
};
export const deleteSeatType = (seatTypeId) => {
  return api.delete(`/theater/delete-seat-type/${seatTypeId}`);
};