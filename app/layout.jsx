import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
