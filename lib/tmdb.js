const BASE_URL = process.env.TMDB_BASE_URL;
const TOKEN = process.env.TMDB_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  },
  next: { revalidate: 3600 }
};

// ✅ FIXED: Tambah parameter 'type' untuk bedain movie/tv
export async function getMovieDetails(id, type = 'movie') {
  try {
    // Kalau ada type dari card/link, langsung fetch yang sesuai
    const endpoint = type === 'tv' 
      ? `${BASE_URL}/tv/${id}?append_to_response=videos,credits`
      : `${BASE_URL}/movie/${id}?append_to_response=videos,credits`;

    const res = await fetch(endpoint, options);
    
    if (!res.ok) {
      // Kalau gagal, coba tipe satunya sebagai fallback
      const fallbackType = type === 'tv' ? 'movie' : 'tv';
      const fallbackRes = await fetch(
        `${BASE_URL}/${fallbackType}/${id}?append_to_response=videos,credits`,
        options
      );
      
      if (!fallbackRes.ok) return null;
      return await fallbackRes.json();
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch detail error:", error);
    return null;
  }
}

// ✅ FIXED: Sama, tambah parameter type
export async function getMovieVideos(id, type = 'movie') {
  try {
    const endpoint = type === 'tv' 
      ? `${BASE_URL}/tv/${id}/videos`
      : `${BASE_URL}/movie/${id}/videos`;

    const res = await fetch(endpoint, options);
    
    if (!res.ok) {
      // Fallback ke tipe satunya
      const fallbackType = type === 'tv' ? 'movie' : 'tv';
      const fallbackRes = await fetch(`${BASE_URL}/${fallbackType}/${id}/videos`, options);
      
      if (!fallbackRes.ok) return [];
      const data = await fallbackRes.json();
      return data.results || [];
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error Fetch Videos:", error);
    return [];
  }
}

// Popular/Home: Trending all (sudah OK)
export async function getPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/day?language=id-ID`, options);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Fetch popular error:", error);
    return [];
  }
}

// Search: Multi search (sudah OK)
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

// Genre movies
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

// Trending
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

// Season details (sudah OK)
export async function getSeasonDetails(tvId, seasonNumber) {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?append_to_response=videos`,
      options
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// TV functions
export async function getPopularTV() {
  const res = await fetch(`${BASE_URL}/tv/popular`, options);
  const data = await res.json();
  return data.results;
}

export async function getTVByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/tv?with_genres=${genreId}`, options);
  const data = await res.json();
  return data.results;
}

export async function getAiringTodayTV() {
  const res = await fetch(`${BASE_URL}/tv/airing_today`, options);
  const data = await res.json();
  return data.results;
}

export async function getFreshSeries() {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const res = await fetch(
    `${BASE_URL}/discover/tv?` + 
    `air_date.gte=${formatDate(lastWeek)}&` +
    `air_date.lte=${formatDate(today)}&` +
    `include_null_first_air_dates=false&` +
    `sort_by=popularity.desc`, 
    options
  );

  const data = await res.json();
  return data.results || [];
}

export async function getMoviesByActor(identifier, isId = false) {
  try {
    let personId = identifier;

    // Jika yang dikirim bukan ID (dari search manual), cari ID-nya dulu
    if (!isId) {
      const searchRes = await fetch(`${BASE_URL}/search/person?query=${encodeURIComponent(identifier)}&language=id-ID`, options);
      const searchData = await searchRes.json();
      personId = searchData.results?.[0]?.id;
    }

    if (!personId) return [];

    // Gunakan endpoint combined_credits yang sangat lengkap (Movie + TV)
    const creditsRes = await fetch(
      `${BASE_URL}/person/${personId}/combined_credits?language=id-ID`, 
      options
    );
    const creditsData = await creditsRes.json();

    // Urutkan berdasarkan popularitas agar film besar muncul di atas
    return creditsData.cast.sort((a, b) => b.popularity - a.popularity) || [];
  } catch (error) {
    console.error("Error Fetch Actor Credits:", error);
    return [];
  }
}