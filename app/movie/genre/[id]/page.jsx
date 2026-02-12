import React from 'react';
import MovieCard from "@/components/moviecard";
import Link from 'next/link';

// 1. Pemetaan ID ke Nama Genre (Berdasarkan list yang kamu kasih)
const GENRE_MAP = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

async function getMoviesByGenre(genreId, page = 1, sortBy = 'popularity.desc') {
    const token = process.env.TMDB_TOKEN;

    // Ambil tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Tambahkan parameter primary_release_date.lte=${today}
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&language=id-ID&sort_by=${sortBy}&primary_release_date.lte=${today}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 }
    });
    return res.json();
}

export default async function GenrePage({ params, searchParams }) {
    // 1. Unwrapping params (Solusi Next.js 15)
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const id = resolvedParams.id;
    const currentPage = parseInt(resolvedSearchParams.page) || 1;

    const currentSort = resolvedSearchParams.sort || 'popularity.desc';

    // 2. Fetch Data dengan Fallback Objek Kosong
    const data = await getMoviesByGenre(id, currentPage, currentSort) || {};
    console.log("JUMLAH FILM:", data.results?.length); // Harus muncul angka (misal: 20)
    console.log("ERROR MESSAGE:", data.status_message);
    const movies = data.results || [];

    // 3. Kalkulasi Variabel (Didefinisikan SEBELUM di-render)
    const totalResults = data.total_results || 0;
    const totalPages = data.total_pages ? Math.min(data.total_pages, 500) : 1;
    const genreName = GENRE_MAP[Number(id)] || "Movies";

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
                    href={`/movie/genre/${id}?page=1&sort=popularity.desc`}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${currentSort === 'popularity.desc' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                >
                    Terpopuler
                </Link>
                <Link
                    href={`/movie/genre/${id}?page=1&sort=primary_release_date.desc`}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${currentSort === 'primary_release_date.desc' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                >
                    Terbaru
                </Link>
            </div>
            {/* GRID SECTION */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 xs:gap-4 md:gap-6">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            year={movie.release_date?.split('-')[0]}
                            type="movie"
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        Tidak ada film ditemukan untuk genre ini.
                    </div>
                )}
            </div>

            {/* PAGINATION SECTION - Dibuat lebih estetik */}
            <div className="mt-20 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                    {/* Tombol Prev */}
                    <a
                        href={currentPage > 1 ? `/movie/genre/${id}?page=${currentPage - 1}` : '#'}
                        className={`group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all ${currentPage > 1 ? 'bg-white/5 hover:bg-red-600 hover:border-red-600' : 'opacity-20 cursor-not-allowed'
                            }`}
                    >
                        <span className={`text-xl transition-transform group-hover:-translate-x-1 ${currentPage > 1 ? 'text-white' : 'text-gray-500'}`}>←</span>
                    </a>

                    {/* Page Numbers (Simple Style) */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-3 gap-4">
                        <span className="text-red-600 font-black text-lg">{currentPage}</span>
                        <span className="text-gray-600 font-bold">/</span>
                        <span className="text-white/60 font-bold"> {isNaN(totalPages) ? "1" : totalPages}</span>
                    </div>

                    {/* Tombol Next */}
                    <Link
                        href={currentPage < totalPages ? `/movie/genre/${id}?page=${currentPage + 1}&sort=${currentSort}` : '#'}
                        className={`group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all ${currentPage < totalPages
                                ? 'bg-white/5 hover:bg-red-600 hover:border-red-600'
                                : 'opacity-20 cursor-not-allowed'
                            }`}
                    >
                        <span className={`text-xl transition-transform group-hover:translate-x-1 ${currentPage < totalPages ? 'text-white' : 'text-gray-500'
                            }`}>
                            →
                        </span>
                    </Link>
                </div>

                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                    Gunakan navigasi untuk eksplorasi lebih dalam
                </p>
            </div>
        </div>
    );
}