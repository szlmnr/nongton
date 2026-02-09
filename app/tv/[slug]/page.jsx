import VideoPlayer from "@/components/videoplayer";
import AdsBanner from "@/components/adsbanner";
import MovieCard from "@/components/moviecard";
import { getMovieDetails, getPopularTV, getSeasonDetails } from "@/lib/tmdb";
import translate from 'google-translate-api-next';
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TVDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const { s, e, server } = await searchParams;

  if (!slug) return notFound();
  const tvId = slug; // Langsung pake ID, nggak pake slug lagi

  // ✅ PENTING: Pass 'tv' sebagai type
  const [tvShow, recommendations] = await Promise.all([
    getMovieDetails(tvId, 'tv'), // ✅ Paksa type='tv'
    getPopularTV(),
  ]);

  if (!tvShow) notFound();

  // TV Series pasti punya first_air_date
  if (!tvShow.first_air_date) {
    // Kalau ternyata movie, redirect ke /movie
    return notFound();
  }

  const currentSeason = parseInt(s || "1");
  const currentEpisode = parseInt(e || "1");
  const currentServer = server || "1";

  const seasonData = await getSeasonDetails(tvShow.id, currentSeason);
  const episodes = seasonData?.episodes || [];

  // ✅ TV SERIES URLs Only
  const servers = {
    "1": `https://vidsrc.to/embed/tv/${tvShow.id}/${currentSeason}/${currentEpisode}`,
    "2": `https://vidsrc.xyz/embed/tv/${tvShow.id}/${currentSeason}/${currentEpisode}`,
    "3": `https://vidsrc.me/embed/tv/${tvShow.id}/${currentSeason}/${currentEpisode}`,
    "4": `https://multiembed.mov/?video_id=${tvShow.id}&tmdb=1&s=${currentSeason}&e=${currentEpisode}`
  };

  const fullMovieSrc = servers[currentServer] || servers["1"];

  let sinopsisFinal = tvShow.overview;
  if (tvShow.overview) {
    try {
      const res = await translate(tvShow.overview, { to: 'id' });
      sinopsisFinal = res.text;
    } catch (error) {
      sinopsisFinal = tvShow.overview;
    }
  }

  const trailer = tvShow.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const videoSrc = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  const cast = tvShow.credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div className="relative w-full h-[50vh] md:h-[65vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path || tvShow.poster_path}`}
          alt={tvShow.name || "TV Poster"}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="hidden md:block relative w-44 h-64 flex-none shadow-2xl border border-white/10 rounded-2xl overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                fill
                alt={tvShow.name}
                className="object-cover"
              />
            </div>
            <div className="space-y-4 pb-4">
              <p className="text-neon-yellow text-[10px] font-black uppercase tracking-[0.4em]">
                TV Series
              </p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {tvShow.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400">
                <span className="text-neon-yellow">⭐ {tvShow.vote_average?.toFixed(1)}</span>
                <span>{tvShow.first_air_date?.split("-")[0]}</span>
                <div className="flex gap-2">
                  {tvShow.genres?.slice(0, 2).map(g => (
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
        {videoSrc && !s && (
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
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-neon-yellow animate-pulse" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                SalStream Cinema <span className="text-zinc-500 font-medium">— Season {currentSeason} Ep {currentEpisode}</span>
              </h2>
            </div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase">Pilih episode di bawah player</p>
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
              title={tvShow.name}
            ></iframe>
          </div>

          {/* SERVER SELECTOR - ✅ Fixed: 1 Row 4 Columns di Mobile */}
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
                    href={`?s=${currentSeason}&e=${currentEpisode}&server=${srv.id}`}
                    scroll={false}
                    className={`group relative overflow-hidden px-2 xs:px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 border shadow-lg ${
                      isSelected
                        ? "bg-green-600 border-green-500 shadow-green-500/30"
                        : "bg-zinc-900 border-white/5 hover:border-green-500/40"
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-start leading-tight">
                      <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase ${
                        isSelected ? "text-white" : "text-white"
                      }`}>
                        {srv.label}
                      </span>
                      <span className={`text-[7px] xs:text-[8px] sm:text-[9px] font-bold ${
                        isSelected ? "text-green-100" : "text-zinc-500"
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

          {/* EPISODES GRID */}
          {episodes.length > 0 && (
            <section className="mt-12 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-black uppercase tracking-tighter text-white">
                  Episodes <span className="text-red-600 ml-2 text-sm">Season {currentSeason}</span>
                </h3>

                {/* ✅ FIXED: Season Dropdown Mobile Clickable */}
                <div className="relative group z-[100]">
                  {/* Trigger Button */}
                  <button 
                    type="button"
                    className="px-3 py-1 rounded-md text-[10px] font-bold border border-red-600 bg-red-600 text-white flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-colors"
                  >
                    S{currentSeason}
                    <span className="text-[8px] opacity-80">▼</span>
                  </button>

                  {/* Dropdown - Mobile Touch Friendly */}
                  <div className="absolute top-full right-0 mt-1 w-32 bg-zinc-900 border border-white/10 rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 overflow-hidden">
                    <div className="max-h-60 overflow-y-auto no-scrollbar bg-zinc-950">
                      {tvShow.seasons?.filter(s => s.season_number > 0).map(s => (
                        <a
                          key={s.id}
                          href={`?s=${s.season_number}&e=1`}
                          className={`block px-4 py-2.5 text-[10px] font-bold uppercase border-b border-white/5 last:border-0 transition-colors active:bg-red-600/40 ${
                            currentSeason === s.season_number
                              ? 'bg-red-600/20 text-red-500'
                              : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          Season {s.season_number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {episodes.map((ep) => {
                  const isActive = currentEpisode === ep.episode_number;

                  return (
                    <Link
                      key={`${ep.id}-${ep.episode_number}`}
                      href={`?s=${currentSeason}&e=${ep.episode_number}`}
                      scroll={false}
                      className={`group relative block aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border ${
                        isActive ? 'border-red-600' : 'border-white/5'
                      }`}
                    >
                      <Image
                        src={ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
                        fill
                        alt={ep.name}
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="bg-red-600 px-2 py-0.5 rounded-full flex items-center justify-center">
                              <span className="text-[9px] font-black leading-none text-black uppercase whitespace-nowrap pt-[0.5px]">
                                SEASON {currentSeason}
                              </span>
                            </div>
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-widest leading-none">
                              EPISODE {ep.episode_number}
                            </span>
                          </div>
                          <span className="text-white text-sm font-bold truncate w-full text-left">
                            {ep.name || `Episode ${ep.episode_number}`}
                          </span>
                          <span className="text-zinc-400 text-[9px] font-medium uppercase mt-0.5 text-left">
                            {ep.air_date || 'N/A'} • {tvShow.name}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <div className="absolute inset-0 bg-red-600/10 z-20 flex items-start p-3">
                          <div className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 text-[8px] font-bold uppercase text-white bg-red-600 rounded">
                            Now Watching
                          </div>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

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
            {/*<section>
              <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-black mb-5">Top Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cast.map((person) => (
                  <div key={person.id} className="flex items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-white/5">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                      <Image
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : "/no-avatar.png"}
                        fill
                        alt={person.name}
                        className="object-cover grayscale"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black truncate uppercase text-zinc-200">{person.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{person.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>*/}
          </div>

          <aside className="space-y-6 bg-zinc-900/20 p-8 rounded-3xl border border-white/5 h-fit backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Status</p>
                <p className="font-bold text-sm uppercase">{tvShow.status}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Type</p>
                <p className="font-bold text-sm uppercase text-neon-yellow">TV SERIES</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Original Language</p>
                <p className="font-bold text-sm uppercase">{tvShow.original_language}</p>
              </div>
              {tvShow.networks && (
                <div>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">Network</p>
                  <p className="font-bold text-sm uppercase">{tvShow.networks[0]?.name}</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* RECOMMENDATIONS */}
        <section className="pt-16 mt-16 border-t border-white/5">
          <div className="px-6 md:px-12 mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wide text-white">
              Recommended TV Series
            </h2>
          </div>

          <div className="px-6 md:px-12">
            <div className="overflow-x-auto no-scrollbar rounded-3xl bg-black/20">
              <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
                {recommendations.slice(0, 10).map((item) => (
                  <MovieCard
                    key={item.id}
                    id={item.id}
                    type="tv"
                    title={item.name}
                    year={item.first_air_date?.split("-")[0]}
                    poster={item.poster_path}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}