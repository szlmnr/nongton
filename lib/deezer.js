export async function searchTracks({
  query = "pop",
  limit = 24,
  index = 0,
}) {
  const res = await fetch(
    `/api/deezer?q=${encodeURIComponent(query)}&limit=${limit}&index=${index}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tracks");
  }

  const data = await res.json();
  return data.data || [];
}
