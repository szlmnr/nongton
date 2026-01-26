'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // 1. MASUKKAN TOKEN PANJANG LU DI SINI
  const READ_ACCESS_TOKEN = "PASTE_TOKEN_PANJANG_LU_DI_SINI";

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
        <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-red-500' : 'text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </form>

      {/* DROPDOWN SARAN (Glassmorphism) */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-[110%] left-0 right-0 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-[9999] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-3">
            <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Hasil Pencarian</p>
            {suggestions.map((movie) => (
  <div
    key={movie.id}
    onClick={() => {
      // ✅ FIX: Langsung arahkan ke detail, bukan ke page search lagi
      // Ini bakal mencegah "undefined" karena ID langsung diambil dari objek movie TMDB
      router.push(`/movie/${movie.id}`); 
      setQuery(''); // Clear input
      setIsFocused(false);
    }}
    className="flex items-center gap-4 px-4 py-3 hover:bg-red-600/20 rounded-[1.2rem] cursor-pointer transition-all duration-200 group/item mb-1"
  >
                {/* Poster Kecil */}
                <div className="relative shrink-0">
                   <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/40x60?text=No+Img'}
                    className="w-12 h-16 object-cover rounded-xl shadow-lg group-hover/item:scale-105 transition-transform duration-300"
                    alt={movie.title}
                  />
                </div>

                {/* Info Film */}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white group-hover/item:text-red-500 transition-colors truncate">
                    {movie.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">
                      {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </span>
                    <span className="text-[10px] text-yellow-500 flex items-center gap-1">
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