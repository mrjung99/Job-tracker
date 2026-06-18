import api from "../api/applicationApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ApplicationCard({ app, refresh }) {
  const remove = async () => {
    await api.delete(`/${app.id}`);
    toast.success("Deleted");
    refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{app.company_name}</h2>

      <p className="text-gray-500">{app.job_title}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="px-2 py-1 bg-blue-100 rounded text-sm">
          {app.job_type}
        </span>

        <span className="px-2 py-1 bg-green-100 rounded text-sm">
          {app.status}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/edit/${app.id}`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>

        <button
          onClick={remove}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
