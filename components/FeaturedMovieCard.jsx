// src/components/FeaturedMovieCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function FeaturedMovieCard({ movie }) {
  if (!movie || !movie.poster_path || !movie.title) return null;

  const slug = `${movie.id}-${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <Link href={`/movie/${slug}`} className="block relative w-full h-400px md:h-500px rounded-3xl overflow-hidden group">
      <Image
        src={`${process.env.TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-linear-t from-black via-transparent to-black/30 opacity-70 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg group-hover:translate-y--10px transition-transform duration-300">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{movie.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{movie.overview}</p>
        <button className="mt-4 bg-brand-red text-white text-sm font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-lg">
          Watch Now
        </button>
      </div>
    </Link>
  );
}