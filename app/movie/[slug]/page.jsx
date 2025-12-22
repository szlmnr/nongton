import VideoPlayer from "@/components/videoplayer";
import AdsBanner from "@/components/adsbanner";
import MovieCard from "@/components/moviecard";
import { getMovieDetails, getPopularMovies } from "@/lib/tmdb";
import translate from 'google-translate-api-next';
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MovieDetailPage({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const movieId = slug.split("-")[0];
  
  const [movie, recommendations] = await Promise.all([
    getMovieDetails(movieId),
    getPopularMovies(),
  ]);

  if (!movie) notFound();

  // Logika Terjemahan Sinopsis
  let sinopsisFinal = movie.overview;
  if (movie.overview) {
    try {
      const res = await translate(movie.overview, { to: 'id' });
      sinopsisFinal = res.text;
    } catch (error) {
      sinopsisFinal = movie.overview;
    }
  }

  // --- LOGIKA TRAILER YOUTUBE ---
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const videoSrc = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  // --- LOGIKA FULL MOVIE EMBED (IDLIX/VIDSRC) ---
  const fullMovieSrc = `https://vidsrc.to/embed/movie/${movie.id}`;

  const cast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="hidden md:block relative w-44 h-64 flex-none shadow-2xl border border-white/10 rounded-2xl overflow-hidden">
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  fill 
                  alt={movie.title} 
                  className="object-cover" 
                />
            </div>
            <div className="space-y-4 pb-4">
              <p className="text-neon-yellow text-[10px] font-black uppercase tracking-[0.4em]">SalStream Exclusive</p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400">
                <span className="text-neon-yellow">⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>{movie.release_date?.split("-")[0]}</span>
                <span>{movie.runtime} Min</span>
                <div className="flex gap-2">
                  {movie.genres?.slice(0, 2).map(g => (
                    <span key={g.id} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] uppercase">{g.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-16">
        
        {/* 2. TRAILER SECTION */}
        {videoSrc && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">Official Trailer</h2>
              <AdsBanner />
            </div>
            <VideoPlayer src={videoSrc} />
          </section>
        )}

        {/* 3. FULL MOVIE PLAYER SECTION (IDLIX STYLE) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-neon-yellow/30 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-neon-yellow animate-pulse" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">SalStream Cinema <span className="text-zinc-500 font-medium">— Full Movie</span></h2>
          </div>
          
          <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/5">
            <iframe
              src={fullMovieSrc}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              title={`${movie.title} Full Movie`}
            ></iframe>
          </div>
          <div className="flex justify-between items-center px-2">
             <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Server: SalStream-Main-V1</p>
             <p className="text-[10px] text-neon-yellow font-bold uppercase tracking-[0.2em] animate-bounce">Auto Subtitle Indo Active</p>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-12">
          {/* KOLOM KIRI: Sinopsis & Cast */}
          <div className="md:col-span-2 space-y-10">
            <section>
              <h3 className="text-neon-yellow uppercase tracking-[0.3em] text-[10px] font-black mb-4">Storyline</h3>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-200">
                {sinopsisFinal || "Sinopsis tidak tersedia."}
              </p>
            </section>

            <section>
              <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-black mb-5">Top Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cast.map((person) => (
                  <div key={person.id} className="flex items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-white/5 hover:bg-zinc-900 transition-colors">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                      <Image 
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : "/no-avatar.png"}
                        fill
                        alt={person.name}
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black truncate uppercase">{person.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{person.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* KOLOM KANAN: Detail Info */}
          <aside className="space-y-6 bg-zinc-900/20 p-8 rounded-3xl border border-white/5 h-fit backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6">
                <div>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Status</p>
                  <p className="font-bold text-sm uppercase">{movie.status}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Production</p>
                  <p className="font-bold text-sm">{movie.production_companies?.[0]?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Original Language</p>
                  <p className="font-bold text-sm uppercase">{movie.original_language}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Budget</p>
                  <p className="font-bold text-sm text-neon-yellow">${movie.budget?.toLocaleString() || "-"}</p>
                </div>
            </div>
          </aside>
        </div>

        {/* 4. REKOMENDASI SECTION */}
        <section className="pt-12 border-t border-white/5">
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-2xl font-black uppercase tracking-tighter">Recommended for you</h2>
             <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {recommendations.slice(0, 5).map((item) => (
              <MovieCard
                key={item.id}
                title={item.title}
                year={item.release_date?.split("-")[0]}
                slug={`${item.id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                poster={item.poster_path}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}