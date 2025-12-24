import FotMob from "fotmob";
const fotmob = new FotMob();

export async function GET() {
  try {
    // Ambil semua pertandingan hari ini
    const matches = await fotmob.getMatchesByDate("20231025"); // Pake format YYYYMMDD
    return Response.json(matches);
  } catch (error) {
    return Response.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}