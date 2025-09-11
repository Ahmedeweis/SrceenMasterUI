import api from "./axios";
const addTheater = (theaterData) => {
  return api.post("/theater/add-theater", theaterData);
};
const getTheaters = () => {
  return api.get("/theater/get-theaters");
}
const deleteTheater = (id) => {
  return api.delete(`/theater/delete-theater/${id}`);
}
export default { addTheater, getTheaters , deleteTheater };
