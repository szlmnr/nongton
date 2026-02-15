import Image from "next/image";
import { getEventMovies } from '@/lib/tmdb';
import { getActiveEvent } from '@/utils/eventHelper';
import SpecialEventSection from '@/components/SpecialEventSection';
import Link from "next/link";
import MovieCard from "@/components/moviecard";
import {
  getPopularMovies,
  getMoviesByGenre,
  getTrendingMovies,
  getPopularTV,
  getTVByGenre,
  getFreshSeries,
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
  const latestTV = await getPopularTV();
  const actionTV = await getTVByGenre(10759);
  const freshSeries = await getFreshSeries();
  const sciFiTV = await getTVByGenre(10765);
  const featuredMovie = trendingMovies?.[Math.floor(Math.random() * trendingMovies.length)];

  const activeEvent = getActiveEvent();
  const eventMovies = activeEvent ? await getEventMovies(activeEvent) : [];


  // ✅ FIX: Tambah parameter mediaType untuk bedain movie/tv
  const MovieSection = ({ title, data, mediaType = 'movie', genreId }) => (
    <section className="mb-12 md:mb-16">
      {/* HEADER AREA */}
      <div className="px-6 md:px-12 mb-4 md:mb-5 flex items-center justify-between"> {/* Tambah justify-between */}

        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-4 md:h-5 w-1 bg-brand-red rounded-full" />
          <h2 className="text-base md:text-lg font-bold uppercase tracking-wide text-white/90">
            {title}
          </h2>
        </div>

        {/* TOMBOL SEE ALL: Logic baru di sini tanpa ganggu list film */}
        {genreId && (
          <Link
            href={`/${mediaType === 'tv' ? 'tv' : 'movie'}/genre/${genreId}`}
            className="inline-flex items-center justify-center text-white/50 hover:text-white text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95"
  >
            See All
          </Link>
        )}
      </div>

      <div className="relative px-4 md:px-10">
        <div className="overflow-x-auto no-scrollbar rounded-2xl md:rounded-3xl bg-black/20">
          <div className="flex gap-3 md:gap-4 px-2 md:px-4 py-3 md:py-4 snap-x snap-mandatory">
            {data?.map((item) => {
              // ✅ DETEKSI TYPE: Cek dari media_type atau dari field khas movie/tv
              const type = item.media_type || mediaType || (item.first_air_date ? 'tv' : 'movie');
              const displayTitle = item.title || item.name || "Untitled";
              const displayYear = (item.release_date || item.first_air_date)?.split("-")[0];
              const safeSlug = `${item.id}-${displayTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")}`;

              return (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  type={type}
                  title={displayTitle}
                  poster={item.poster_path}
                  year={displayYear}
                  voteAverage={item.vote_average}      // ✅ Tambah ini
                  genres={item.genres || []}            // ✅ Tambah ini (tapi mungkin kosong dari list)
                  runtime={item.runtime}                // ✅ Tambah ini (biasanya cuma ada di detail)
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  const videos = await getMovieVideos(featuredMovie?.id, featuredMovie?.media_type || 'movie');
  const trailer = videos?.find(v => v.type === "Trailer" && v.site === "YouTube") || videos?.[0];

  return (
    <div className="flex flex-col overflow-x-hidden bg-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-end pb-20 sm:pb-24 md:pb-32 lg:pb-40 overflow-hidden">
        {featuredMovie && (
          <>
            <div className="absolute inset-0 z-0">
              {trailer ? (
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
                  alt={featuredMovie.title || featuredMovie.name}
                  className="w-full h-full object-cover opacity-50"
                />
              )}

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
            </div>

            <div className="relative z-20 px-6 md:px-12 max-w-4xl">
              <h3 className="text-brand-magenta text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-3 md:mb-4">
                Featured Content
              </h3>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
                {featuredMovie?.title || featuredMovie?.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mb-8 sm:mb-9 md:mb-10 line-clamp-3">
                {featuredMovie?.overview}
              </p>
              <Link
                href={featuredMovie?.media_type === 'tv'
                  ? `/tv/${featuredMovie?.id}`
                  : `/movie/${featuredMovie?.id}`
                }
                className="inline-flex items-center justify-center bg-brand-red text-white text-[10px] sm:text-[11px] font-black py-2.5 sm:py-3 px-8 sm:px-10 rounded-full uppercase tracking-widest transition-all duration-300 shadow-[0_0_0_rgba(225,8,19,0)] hover:shadow-[0_0_25px_rgba(225,8,19,0.7)] hover:bg-red-600 hover:brightness-125 hover:scale-105 active:scale-95"
              >
                Watch Now
              </Link>
            </div>
          </>
        )}
      </section>

      {activeEvent && eventMovies.length > 0 && (
        <SpecialEventSection 
          eventType={activeEvent} 
          data={eventMovies} 
        />
      )}

      {/* ================= MOVIE SECTIONS ================= */}
      <div className="mt-8 sm:mt-10 md:mt-16 lg:mt-20">
        <h2 className="px-6 md:px-12 text-2xl sm:text-3xl font-black text-white italic mb-2 uppercase">Movies</h2>

        <MovieSection
          title="Popular Movies"
          data={popularMovies?.filter(m => m.title)}
          mediaType="movie"
        />
        <MovieSection
          title="Action Packed"
          data={actionMovies?.filter(m => m.title)}
          mediaType="movie"
          genreId={28}
        />
        <MovieSection
          title="Sci-Fi Adventures"
          data={sciFiMovies?.filter(m => m.title)}
          mediaType="movie"
          genreId={878}
        />
      </div>

      {/* ================= SERIES SECTIONS ================= */}
      <div className="mt-8 sm:mt-10">
        <h2 className="px-6 md:px-12 text-2xl sm:text-3xl font-black text-white italic mb-2 uppercase">TV Series</h2>

        <MovieSection
          title="Fresh Series"
          data={freshSeries?.filter(m => m.name)}
          mediaType="tv"
        />
        <MovieSection
          title="Popular Series"
          data={popularTV?.filter(m => m.name)}
          mediaType="tv"
        />
        <MovieSection
          title="TV Action & Adventure"
          data={actionTV?.filter(m => m.name)}
          mediaType="tv"
          genreId={10759}
        />
        <MovieSection
          title="TV Sci-Fi & Fantasy"
          data={sciFiTV?.filter(m => m.name)}
          mediaType="tv"
          genreId={10765}
        />
      </div>
    </div>
  );
}