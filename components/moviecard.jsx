import Link from "next/link";
import Image from "next/image";

// ✅ Link sekarang beda route: /movie/... atau /tv/...
export default function MovieCard({ id, type, title, year, slug, poster }) {
  if (!title) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  // ✅ Tentukan route berdasarkan type
  const href = type === 'tv' ? `/tv/${id}` : `/movie/${id}`;

  return (
    <Link href={href} className="group relative block">
      <div className="relative w-27 sm:w-[140px] md:w-[220px] lg:w-[240px] aspect-[2/3] overflow-hidden rounded-xl md:rounded-3xl bg-zinc-900 shadow-xl transition-all duration-300 hover:scale-105">

        <div className="absolute inset-0 z-0">
          {poster ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 240px"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 font-bold italic">No Poster</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>

        <div className="relative z-10 h-full p-2 md:p-5 flex flex-col justify-between">
          <div className="pt-0.5 md:pt-1">
            <h2 className="text-[10px] sm:text-lg md:text-xl font-black text-white leading-tight uppercase line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] tracking-tight">
              {title}
            </h2>
          </div>

          <div className="w-full">
            <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-center">

              <span className="block md:hidden text-[7px] font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-0.5">
                {type === 'tv' ? 'TV Series' : 'Movies'}
              </span>

              <div className="relative bg-red-700 px-3 sm:px-4 py-1 flex items-center justify-center min-w-16 sm:min-w-25 rounded-t-lg sm:rounded-t-xl h-5 sm:h-6 transition-colors duration-300">
                <div className="absolute -left-[15.5px] bottom-0 w-4 h-4 bg-red-700 mask-[radial-gradient(circle_at_0_0,transparent_16px,black_16px)]" />
                <div className="absolute -right-[15.5px] bottom-0 w-4 h-4 bg-red-700 mask-[radial-gradient(circle_at_100%_0,transparent_16px,black_16px)]" />
                <div className="flex flex-col items-center justify-center relative overflow-hidden h-full w-full">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-white tracking-widest leading-none whitespace-nowrap transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                    {year || "2025"}
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center text-[7px] sm:text-[8px] font-black uppercase text-white tracking-widest leading-none whitespace-nowrap opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Show Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}