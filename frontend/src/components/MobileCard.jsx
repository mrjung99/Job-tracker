import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const statusColorMap = {
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-yellow-100 text-yellow-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MobileCard({ application, onEdit, onDelete }) {
  const statusClass =
    statusColorMap[application.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/80 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {application.company_name}
          </h3>
          <p className="text-sm text-gray-500">{application.job_title}</p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass}`}
        >
          {application.status}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full">
          {application.job_type}
        </span>
        <span className="text-gray-400 text-xs">
          {new Date(application.applied_date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-end gap-2 mt-1">
        <button
          onClick={() => onEdit(application)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(application)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
