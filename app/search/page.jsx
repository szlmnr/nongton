import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/moviecard";

export default async function SearchPage({ searchParams }) {
  // Tunggu (await) searchParams karena di Next.js 15+ ini adalah Promise
  const params = await searchParams;
  const query = params.q || "";

  const results = await searchMovies(query);

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-8">
        Hasil pencarian: <span className="text-red-500">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.release_date?.split("-")[0]}
              slug={`${movie.id}-${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              poster={movie.poster_path}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          Film "{query}" tidak ditemukan.
        </div>
      )}
    </div>
  );
}