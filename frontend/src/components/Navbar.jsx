import { PlusIcon } from "@heroicons/react/24/outline";

export default function Navbar({ onAddClick }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200/80 px-4 sm:px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
        Job Tracker
      </h1>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-150"
      >
        <PlusIcon className="w-5 h-5" />
        Add Application
      </button>
    </nav>
  );
}
