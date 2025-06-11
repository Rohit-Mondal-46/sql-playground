import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlaygroundCard({ pl, onUpdate }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(pl.title);

  const rename = async () => {
    await fetch(`/api/playgrounds/${pl.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setEdit(false);
    onUpdate();
  };

  const del = async () => {
    await fetch(`/api/playgrounds/${pl.id}`, { method: "DELETE" });
    onUpdate();
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {edit ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <h2 className="text-xl font-medium text-gray-800 mb-3">{pl.title}</h2>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => router.push(`/playground/${pl.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer transition-colors"
        >
          Open
        </button>
        {edit ? (
          <button
            onClick={rename}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer transition-colors"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer transition-colors"
          >
            Rename
          </button>
        )}
        <button
          onClick={del}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded cursor-pointer transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
