import api from "./axios";
// إضافة شو تايم
export const addShowtime = async (data) => {
  try {
    const response = await api.post("/show-time", data);
    return response.data;
  } catch (error) {
    console.error("Error adding showtime:", error);
    throw error;
  }
};
export const getShowtimesByMovie = (movieId) => {
  return api.get(`/show-time/movie/${movieId}`);
};
// حذف شو تايم
export const deleteShowtime = async (id) => {
  try {
    await api.delete(`/show-time/${id}`);
  } catch (error) {
    console.error("Error deleting showtime:", error);
    throw error;
  }
};