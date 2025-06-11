'use client';
import { useEffect, useState } from 'react';
import PlaygroundCard from '../components/PlaygroundCard';
import PlaygroundForm from '../components/PlaygroundForm';

export default function Home() {
  const [pls, setPls] = useState([]);
  const [error, setError] = useState(null);

  const fetchPLs = async () => {
    try {
      const response = await fetch('/api/playgrounds');
      if (!response.ok) throw new Error('Failed to fetch playgrounds');
      const data = await response.json();
      setPls(data);
    } catch (err) {
      console.error('Error fetching playgrounds:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPLs();
  }, []);

  const add = async (title) => {
    try {
      const response = await fetch('/api/playgrounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!response.ok) throw new Error('Failed to create playground');
      await fetchPLs();
    } catch (err) {
      console.error('Error creating playground:', err);
      setError(err.message);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">SQL Playgrounds</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <PlaygroundForm onSubmit={add} />

      {pls.length === 0 ? (
        <p className="mt-6 text-gray-500">No playgrounds yet. Start by creating one above.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {pls.map((pl) => (
            <PlaygroundCard key={pl.id} pl={pl} onUpdate={fetchPLs} />
          ))}
        </div>
      )}
    </main>
  );
}
