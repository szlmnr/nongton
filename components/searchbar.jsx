'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Arahkan user ke halaman search dengan query parameter
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery(''); // Kosongkan input setelah search
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-60 bg-neutral-900 text-sm px-3 py-2 rounded-md outline-none border border-white/10 focus:border-red-500"
      />
    </form>
  );
}