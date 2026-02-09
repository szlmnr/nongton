import { getMoviesByActor } from "@/lib/tmdb";
import MovieCard from "@/components/moviecard";

export default async function CastDetailPage({ params, searchParams }) {
    // ✅ Next.js 15: Await params dan searchParams
    const { id } = await params;
    const sParams = await searchParams;
    const actorName = sParams.name || "Aktor";

    // ✅ Fetch data menggunakan ID (isId = true) agar akurat
    const results = await getMoviesByActor(id, true);

    const filteredResults = Array.from(
        new Map(
            results
                .filter((item) => {
                    const hasPoster = !!item.poster_path;
                    const isMedia = item.media_type === 'movie' || item.media_type === 'tv' || !item.media_type;

                    const character = (item.character || "").toLowerCase();
                    const title = (item.title || item.name || "").toLowerCase();

                    // 1. Filter Bintang Tamu & Diri Sendiri
                    const isNotGuest = !character.includes("self") && !character.includes("guest");

                    // 2. Filter Konten Tambahan/Dokumenter Pendek
                    const isNotExtras = !title.includes("behind the scenes") && !title.includes("making of");

                    // 3. Filter Popularitas & Validitas (Naikkan ke 1.5 jika masih bocor)
                    const isPopularEnough = (item.popularity || 0) > 1.5;

                    // 4. Filter Vote (Memastikan itu film yang 'hidup' di database)
                    const hasVotes = (item.vote_count || 0) > 2;

                    return hasPoster && isMedia && isNotGuest && isNotExtras && isPopularEnough && hasVotes;
                })
                .map((item) => [item.id, item])
        ).values()
    );

    return (
        <div className="p-8 min-h-screen bg-black text-white">
            <header className="mb-10">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-black mb-2">Filmography</h3>
                <h1 className="text-3xl font-black uppercase tracking-tighter">
                    <span className="text-red-600">{actorName}</span>
                </h1>
            </header>

            {filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {filteredResults.map((movie) => {
                        const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
                        const displayTitle = movie.title || movie.name || "Untitled";
                        // Logic slug tetap sama agar tidak pecah saat diklik
                        const safeSlug = `${movie.id}-${displayTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

                        return (
                            <MovieCard
                                key={`cast-page-${movie.id}`}
                                id={movie.id}
                                type={type}
                                title={displayTitle}
                                year={(movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A"}
                                slug={safeSlug}
                                poster={movie.poster_path}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 text-zinc-500 uppercase text-xs font-bold tracking-widest border border-white/5 rounded-3xl">
                    Tidak ada daftar film untuk aktor ini.
                </div>
            )}
        </div>
    );
}