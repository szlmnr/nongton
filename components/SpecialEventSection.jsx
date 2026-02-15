// SpecialEventSection.jsx

"use client";

// SpecialEventSection.jsx - eventStyles (UPGRADED)

const eventStyles = {
  RAMADAN: {
    title: "Spesial Ramadan",
    subtitle: "Pilihan Film Penuh Hikmah",
    containerClass: "from-emerald-900/40 via-emerald-950/60 to-zinc-950 border-emerald-500/30 relative",
    textClass: "text-emerald-400",
    glowClass: "bg-emerald-500/20",
    icon: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Pattern - Islamic Geometric */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <pattern id="ramadan-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
            </pattern>
            <rect width="200" height="200" fill="url(#ramadan-pattern)" />
          </svg>
        </div>

        {/* Bulan Bintang - Top Right */}
        <div className="absolute top-8 right-8 flex gap-4 opacity-40">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
            <path d="M12 3a9 9 0 1 0 9 9 9.93 9.93 0 0 0-3.94-7.96 9 9 0 0 1-5.06 16.96 9 9 0 0 1 0-18Z" fill="currentColor" className="text-emerald-400" />
          </svg>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400 mt-10 animate-pulse">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Lentera Kiri Atas */}
        <div className="absolute top-4 left-8 opacity-30 animate-pulse">
          <svg width="40" height="60" viewBox="0 0 24 36" fill="none">
            <rect x="6" y="2" width="12" height="2" rx="1" fill="#fbbf24" />
            <path d="M7 6c0-1 1-2 5-2s5 1 5 2v18c0 1-1 2-5 2s-5-1-5-2V6z" fill="#059669" opacity="0.6" />
            <path d="M8 6h8M8 12h8M8 18h8M8 24h8" stroke="#fbbf24" strokeWidth="0.5" />
            <circle cx="12" cy="15" r="2" fill="#fbbf24" opacity="0.8" />
            <rect x="10" y="26" width="4" height="8" rx="1" fill="#fbbf24" opacity="0.6" />
          </svg>
        </div>

        {/* Ketupat - Bottom Left */}
        <div className="absolute bottom-6 left-12 opacity-25">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L18 8L12 14L6 8Z" fill="#059669" opacity="0.5" />
            <path d="M12 14L18 8L18 16L12 22Z" fill="#059669" opacity="0.7" />
            <path d="M12 14L6 8L6 16L12 22Z" fill="#047857" opacity="0.6" />
            <path d="M12 14L18 16L12 22L6 16Z" fill="#065f46" opacity="0.8" />
            <path d="M8 9l8 0M7 11l10 0M6 13l12 0M7 15l10 0M8 17l8 0" stroke="#fbbf24" strokeWidth="0.3" opacity="0.6" />
          </svg>
        </div>

        {/* Unta Kecil - Bottom Right */}
        <div className="absolute bottom-8 right-16 opacity-20">
          <svg width="60" height="40" viewBox="0 0 64 48" fill="none">
            <path d="M10 30c0-2 2-4 4-4h6c2 0 4 2 4 4v10H10V30zM40 30c0-2 2-4 4-4h6c2 0 4 2 4 4v10H40V30z" fill="#fbbf24" />
            <ellipse cx="32" cy="26" rx="18" ry="10" fill="#d97706" />
            <circle cx="20" cy="18" r="5" fill="#b45309" />
            <path d="M20 13v-8c0-2 1-3 2-3s2 1 2 3v8" stroke="#92400e" strokeWidth="1" />
          </svg>
        </div>

        {/* Masjid Silhouette - Far Bottom Right */}
        <div className="absolute bottom-0 right-4 opacity-10">
          <svg width="90" height="80" viewBox="0 0 48 48" fill="none">
            <path d="M24 8l-4 4h8l-4-4zM16 16h16v24H16z" fill="#059669" />
            <circle cx="16" cy="10" r="3" fill="#047857" />
            <circle cx="32" cy="10" r="3" fill="#047857" />
            <rect x="20" y="20" width="8" height="12" rx="1" fill="#fbbf24" opacity="0.3" />
          </svg>
        </div>
      </div>
    )
  },

  IMLEK: {
    title: "Hoki Year Selections",
    subtitle: "Pilihan Keberuntungan Tahun Ini",
    containerClass: "from-red-950/60 via-red-900/40 to-zinc-950 border-amber-500/50 relative shadow-[0_0_40px_rgba(251,191,36,0.15)]",
    textClass: "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]",
    glowClass: "bg-gradient-to-br from-red-600/30 to-amber-500/20",
    icon: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Chinese Border Pattern - Corner Decorations */}
        <svg className="absolute top-0 left-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
          <path d="M0 0L20 0L20 20L0 20ZM5 5L15 5L15 15L5 15Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="10" cy="10" r="3" fill="#dc2626" />
        </svg>
        <svg className="absolute top-0 right-0 w-32 h-32 opacity-30 transform rotate-90" viewBox="0 0 100 100">
          <path d="M0 0L20 0L20 20L0 20ZM5 5L15 5L15 15L5 15Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="10" cy="10" r="3" fill="#dc2626" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-32 h-32 opacity-30 transform -rotate-90" viewBox="0 0 100 100">
          <path d="M0 0L20 0L20 20L0 20ZM5 5L15 5L15 15L5 15Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="10" cy="10" r="3" fill="#dc2626" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-30 transform rotate-180" viewBox="0 0 100 100">
          <path d="M0 0L20 0L20 20L0 20ZM5 5L15 5L15 15L5 15Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="10" cy="10" r="3" fill="#dc2626" />
        </svg>

        {/* Cloud Pattern - Traditional Chinese */}
        <div className="absolute top-12 left-16 opacity-20">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <path d="M10 20c0-5 4-8 8-8 2-4 6-6 10-6 6 0 10 4 12 8 4 0 8 3 8 8 0 5-4 8-8 8H18c-4 0-8-3-8-8z" fill="#fbbf24" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-20 right-20 opacity-15">
          <svg width="60" height="30" viewBox="0 0 80 40" fill="none">
            <path d="M10 20c0-5 4-8 8-8 2-4 6-6 10-6 6 0 10 4 12 8 4 0 8 3 8 8 0 5-4 8-8 8H18c-4 0-8-3-8-8z" fill="#dc2626" opacity="0.6" />
          </svg>
        </div>

        {/* Kipas Traditional */}
        <div className="absolute bottom-12 left-8 opacity-25 animate-pulse">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
            <path d="M12 20L8 12L12 4L16 12L12 20Z" fill="#dc2626" opacity="0.6" />
            <path d="M12 20L16 12L20 10L16 16L12 20Z" fill="#dc2626" opacity="0.8" />
            <path d="M12 20L8 12L4 10L8 16L12 20Z" fill="#b91c1c" opacity="0.7" />
            <circle cx="12" cy="12" r="2" fill="#fbbf24" />
            <path d="M8 12Q12 8 16 12M8 12Q12 16 16 12" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5" />
          </svg>
        </div>

        {/* Plum Blossom Branch - Traditional Motif */}
        <div className="absolute top-1/2 right-6 opacity-20">
          <svg width="80" height="120" viewBox="0 0 40 60" fill="none">
            <path d="M20 0Q15 15 18 30T20 60" stroke="#92400e" strokeWidth="2" fill="none" />
            <circle cx="18" cy="15" r="3" fill="#dc2626" />
            <circle cx="22" cy="25" r="3" fill="#ef4444" />
            <circle cx="16" cy="35" r="3" fill="#dc2626" />
            <circle cx="24" cy="45" r="3" fill="#ef4444" />
            {/* Petals */}
            <circle cx="18" cy="12" r="1.5" fill="#fbbf24" opacity="0.8" />
            <circle cx="15" cy="15" r="1.5" fill="#fbbf24" opacity="0.8" />
            <circle cx="21" cy="15" r="1.5" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>

        {/* Lampion - Bouncing */}
        <div className="absolute -top-4 right-12 animate-bounce" style={{ animationDuration: '4s' }}>
          <svg width="60" height="80" viewBox="0 0 24 36" fill="none">
            <path d="M12 2v2M12 20v2M5 8c0-2.2 3.1-4 7-4s7 1.8 7 4v8c0 2.2-3.1 4-7 4s-7-1.8-7-4V8z" fill="#dc2626" />
            <path d="M8 5c-1.5 1-2.5 2.5-2.5 3.5v8c0 1 1 2.5 2.5 3.5M16 5c1.5 1 2.5 2.5 2.5 3.5v8c0 1-1 2.5-2.5 3.5" stroke="#fbbf24" strokeWidth="0.5" />
            <rect x="9" y="3" width="6" height="2" rx="1" fill="#fbbf24" />
            <rect x="9" y="19" width="6" height="2" rx="1" fill="#fbbf24" />
            <path d="M10 10h4M10 12h4M10 14h4" stroke="#fbbf24" strokeWidth="0.5" opacity="0.6" />
          </svg>
        </div>

        {/* Fu Character (福) - Luck Symbol */}
        <div className="absolute bottom-16 right-12 opacity-15">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="2" fill="#dc2626" opacity="0.8" />
            <text x="12" y="16" fontSize="14" fill="#fbbf24" textAnchor="middle" fontWeight="bold">福</text>
          </svg>
        </div>
      </div>
    )
  },

  NYEPI: {
    title: "Hening Nyepi",
    subtitle: "Karya Sinema Dalam Keheningan",
    containerClass: "from-orange-950/50 via-zinc-950 to-black border-orange-500/20",
    textClass: "text-orange-300",
    glowClass: "bg-orange-700/10",
    icon: (
      <div className="absolute top-6 right-10 opacity-30 flex flex-col items-center">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#fdba74" strokeWidth="1">
          <path d="M12 2L8 6h8l-4-4zM6 11h12M4 16h16M2 21h20M9 6v15M15 6v15" />
          <circle cx="12" cy="11" r="1" fill="#fdba74" />
        </svg>
      </div>
    )
  },

  NATAL: {
    title: "Christmas Joy",
    subtitle: "Hangatkan Suasana Dengan Film Terbaik",
    containerClass: "from-red-900/40 via-green-950/30 to-black border-white/10 relative",
    textClass: "text-white drop-shadow-md",
    glowClass: "bg-blue-400/10",
    icon: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Snowflakes Background */}
        <div className="absolute top-4 left-8 opacity-30 animate-pulse" style={{ animationDuration: '3s' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute top-12 right-16 opacity-20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute bottom-16 left-12 opacity-25 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </div>

        {/* Christmas Tree */}
        <div className="absolute bottom-8 left-8 opacity-30">
          <svg width="60" height="80" viewBox="0 0 24 32" fill="none">
            <path d="M12 2L6 10h12L12 2z" fill="#16a34a" />
            <path d="M12 8L5 16h14L12 8z" fill="#15803d" />
            <path d="M12 14L4 22h16L12 14z" fill="#166534" />
            <rect x="10" y="22" width="4" height="8" fill="#92400e" />
            <circle cx="8" cy="12" r="1.5" fill="#fbbf24" />
            <circle cx="16" cy="14" r="1.5" fill="#ef4444" />
            <circle cx="12" cy="18" r="1.5" fill="#3b82f6" />
            <path d="M12 0l1 2-1-2z" fill="#fbbf24" />
          </svg>
        </div>

        {/* Ornament Balls */}
        <div className="absolute top-4 right-10 flex gap-4 opacity-60">
          <div className="relative animate-spin-slow">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-yellow-400 mt-8 shadow-lg shadow-red-500/50 relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-400 rounded-t"></div>
          </div>
        </div>

        {/* Gift Box - Bottom Right */}
        <div className="absolute bottom-6 right-12 opacity-30">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="12" rx="1" fill="#dc2626" />
            <rect x="4" y="8" width="16" height="3" rx="0.5" fill="#fbbf24" />
            <path d="M12 8v14M4 11h16" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M12 4c-1 0-2 1-2 2h4c0-1-1-2-2-2z" fill="#15803d" />
            <circle cx="8" cy="16" r="1" fill="#fbbf24" opacity="0.6" />
            <circle cx="16" cy="16" r="1" fill="#fbbf24" opacity="0.6" />
          </svg>
        </div>

        {/* Santa Hat - Top Left */}
        <div className="absolute top-8 left-12 opacity-25">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path d="M12 2c-2 4-4 8-6 10h12c-2-2-4-6-6-10z" fill="#dc2626" />
            <ellipse cx="12" cy="12" rx="6" ry="1.5" fill="white" />
            <circle cx="18" cy="2" r="2" fill="white" />
          </svg>
        </div>

        {/* Candy Cane */}
        <div className="absolute top-1/2 right-6 opacity-20 transform rotate-12">
          <svg width="40" height="80" viewBox="0 0 20 40" fill="none">
            <path d="M10 5Q5 5 5 10v25" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M10 5Q5 5 5 10v25" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Bell */}
        <div className="absolute bottom-12 right-6 opacity-25 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M6 11c0-3.3 2.7-6 6-6s6 2.7 6 6v4l2 2H4l2-2v-4z" fill="#fbbf24" />
            <path d="M10 20c0 1.1.9 2 2 2s2-.9 2-2" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="11" y="2" width="2" height="3" rx="1" fill="#92400e" />
          </svg>
        </div>

        {/* Holly Leaves - Corner Decoration */}
        <div className="absolute top-6 left-16 opacity-20">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path d="M8 12c-2-1-3-3-2-4 1-1 3 0 4 2 1-2 3-3 4-2 1 1 0 3-2 4 2 1 3 3 2 4-1 1-3 0-4-2-1 2-3 3-4 2-1-1 0-3 2-4z" fill="#15803d" />
            <circle cx="12" cy="12" r="2" fill="#dc2626" />
            <circle cx="10" cy="10" r="1" fill="#dc2626" />
            <circle cx="14" cy="14" r="1" fill="#dc2626" />
          </svg>
        </div>
      </div>
    )
  }
};

