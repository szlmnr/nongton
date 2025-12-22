// app/page.jsx
import MovieCard from "@/components/moviecard";
import { getPopularMovies } from "@/lib/tmdb";

export default async function HomePage() {
  const movies = await getPopularMovies();
  return (
    <div className="p-8">
       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
         {movies.map(movie => (
           <MovieCard 
             key={movie.id} 
             title={movie.title} 
             poster={movie.poster_path}
             slug={`${movie.id}-${movie.title.toLowerCase().replace(/ /g, '-')}`} 
           />
         ))}
       </div>
    </div>
  );
}