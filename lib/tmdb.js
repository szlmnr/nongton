// lib/tmdb.js
const BASE_URL = process.env.TMDB_BASE_URL;
const TOKEN = process.env.TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}` // Menggunakan Bearer Token
  },
  next: { revalidate: 3600 } // Cache data selama 1 jam
};


export async function getMovieDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?append_to_response=videos,credits`, 
      options
    );
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?language=id-ID`, options);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=id-ID`,
      options
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}