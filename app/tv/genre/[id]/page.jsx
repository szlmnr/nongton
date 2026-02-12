import Link from 'next/link';
import MovieCard from "@/components/moviecard";

async function getTVByGenre(genreId, page = 1, sortBy = 'popularity.desc') {
    const token = process.env.TMDB_TOKEN;

    // Kita coba lepas dulu filter .lte-nya buat mastiin data narik
    const url = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}&language=id-ID&sort_by=${sortBy}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 }
    });

    const result = await res.json();
    console.log("Cek Data TV:", result.results?.length); // Cek di terminal muncul angka gak?
    return result;
}

const tvGenreMap = {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western"
};

export default async function TVGenrePage({ params, searchParams }) {
    const { id } = await params;
    const { page, sort } = await searchParams;

    const currentPage = parseInt(page) || 1;
    const currentSort = sort || 'popularity.desc';

    const data = await getTVByGenre(id, currentPage, currentSort);
    
    // --- TAMBAHKAN DUA BARIS INI ---
    const genreName = tvGenreMap[id] || "TV Series"; // Biar judulnya muncul
    const totalResults = data?.total_results || 0;    // Biar total judul gak error
    // ------------------------------

    const tvShows = data?.results || [];
    const totalPages = data?.total_pages || 1;

    return (
        <div className="min-h-screen bg-black pt-28 px-4 md:px-10 pb-20">

            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                        {genreName} <span className="text-red-600">Collections</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-3 font-medium tracking-widest uppercase">
                        Total {totalResults.toLocaleString()} Judul Film
                    </p>
                </div>

                {/* Sekarang totalPages dijamin "Defined" karena dideklarasikan di atas */}
                <div className="text-[10px] font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-full text-gray-400 tracking-[0.2em] uppercase">
                    Halaman {currentPage} / {totalPages}
                </div>
            </div>
            {/* --- SORTING BUTTONS --- */}
            <div className="flex gap-2 mb-10 border-b border-white/5 pb-6">
                <Link
                    href={`/tv/genre/${id}?page=1&sort=popularity.desc`}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${currentSort === 'popularity.desc' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                >
                    Terpopuler
                </Link>
                <Link
                    href={`/tv/genre/${id}?page=1&sort=first_air_date.desc`} // TV pake first_air_date
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${currentSort === 'first_air_date.desc' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                >
                    Terbaru
                </Link>
            </div>

            {/* GRID SECTION */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 xs:gap-4 md:gap-6">
                {tvShows.length > 0 ? (
                    tvShows.map((tv) => (
                        <MovieCard
                            key={tv.id}
                            id={tv.id}
                            title={tv.name} // TV Show pake .name, bukan .title
                            poster={tv.poster_path}
                            year={tv.first_air_date?.split('-')[0]} // TV Show pake first_air_date
                            type="tv" // Jangan lupa ganti jadi "tv" biar detail pagenya bener nanti
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        Tidak ada serial TV ditemukan untuk genre ini.
                    </div>
                )}
            </div>

            {/* PAGINATION (Pake Logic yang udah kita benerin tadi) */}
            <div className="mt-20 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                    {/* Tombol Prev - SEKARANG PAKE Link & ROUTE /tv/ */}
                    <Link
                        href={currentPage > 1 ? `/tv/genre/${id}?page=${currentPage - 1}&sort=${currentSort}` : '#'}
                        className={`group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all ${currentPage > 1 ? 'bg-white/5 hover:bg-red-600 hover:border-red-600' : 'opacity-20 cursor-not-allowed'}`}
                    >
                        <span className={`text-xl transition-transform group-hover:-translate-x-1 ${currentPage > 1 ? 'text-white' : 'text-gray-500'}`}>←</span>
                    </Link>

                    {/* Page Numbers - Pake div supaya strukturnya kuat */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-3 gap-4 font-bold">
                        <span className="text-red-600 text-lg">{currentPage}</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-white/60">{totalPages || 1}</span>
                    </div>

                    {/* Tombol Next - ROUTE /tv/ */}
                    <Link
                        href={currentPage < totalPages ? `/tv/genre/${id}?page=${currentPage + 1}&sort=${currentSort}` : '#'}
                        className={`group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all ${currentPage < totalPages ? 'bg-white/5 hover:bg-red-600 hover:border-red-600' : 'opacity-20 cursor-not-allowed'}`}
                    >
                        <span className={`text-xl transition-transform group-hover:translate-x-1 ${currentPage < totalPages ? 'text-white' : 'text-gray-500'}`}>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}