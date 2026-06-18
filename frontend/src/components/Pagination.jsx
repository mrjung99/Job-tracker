export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page <= 1}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
      >
        Prev
      </button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages || 1}
      </span>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages || 1))}
        disabled={page >= (totalPages || 1)}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
      >
        Next
      </button>
    </div>
  );
}
