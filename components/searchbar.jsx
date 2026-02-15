'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // 1. MASUKKAN TOKEN PANJANG LU DI SINI
  const READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWI0OTc0M2Y1MmNmZjZhMzQ2OTc4OTJmMDM4MjJmMSIsIm5iZiI6MTc2NjQxNzE0MC4wMTgsInN1YiI6IjY5NDk2MmY0YmU0ZmU1NzIzOTdhYzYzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MmMTIRrlgqPIkVmZbVScFbISbz7bhAIEKCvMzq2fA_g";

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Hanya fetch kalau user ngetik sesuatu
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=id-ID&include_adult=false`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${READ_ACCESS_TOKEN}`
            }
          }
        );
        const data = await res.json();

        if (data.results) {
          // Ambil 6 hasil teratas
          setSuggestions(data.results.slice(0, 6));
        }
      } catch (err) {
        console.error("TMDB Error:", err);
      }
    };

    // Debounce 300ms biar gak spam API
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query, READ_ACCESS_TOKEN]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-md group">
      {/* INPUT FIELD */}
      <form onSubmit={handleSearch} className="relative z-10">
        <input
          type="text"
          autoFocus
          placeholder="Cari film favoritmu..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full bg-neutral-900/80 backdrop-blur-md text-white text-base px-7 py-4 rounded-full outline-none border-2 transition-all duration-500
            ${isFocused
              ? "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] bg-black scale-[1.02]"
              : "border-white/10 hover:border-white/30"
            }`}
        />
        {/* Icon Search */}
        <button
          type="submit"
          className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 hover:scale-110 active:scale-90 ${isFocused ? 'text-red-500' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </form>

      {/* SUGGESTIONS DROPDOWN */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute bottom-[115%] md:top-[105%] md:bottom-auto left-0 right-0 mb-2 md:mb-0 bg-neutral-950/95 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] z-[9999] animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-top-1 duration-300">
          <div className="p-2 max-h-[50vh] overflow-y-auto">
            <p className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Hasil Pencarian</p>

            {suggestions.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  router.push(`/movie/${movie.id}`);
                  setQuery('');
                  setIsFocused(false);
                }}
                // ✅ Padding vertikal diubah dari py-3 ke py-1.5 agar lebih "pepet"
                className="flex items-center gap-3 px-3 py-1.5 hover:bg-red-600/20 rounded-xl cursor-pointer transition-all duration-200 group/item mb-0.5"
              >
                {/* Poster Lebih Kecil (Lebih Proporsional) */}
                <div className="relative shrink-0">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/40x60?text=No+Img'}
                    className="w-8 h-12 object-cover rounded-lg shadow-md group-hover/item:scale-105 transition-transform duration-300"
                    alt={movie.title}
                  />
                </div>

                {/* Info Film dengan Line Spacing Rapat */}
                <div className="flex flex-col overflow-hidden leading-tight">
                  <span className="text-xs font-bold text-white group-hover/item:text-red-500 transition-colors truncate">
                    {movie.title}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-md text-gray-400 font-medium">
                      {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </span>

                    <span className="text-[9px] text-yellow-500 flex items-center gap-0.5">
                      ★ {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}