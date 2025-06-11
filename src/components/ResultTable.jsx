export default function ResultTable({ rows }) {
  if (!rows.length) {
    return (
      <p className="mt-4 text-gray-500 text-center italic">No results to display.</p>
    );
  }

  const cols = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto mt-6 rounded-lg border border-gray-300 shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-800 sticky top-0">
          <tr>
            {cols.map((col) => (
              <th key={col} className="px-4 py-3 font-semibold border-b border-gray-300">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
            >
              {cols.map((col) => (
                <td key={col} className="px-4 py-2 border-b border-gray-200">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
