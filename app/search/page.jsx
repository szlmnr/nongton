import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/moviecard";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q || "";

  const results = await searchMovies(query);

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-8">
        Hasil pencarian: <span className="text-red-600">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {results
            .filter((item) => item.poster_path)
            .map((movie) => {
              const displayTitle = movie.title || movie.name || "Untitled";
              const displayYear = (movie.release_date || movie.first_air_date)?.split("-")[0] || "2025";
              
              const safeSlug = `${movie.id}-${displayTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")}`;

              return (
                <MovieCard
                  key={movie.id}
                  title={displayTitle}
                  year={displayYear}
                  slug={safeSlug}
                  poster={movie.poster_path}
                />
              );
            })}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 uppercase text-xs font-bold tracking-widest border border-white/5 rounded-3xl">
          Konten "{query}" tidak ditemukan.
        </div>
      )}
    </div>
  );
}