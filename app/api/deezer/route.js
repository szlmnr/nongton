export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "pop";
  const index = searchParams.get("index") || 0;

  const res = await fetch(
    `https://api.deezer.com/search?q=${encodeURIComponent(q)}&index=${index}`,
    { cache: "no-store" }
  );

  const text = await res.text();

  return new Response(text, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function searchTracks({ query, index = 0 }) {
  const res = await fetch(`/api/deezer?q=${query}&index=${index}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
