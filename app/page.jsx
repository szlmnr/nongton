import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/moviecard";
import {
  getPopularMovies,
  getMoviesByGenre,
  getTrendingMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const popularMovies = await getPopularMovies();
  const actionMovies = await getMoviesByGenre(28);
  const sciFiMovies = await getMoviesByGenre(878);

  const featuredMovie = trendingMovies?.[0];

  const MovieSection = ({ title, data }) => (
    <section className="mb-16">
      {/* HEADER */}
      <div className="px-6 md:px-12 mb-5 flex items-center gap-3">
        <div className="h-5 w-1 bg-brand-red rounded-full" />
        <h2 className="text-lg font-bold uppercase tracking-wide text-white/90">
          {title}
        </h2>
      </div>

      {/* SCROLL WRAPPER (ROUND CORNER KIRI KANAN) */}
      <div className="relative px-4 md:px-10">
        <div
          className="
            overflow-x-auto no-scrollbar
            rounded-3xl
            bg-black/20
          "
        >
          {/* INNER ROW */}
          <div
            className="
              flex gap-4
              px-2 md:px-4 py-4
              snap-x snap-mandatory
            "
          >
            {data.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                year={movie.release_date?.split("-")[0]}
                slug={`${movie.id}-${movie.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[65vh] md:min-h-[80vh] flex items-end pb-14 pt-24">
        {featuredMovie && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/original${
                featuredMovie.backdrop_path ||
                featuredMovie.poster_path
              }`}
              alt={featuredMovie.title}
              fill
              priority
              className="object-cover absolute inset-0 z-0"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black/20" />
          </>
        )}

        {/* HERO CONTENT */}
        <div className="relative z-20 px-6 md:px-12 max-w-4xl">
          <h3 className="text-brand-magenta text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
            Featured Movie
          </h3>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
            {featuredMovie?.title}
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10 line-clamp-3">
            {featuredMovie?.overview}
          </p>

          <Link
            href={`/movie/${featuredMovie?.id}`}
            className="
              inline-flex items-center justify-center
              bg-brand-red hover:bg-red-700
              text-white text-xs font-bold
              py-4 px-12 rounded-full
              uppercase tracking-widest
              shadow-lg shadow-red-600/20
            "
          >
            Watch Now
          </Link>
        </div>
      </section>

      

      {/* ================= SECTIONS ================= */}
      <MovieSection title="Popular" data={popularMovies} />
      <MovieSection title="Action Packed" data={actionMovies} />
      <MovieSection title="Sci-Fi Adventures" data={sciFiMovies} />
    </div>
  );
}
