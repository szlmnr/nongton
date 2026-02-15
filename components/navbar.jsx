"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./searchbar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-[9999] flex justify-center md:hidden">
        <div className="relative">
          <div className="relative z-10 bg-black/60 backdrop-blur-xl px-8 py-3 rounded-b-[2rem] shadow-2xl">
            <Link href="/">
              <h1 className="text-sm font-black tracking-[0.1em] text-red-600 italic uppercase">
                SALSTREAM
              </h1>
            </Link>
          </div>

          {/* SAYAP KIRI - Lebih rapat, lebih gelap, ada blur */}
          <div className="absolute -left-[31px] top-0 w-8 h-8 bg-black/60 backdrop-blur-xl [mask-image:radial-gradient(circle_at_0_100%,transparent_32px,black_32px)] before:content-[''] before:absolute before:inset-0 before:rounded-tr-[32px]" />

          {/* SAYAP KANAN - Lebih rapat, lebih gelap, ada blur */}
          <div className="absolute -right-[31px] top-0 w-8 h-8 bg-black/60 backdrop-blur-xl [mask-image:radial-gradient(circle_at_100%_100%,transparent_32px,black_32px)] before:content-[''] before:absolute before:inset-0 before:rounded-tl-[32px]" />
        </div>
      </nav>

      {/* --- 2. VERSI DESKTOP (FULL NAVBAR) --- */}
      <nav className="hidden md:block fixed top-0 w-full z-[9999] backdrop-blur-xl bg-black/40 border-b border-white/5 px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-10">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-black tracking-tighter text-red-600 hover:scale-105 transition-transform cursor-pointer italic">
              SALSTREAM
            </h1>
          </Link>

          {/* Menu Navigasi */}
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] items-center">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">
              Nongton
            </Link>
            <Link href="/dengerin" className="text-white hover:text-green-500 transition-colors">
              Dengerin
            </Link>
          </div>

          <div className="flex-1" />

          {/* Search Bar Desktop */}
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in zoom-in duration-200 md:hidden">
          <div className="flex justify-between items-center mb-8 mt-2">
            <h2 className="text-white text-xl font-bold tracking-tighter">Cari Film</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-white/60 hover:text-white uppercase text-[10px] font-black tracking-widest border border-white/20 px-3 py-1 rounded-full"
            >
              Tutup
            </button>
          </div>

          <div className="w-full">
            <SearchBar />
          </div>

          <p className="mt-4 text-white/40 text-[10px] text-center uppercase tracking-widest font-medium">
            Ketik judul film atau series favoritmu
          </p>
        </div>
      )}

      <MobileNav router={router} openSearch={() => setIsSearchOpen(true)} />
    </>
  );
}

function MobileNav({ router }) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="fixed bottom-6 inset-x-0 z-[9999] flex justify-center px-6 md:hidden">
      {/* Container Kapsul yang bisa Melebar (Transition-all buat efek animasinya) */}
      <div className={`
  flex items-center bg-white/95 backdrop-blur-2xl rounded-full px-2 py-2 
  shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/20 
  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
  ${isSearching ? 'w-[90vw]' : 'w-[180px]'} 
`}>

        {!isSearching ? (
          // MODE MENU BIASA
          <>
            <div className="flex items-center w-full justify-around animate-in fade-in zoom-in duration-300">
              <button onClick={() => router.back()} className="p-3 text-zinc-800 active:scale-90 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <Link href="/">
                <div className="bg-red-700 p-3 rounded-full text-white shadow-lg active:scale-90 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
              </Link>

              <button onClick={() => setIsSearching(true)} className="p-3 text-zinc-800 active:scale-90 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </>
        ) : (
          // MODE INPUT (Kapsul Melebar)
          <div className="flex items-center w-full animate-in slide-in-from-right-4 duration-500 ease-out">
            <div className="flex-1 px-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsSearching(false)}
              className="pr-4 pl-2 text-xs font-black text-red-700 uppercase tracking-tighter"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}