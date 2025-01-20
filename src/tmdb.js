import dotenv from "dotenv";
import fetch from "node-fetch"; // Use `node-fetch` for API requests

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results; // Array of popular movies
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    return null;
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results; // Array of movies matching the query
  } catch (error) {
    console.error("Error searching for movies:", error.message);
    return null;
  }
}
