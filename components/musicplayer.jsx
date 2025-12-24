"use client";

export default function MusicPlayer({ src }) {
  return (
    <audio
      src={src}
      autoPlay
      className="hidden"
    />
  );
}
