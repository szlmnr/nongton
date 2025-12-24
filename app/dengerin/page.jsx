"use client";

import { useEffect, useState } from "react";
import { searchTracks } from "@/lib/deezer";
import MusicCard from "@/components/musiccard";

export default function DengerinPage() {
  const [query, setQuery] = useState("pop");
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTracks(true);
  }, [query]);

  async function loadTracks(reset = false) {
    setLoading(true);

    const data = await searchTracks({
      query,
      limit: 24,
      index: reset ? 0 : index,
    });

    setTracks(reset ? data : [...tracks, ...data]);
    setIndex(reset ? 24 : index + 24);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Dengerin 🎧
        </h1>
        <p className="text-white/60 text-sm">
          Cari & preview musik
        </p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari lagu / artis..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          bg-zinc-900 border border-white/10
          px-4 py-3 rounded-xl
          text-sm outline-none
          focus:border-red-500
        "
      />

      {/* MUSIC GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tracks.map((track) => (
          <MusicCard
            key={track.id}
            title={track.title}
            artist={track.artist.name}
            cover={track.album.cover_medium}
            preview={track.preview}
          />
        ))}
      </div>

      {/* LOAD MORE */}
      <button
        onClick={() => loadTracks()}
        disabled={loading}
        className="
          mx-auto mt-6
          bg-red-600 hover:bg-red-700
          text-white text-xs font-bold
          py-3 px-10 rounded-full
          uppercase tracking-widest
          disabled:opacity-40
        "
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
