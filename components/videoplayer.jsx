export default function VideoPlayer({ src }) {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}
