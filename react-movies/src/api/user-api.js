import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api", 
});

http.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  console.log("Request Headers:", config.headers); 
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API request errpor, ", error);
    return Promise.reject(error);
  }
);


export const getFavorites = async () => http.get("/users/favorites");
export const addFavorite = async (movieId) => http.post("/users/favorites", { movieId });
export const deleteFavorite = async (movieId) => http.delete(`/users/favorites/${movieId}`);



export const addReview = async ( movieId, author, content, rating) => http.post("/users/reviews", { movieId, author, content, rating});



export const getPlaylist = async () => http.get("/users/playlist");
export const addPlaylist = async (movieId) => http.post("/users/playlist", { movieId });
export const deletePlaylist = async (movieId) => http.delete(`/users/playlist/${movieId}`);

