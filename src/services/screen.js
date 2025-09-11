import api from "./axios";
// إضافة شاشة جديدة
const addScreen = (screenData) => {
  return api.post("/theater/add-screen", screenData);
};
// حذف شاشة بالـid
const deleteScreen = (id) => {
  return api.delete(`/theater/screen/${id}`);
};
// جلب الشاشات لمسرح محدد
const getScreensByTheater = (theaterId) => {
  return api.get(`/theater/${theaterId}/screens`);
};
export default { addScreen, deleteScreen, getScreensByTheater };
