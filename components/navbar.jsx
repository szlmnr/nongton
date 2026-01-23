import Link from "next/link";
import SearchBar from "./searchbar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[9999] backdrop-blur-xl bg-black/40 border-b border-white/5 px-4 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-6">

        {/* SISI KIRI: Logo & Navigasi */}
        <div className="flex gap-4 md:gap-10 items-center">
          <Link href="/">
            <h1 className="text-lg md:text-2xl font-black tracking-tighter text-red-600 hover:scale-105 transition-transform cursor-pointer">
              SALSTREAM
            </h1>
          </Link>

          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em] items-center">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">
              Nongton
            </Link>
            <Link href="/dengerin" className="text-white hover:text-green-500 transition-colors">
              Dengerin
            </Link>
          </div>
        </div>

        {/* SPACER: Ini yang dorong Search Bar ke kanan */}
        <div className="flex-1" />

        {/* SISI KANAN: Search Bar */}
        <div className="w-full max-w-xs md:max-w-md">
          <SearchBar />
        </div>

      </div>
    </nav>
  );
}