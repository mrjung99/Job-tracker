import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import MobileCard from "../components/MobileCard";
import Pagination from "../components/Pagination";
import ApplicationModal from "../components/ApplicationModal";
import DeleteModal from "../components/DeleteModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import StatsCards from "../components/StatusCards";
import api from "../api/applicationApi";

const statusColorMap = {
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-yellow-100 text-yellow-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({});

  // modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = { page, search, status: statusFilter };
      const res = await api.get("/", { params });
      setApplications(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      // compute stats from all (backend could provide but we compute)
      const allRes = await api.get("/", {
        params: { page: 1, search, status: "" },
      });
      const all = allRes.data.data || [];
      const counts = { applied: 0, interviewing: 0, offer: 0, rejected: 0 };
      all.forEach((app) => {
        if (counts[app.status] !== undefined) counts[app.status]++;
      });
      setStats(counts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, statusFilter]);

  const handleRefresh = () => {
    fetchData();
  };

  const openEditModal = (app) => {
    setSelectedApp(app);
    setEditModalOpen(true);
  };

  const openDeleteModal = (app) => {
    setSelectedApp(app);
    setDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar onAddClick={() => setAddModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StatsCards stats={stats} />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* Table (md+) */}
        <div className="hidden md:block mt-6 bg-white rounded-xl shadow-sm border border-gray-100/80 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {app.company_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {app.job_title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.job_type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${statusColorMap[app.status] || "bg-gray-100"}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(app.applied_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm space-x-2">
                    <button
                      onClick={() => openEditModal(app)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(app)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-400 text-sm"
                  >
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="block md:hidden mt-6 space-y-4">
          {applications.map((app) => (
            <MobileCard
              key={app.id}
              application={app}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))}
          {applications.length === 0 && (
            <div className="bg-white p-6 rounded-xl text-center text-gray-400 text-sm">
              No applications
            </div>
          )}
        </div>

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </main>

      {/* Modals */}
      <ApplicationModal
        isOpen={addModalOpen}
        closeModal={() => setAddModalOpen(false)}
        onRefresh={handleRefresh}
      />
      <ApplicationModal
        isOpen={editModalOpen}
        closeModal={() => setEditModalOpen(false)}
        onRefresh={handleRefresh}
        initialData={selectedApp}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        application={selectedApp}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
