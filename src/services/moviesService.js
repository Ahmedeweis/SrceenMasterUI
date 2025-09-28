import api from "./axios";
// Example URL: http://localhost:8080/movies/filter?page=0&size=30&adult=false
export const getMovies = async (filters = {}) => {
  const {
    page = 0,
    size = 20,
    title = "",
    overview = "",
    adult = false,
    sort = [],
  } = filters;
  try {
    const response = await api.post(
      "/movies/filter",
      { sort }, // body
      {
        params: { page, size, title, overview, adult }, // query string
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
