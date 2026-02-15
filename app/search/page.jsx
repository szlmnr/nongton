import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/moviecard";

export default async function SearchPage({ searchParams }) {
  // ✅ Next.js 15: Await searchParams
  const params = await searchParams;
  const query = params.q || params.query || "";

  // ✅ Pure Logic: Hanya panggil fungsi search standar
  const results = await searchMovies(query);

  // ✅ Filter Dasar: Hanya buang yang tidak punya poster
  const filteredResults = results?.filter((item) => 
    item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv')
  ) || [];

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      {/* Header Pencarian */}
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-8">
        Hasil pencarian: <span className="text-red-600">"{query}"</span>
      </h1>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-6 justify-items-center">
          {filteredResults.map((movie) => {
            // Tentukan tipe untuk link detail
            const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
            const displayTitle = movie.title || movie.name || "Untitled";
            const displayYear = (movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A";
            
            // Build slug yang aman
            const safeSlug = `${movie.id}-${displayTitle
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")}`;

            return (
              <MovieCard
                key={`search-pure-${type}-${movie.id}`}
                id={movie.id}
                type={type}
                title={displayTitle}
                year={displayYear}
                slug={safeSlug}
                poster={movie.poster_path}
              />
            );
          })}
        </div>
      ) : (
        /* Tampilan jika kosong */
        <div className="text-center py-20 text-zinc-500 uppercase text-xs font-bold tracking-widest border border-white/5 rounded-3xl">
          Konten "{query}" tidak ditemukan.
        </div>
      )}
    </div>
  );
}