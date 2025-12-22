import Link from "next/link"; // 1. Tambahkan import ini
import SearchBar from "./searchbar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* 2. Bungkus h1 dengan Link ke "/" */}
        <Link href="/">
          <h1 className="text-xl font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer">
            Nongton
          </h1>
        </Link>

        <SearchBar />
      </div>
    </header>
  );
}