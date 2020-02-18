import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://localhost:4000/api'
});

export const insertMovie = payload => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMoviesById = (id, payload) =>
  api.put(`/movie/${id}`, payload);
export const deleteMoviebyId = id => api.delete(`movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);

const apis = {
  insertMovie,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
  getMovieById
};

export default apis;
