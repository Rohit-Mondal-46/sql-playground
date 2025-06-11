'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SQLEditor from '../../../components/SQLEditor';
import ResultTable from '../../../components/ResultTable';

export default function PlaygroundPage() {
  const router = useRouter();
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const execute = async () => {
    setLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: code, playgroundId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setRows(data.rows);
        setIsSuccess(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong while executing the query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 cursor-pointer hover:underline mb-4 inline-block"
      >
        ←Back
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Playground ID: <span className="text-blue-600">{id}</span>
      </h1>

      <SQLEditor code={code} setCode={setCode} />

      <button
        onClick={execute}
        disabled={loading || !code.trim()}
        className="mt-4 px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
      >
        {loading ? 'Running...' : 'Run SQL'}
      </button>

      {error && (
        <div className="mt-4 text-red-600 bg-red-100 border border-red-300 p-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 text-green-600 bg-green-100 border border-green-300 p-3 rounded">
          ✅ Query executed successfully
        </div>
      )}

      {rows && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Results</h2>
          <ResultTable rows={rows} />
        </div>
      )}
    </div>
  );
}
