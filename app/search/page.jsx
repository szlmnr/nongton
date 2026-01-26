import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/moviecard";

export default async function SearchPage({ searchParams }) {
  // ✅ Logic Baru: Next.js 15 mewajibkan await pada searchParams
  const params = await searchParams;
  const query = params.q || "";

  // ✅ Logic Baru: Fetch data via server menggunakan lib/tmdb.js
  const results = await searchMovies(query);

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      {/* HEADER: Tetap pakai layout lu */}
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-8">
        Hasil pencarian: <span className="text-red-600">"{query}"</span>
      </h1>

      {results && results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {results
            .filter((item) => item.poster_path) // Tetap filter poster biar gak bolong
            .map((movie) => {
              // ✅ Logic Baru: Penentuan media type agar tidak 'undefined'
              // Karena lib/tmdb lu pakai search/multi, kita harus cek media_type
              const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
              
              const displayTitle = movie.title || movie.name || "Untitled";
              const displayYear = (movie.release_date || movie.first_air_date)?.split("-")[0] || "2025";
              
              // Slug builder (pertahankan format lu)
              const safeSlug = `${movie.id}-${displayTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")}`;

              return (
                <MovieCard
                  key={`${type}-${movie.id}`} // Gabungan type+id biar key benar-benar unik
                  id={movie.id}              // ✅ WAJIB: Biar Link di MovieCard gak undefined
                  type={type}                // ✅ WAJIB: Biar tau lari ke /movie/ atau /tv/
                  title={displayTitle}
                  year={displayYear}
                  slug={safeSlug}
                  poster={movie.poster_path}
                />
              );
            })}
        </div>
      ) : (
        /* EMPTY STATE: Tetap pakai layout lu */
        <div className="text-center py-20 text-zinc-500 uppercase text-xs font-bold tracking-widest border border-white/5 rounded-3xl">
          Konten "{query}" tidak ditemukan.
        </div>
      )}
    </div>
  );
}