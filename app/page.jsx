import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/moviecard";
import {
  getPopularMovies,
  getMoviesByGenre,
  getTrendingMovies,
  getPopularTV,
  getTVByGenre,
  getMovieVideos,
} from "@/lib/tmdb";

export default async function HomePage() {
  // Ambil Data Movies
  const trendingMovies = await getTrendingMovies();
  const popularMovies = await getPopularMovies();
  const actionMovies = await getMoviesByGenre(28);
  const sciFiMovies = await getMoviesByGenre(878);

  // Ambil Data Series (TV)
  const popularTV = await getPopularTV();
  const latestTV = await getPopularTV(); // Bisa pakai trending TV kalau ada fungsinya
  const actionTV = await getTVByGenre(10759); // Action & Adventure (Genre ID TV beda sama Movie)
  const sciFiTV = await getTVByGenre(10765);  // Sci-Fi & Fantasy (Genre ID TV beda sama Movie)
  const featuredMovie = trendingMovies?.[Math.floor(Math.random() * trendingMovies.length)];

  const MovieSection = ({ title, data }) => (
    <section className="mb-16">
      <div className="px-6 md:px-12 mb-5 flex items-center gap-3">
        <div className="h-5 w-1 bg-brand-red rounded-full" />
        <h2 className="text-lg font-bold uppercase tracking-wide text-white/90">
          {title}
        </h2>
      </div>

      <div className="relative px-4 md:px-10">
        <div className="overflow-x-auto no-scrollbar rounded-3xl bg-black/20">
          <div className="flex gap-4 px-2 md:px-4 py-4 snap-x snap-mandatory">
            {data?.map((movie) => {
              // LOGIKA ANTI-ERROR (PENTING!)
              const displayTitle = movie.title || movie.name || "Untitled";
              const displayYear = (movie.release_date || movie.first_air_date)?.split("-")[0];
              const safeSlug = `${movie.id}-${displayTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")}`;

              return (
                <MovieCard
                  key={movie.id}
                  title={displayTitle}
                  poster={movie.poster_path}
                  year={displayYear}
                  slug={safeSlug}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const videos = await getMovieVideos(featuredMovie.id);
  const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube") || videos?.[0];

  return (
    <div className="flex flex-col overflow-x-hidden bg-black min-h-screen">
      <section className="relative min-h-screen flex items-end pb-56 md:pb-72 lg:pb-96 overflow-hidden">
        {featuredMovie && (
          <>
            <div className="absolute inset-0 z-0">
              {trailer ? (
                /* CONTAINER PEMAKSA - Fixed untuk cover penuh */
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=1&fs=0&showinfo=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    className="w-full h-full pointer-events-none opacity-50 scale-150"
                    style={{
                      border: 'none',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      minWidth: '100%',
                      minHeight: '100%',
                      width: '177.77vh',
                      height: '56.25vw'
                    }}
                    allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Background trailer"
                  />
                </div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                  alt={featuredMovie.title}
                  className="w-full h-full object-cover opacity-50"
                />
              )}

              {/* OVERLAY AGAR TEXT TERBACA */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative z-20 px-6 md:px-12 max-w-4xl">
              <h3 className="text-brand-magenta text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
                Featured Content
              </h3>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
                {featuredMovie?.title || featuredMovie?.name}
              </h1>
              <p className="text-gray-300 max-w-2xl mb-10 line-clamp-3">
                {featuredMovie?.overview}
              </p>
              <Link
                href={`/movie/${featuredMovie?.id}`}
                className="inline-flex items-center justify-center bg-brand-red text-white text-[11px] font-black py-3 px-10 rounded-full uppercase tracking-widest transition-all duration-300 shadow-[0_0_0_rgba(225,8,19,0)] hover:shadow-[0_0_25px_rgba(225,8,19,0.7)] hover:bg-red-600 hover:brightness-125 hover:scale-105 active:scale-95"
              >
                Watch Now
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ================= MOVIE SECTIONS ================= */}
      <div className="mt-32 md:mt-40 lg:mt-48">
        <h2 className="px-6 md:px-12 text-3xl font-black text-white italic mb-2 uppercase">Movies</h2>

        {/* Tambahkan .filter(m => m.title) agar Series tidak masuk sini */}
        <MovieSection title="Popular Movies" data={popularMovies?.filter(m => m.title)} />
        <MovieSection title="Action Packed" data={actionMovies?.filter(m => m.title)} />
        <MovieSection title="Sci-Fi Adventures" data={sciFiMovies?.filter(m => m.title)} />
      </div>

      {/* ================= SERIES SECTIONS ================= */}
      <div className="mt-10">
        <h2 className="px-6 md:px-12 text-3xl font-black text-white italic mb-2 uppercase">TV Series</h2>

        {/* Tambahkan .filter(m => m.name) agar Movie tidak masuk sini */}
        <MovieSection title="Popular Series" data={popularTV?.filter(m => m.name)} />
        <MovieSection title="TV Action & Adventure" data={actionTV?.filter(m => m.name)} />
        <MovieSection title="TV Sci-Fi & Fantasy" data={sciFiTV?.filter(m => m.name)} />
      </div>
    </div>
  );
}