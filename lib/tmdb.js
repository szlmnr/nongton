const BASE_URL = process.env.TMDB_BASE_URL;
const TOKEN = process.env.TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  },
  next: { revalidate: 3600 } // Cache 1 jam
};

// 1. DETAIL: Sekarang otomatis cek Movie dulu, kalau gagal cek TV
export async function getMovieDetails(id) {
  try {
    // Coba ambil sebagai Movie
    let res = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits`, options);
    let data = await res.json();

    // Jika gagal atau data kosong, coba ambil sebagai TV Series
    if (!res.ok || data.success === false) {
      res = await fetch(`${BASE_URL}/tv/${id}?append_to_response=videos,credits`, options);
      data = await res.json();
    }
    
    return data;
  } catch (error) {
    console.error("Fetch detail error:", error);
    return null;
  }
}

// 2. POPULAR/HOME: Ambil Campuran (Trending All) biar Series muncul di Beranda
export async function getPopularMovies() {
  try {
    // Menggunakan 'trending/all' supaya Movie & TV Series muncul barengan
    const res = await fetch(`${BASE_URL}/trending/all/day?language=id-ID`, options);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Fetch popular error:", error);
    return [];
  }
}

// 3. SEARCH: Sekarang cari ke 'multi' (Cari film & tv sekaligus)
export async function searchMovies(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&language=id-ID`,
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

// 4. GENRE: Tetap movie, tapi bisa ditambah logika TV jika perlu
export async function getMoviesByGenre(genreId) {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?with_genres=${genreId}`, options);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error Fetch Genre:", error);
    return [];
  }
}

// 5. TRENDING: Ambil trending harian untuk semua kategori
export async function getTrendingMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/week`, options);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error Fetch Trending:", error);
    return [];
  }
}

export async function getSeasonDetails(tvId, seasonNumber) {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?append_to_response=videos`,
      options
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function getPopularTV() {
  const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/popular`, options);
  const data = await res.json();
  return data.results;
}

export async function getTVByGenre(genreId) {
  const res = await fetch(`${process.env.TMDB_BASE_URL}/discover/tv?with_genres=${genreId}`, options);
  const data = await res.json();
  return data.results;
}

export async function getMovieVideos(id) {
  const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`, options);
  const data = await res.json();
  return data.results || [];
}