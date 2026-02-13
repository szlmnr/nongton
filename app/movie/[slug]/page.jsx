import VideoPlayer from "@/components/videoplayer";
import AdsBanner from "@/components/adsbanner";
import MovieCard from "@/components/moviecard";
import { getMovieDetails, getPopularMovies } from "@/lib/tmdb";
import translate from 'google-translate-api-next';
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MovieDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const { server } = await searchParams;

  if (!slug) return notFound();
  const movieId = slug;

  // ✅ PENTING: Pass 'movie' sebagai type
  const [movie, recommendations] = await Promise.all([
    getMovieDetails(movieId, 'movie'),
    getPopularMovies(),
  ]);

  if (!movie) notFound();

  // ✅ VALIDASI: Kalau ternyata TV, tolak!
  if (movie.first_air_date) {
    return notFound();
  }

  const currentServer = server || "1";

  // ✅ MOVIE URLs Only
  const servers = {
    "1": `https://vidsrc.to/embed/movie/${movie.id}`,
    "2": `https://vidsrc.xyz/embed/movie/${movie.id}`,
    "3": `https://vidsrc.me/embed/movie/${movie.id}`,
    "4": `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`
  };

  const fullMovieSrc = servers[currentServer] || servers["1"];

  let sinopsisFinal = movie.overview;
  if (movie.overview) {
    try {
      const res = await translate(movie.overview, { to: 'id' });
      sinopsisFinal = res.text;
    } catch (error) {
      sinopsisFinal = movie.overview;
    }
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const videoSrc = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  const cast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || "Movie Poster"}
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
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                fill
                alt={movie.title}
                className="object-cover"
              />
            </div>
            <div className="space-y-4 pb-4">
              <p className="text-neon-yellow text-[10px] font-black uppercase tracking-[0.4em]">
                SalStream Exclusive
              </p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400">
                <span className="flex items-center gap-1 text-neon-yellow font-bold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span>{movie.release_date?.split("-")[0]}</span>
                {movie.runtime && <span>{movie.runtime} Min</span>}
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

      <div key={`${slug}-${currentServer}`} className="max-w-6xl mx-auto p-8 space-y-16">

        {/* OFFICIAL TRAILER */}
        {videoSrc && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">Official Trailer</h2>
              <AdsBanner />
            </div>
            <VideoPlayer src={videoSrc} />
          </section>
        )}

        {/* PLAYER SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neon-yellow/30 pb-4">
            <div className="flex items-center justify-center gap-3 flex-1">
              <div className="w-2.5 h-2.5 rounded-full bg-neon-yellow animate-pulse" />
              <h2
                className="text-2xl font-black uppercase tracking-tighter bg-gradient-to-r from-transparent via-white to-transparent bg-[length:200%_100%] bg-clip-text text-transparent opacity-80"
                style={{
                  animation: 'spotlight 3s linear infinite',
                }}
              >
                <style dangerouslySetInnerHTML={{
                  __html: `
    @keyframes spotlight {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}} />
                SalStream Cinema
              </h2>
            </div>
          </div>

          <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/5">
            <iframe
              src={fullMovieSrc}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              referrerPolicy="no-referrer-when-downgrade"
              allow="autoplay; encrypted-media; picture-in-picture"
              title={movie.title}
            ></iframe>
          </div>

          {/* SERVER SELECTOR - ✅ Fixed: 1 Row 4 Columns */}
          <div className="flex flex-col gap-3 mt-6 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Pilih Server:</span>
            </div>

            {/* ✅ Grid 4 Columns di semua breakpoint */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "1", label: "Alpha", provider: "Vidsrc.to" },
                { id: "2", label: "Beta", provider: "Vidsrc.xyz" },
                { id: "3", label: "Gamma", provider: "Vidsrc.me" },
                { id: "4", label: "Delta", provider: "Multiembed" }
              ].map((srv) => {
                const isSelected = String(currentServer) === String(srv.id);

                return (
                  <Link
                    key={srv.id}
                    href={`?server=${srv.id}`}
                    scroll={false}
                    className={`group relative overflow-hidden px-2 xs:px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 border shadow-lg ${isSelected
                      ? "bg-green-600 border-green-500 shadow-green-500/30"
                      : "bg-zinc-900 border-white/5 hover:border-green-500/40"
                      }`}
                  >
                    <div className="relative z-10 flex flex-col items-start leading-tight">
                      <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase ${isSelected ? "text-white" : "text-white"
                        }`}>
                        {srv.label}
                      </span>
                      <span className={`text-[7px] xs:text-[8px] sm:text-[9px] font-bold ${isSelected ? "text-green-100" : "text-zinc-500"
                        }`}>
                        {srv.provider}
                      </span>
                    </div>

                    {!isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block">
              <p className="text-[9px] text-zinc-500 italic">Gunakan server Beta/Gamma jika Alpha 'Unavailable'</p>
            </div>
          </div>

          <div className="flex justify-between items-center px-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Server: SalStream-Main-V1</p>
            <p className="text-[10px] text-neon-yellow font-bold uppercase tracking-[0.2em] animate-bounce">Auto Subtitle Indo Active</p>
          </div>
        </section>

        {/* INFO SECTION */}
        <div className="grid md:grid-cols-3 gap-12">
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
                  /* 1. Tambahkan Link sebagai pembungkus utama card */
                  <Link
                    key={person.id}
                    href={`/search/cast/${person.id}?name=${encodeURIComponent(person.name)}`}
                    className="flex items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-white/5 hover:bg-zinc-800/60 transition-colors group"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                      <Image
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : "/no-avatar.png"}
                        fill
                        alt={person.name}
                        /* 2. Opsional: Tambahkan efek hover pada gambar */
                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black truncate uppercase text-zinc-200 group-hover:text-white">{person.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{person.character}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 bg-zinc-900/20 p-8 rounded-3xl border border-white/5 h-fit backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Status</p>
                <p className="font-bold text-sm uppercase">{movie.status}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Type</p>
                <p className="font-bold text-sm uppercase text-neon-yellow">MOVIE</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Original Language</p>
                <p className="font-bold text-sm uppercase">{movie.original_language}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Release Date</p>
                <p className="font-bold text-sm uppercase">{movie.release_date}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* RECOMMENDATIONS */}
        <section className="pt-16 mt-16 border-t border-white/5">
          <div className="px-6 md:px-12 mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide text-white">
              Recommended for you
            </h2>
          </div>

          <div className="px-6 md:px-12">
            <div className="overflow-x-auto no-scrollbar rounded-3xl bg-black/20">
              <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
                {recommendations.slice(0, 10).map((item) => {
                  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
                  return (
                    <MovieCard
                      key={item.id}
                      id={item.id}
                      type={type}
                      title={item.title || item.name}
                      year={(item.release_date || item.first_air_date)?.split("-")[0]}
                      poster={item.poster_path}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}