import Image from "next/image";

export default function MusicCard({ title, artist, cover, preview }) {
  return (
    <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition">
      <div className="relative aspect-square mb-4">
        <Image
          src={cover}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <h3 className="font-bold truncate">{title}</h3>
      <p className="text-xs text-white/60 truncate">{artist}</p>

      {preview && (
        <audio controls className="w-full mt-2">
          <source src={preview} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