export default function SpecialEventSection({ eventType, data }) {
  if (!eventType || !data?.length) return null;

  const style = eventStyles[eventType] || eventStyles.RAMADAN;

  return (
    // 👇 CONTAINER UTAMA - Padding disesuaikan supaya gak terlalu makan tempat di mobile
    <div className={`relative my-10 md:my-16 mx-4 md:mx-12 p-5 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br border ${style.containerClass} overflow-hidden`}>

      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 blur-[80px] md:blur-[120px] rounded-full -z-10 ${style.glowClass}`} />

      {/* Icons & Decorations */}
      {style.icon}

      {/* 👇 CONTENT LAYER */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="mb-5 md:mb-8">
          <h2 className={`text-2xl md:text-4xl font-black italic uppercase mb-1 ${style.textClass}`}>
            {style.title}
          </h2>
          <p className="text-white/60 text-[10px] md:text-base">{style.subtitle}</p>
        </div>

        {/* 👇 HORIZONTAL SCROLL - Layout 5-6 card di mobile */}
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
            {/* Gue ubah w-24 (96px) di mobile supaya muat 5-6 card 
               dalam satu layar horizontal sebelum user perlu scroll jauh.
            */}
            <div className="flex gap-2 md:gap-4 snap-x snap-mandatory pb-2">
              {data.map((movie) => {
                const displayTitle = movie.title || movie.name || "Untitled";
                const displayYear = (movie.release_date || movie.first_air_date)?.split("-")[0];

                return (
                  <div key={movie.id} className="flex-none w-24 md:w-48 snap-start group cursor-pointer">
                    {/* POSTER */}
                    <div className="relative aspect-[2/3] rounded-lg md:rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all shadow-lg">
                      <img
                        src={movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : '/placeholder-poster.jpg'}
                        alt={displayTitle}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Rating Badge (Dikecilkan di mobile) */}
                      {movie.vote_average > 0 && (
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
                          <span className="text-[8px] md:text-[10px]">⭐</span>
                          <span className="text-[8px] md:text-xs font-black text-yellow-400 tracking-tighter">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* TITLE & YEAR - Font dikecilkan supaya muat layout rapat */}
                    <div className="mt-1.5 md:mt-3">
                      <p className="text-[10px] md:text-base font-bold truncate text-white/90 group-hover:text-white transition-colors">
                        {displayTitle}
                      </p>
                      {displayYear && (
                        <p className="text-[8px] md:text-xs text-white/50">{displayYear}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}