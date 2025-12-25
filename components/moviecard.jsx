import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ title, year, slug, poster }) {
  if (!title) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster}`;

  return (
    <Link href={`/movie/${slug}`} className="group relative block">
      <div className="relative w-[180px] md:w-[240px] aspect-[2/3] overflow-hidden rounded-xl-card bg-zinc-900 shadow-xl transition-all duration-300 hover:scale-105">
        
        <div className="absolute inset-0 z-0">
          {poster ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 240px"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-[10px] text-zinc-500 font-bold italic">No Poster</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>

        <div className="relative z-10 h-full p-5 flex flex-col justify-between">
          <div className="pt-1">
            <h2 className="text-xl font-black text-white leading-tight uppercase line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] tracking-tight">
              {title}
            </h2>
          </div>

          <div className="w-full">
            <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-3 rounded-2xl shadow-2xl transition-all duration-300 group-hover:bg-black/60">
              <div className="flex justify-between items-center">
                {/* DI SINI PERBAIKANNYA: Mengganti tag <p> menjadi <div>/<span> */}
                <div>
                  <span className="block text-[8px] font-black text-white/40 uppercase leading-none mb-1 tracking-wider">
                    Release Year
                  </span>
                  <span className="block text-sm font-black text-white leading-none">
                    {year || "2025"}
                  </span>
                </div>
                
                <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                  <span className="text-xs font-bold text-white">→</span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="block text-[7px] font-bold text-white drop-shadow-md tracking-[0.4em] uppercase">
                  Show Details
               </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}