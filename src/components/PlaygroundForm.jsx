import { useState } from "react";

export default function PlaygroundForm({ onSubmit }) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) {
          onSubmit(value);
          setValue("");
        }
      }}
      className="flex items-center space-x-2 mb-6"
    >
      <input
        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="New playground title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700">
        Create
      </button>
    </form>
  );
}
