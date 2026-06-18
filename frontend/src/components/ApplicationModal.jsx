import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import { statusOptions, jobTypeOptions } from "../utils/selectOptions";
import toast from "react-hot-toast";
import api from "../api/applicationApi";

export default function ApplicationModal({
  isOpen,
  closeModal,
  onRefresh,
  initialData = null,
}) {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    job_type: "full-time",
    status: "applied",
    applied_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company_name: initialData.company_name || "",
        job_title: initialData.job_title || "",
        job_type: initialData.job_type || "full-time",
        status: initialData.status || "applied",
        applied_date: initialData.applied_date
          ? initialData.applied_date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        company_name: "",
        job_title: "",
        job_type: "full-time",
        status: "applied",
        applied_date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selected) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selected ? selected.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.patch(`/${initialData.id}`, formData);
        toast.success("Application updated!");
      } else {
        await api.post("/", formData);
        toast.success("Application added!");
      }
      closeModal();
      onRefresh();
    } catch (error) {
      toast.error(isEdit ? "Failed to update" : "Failed to add");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold text-gray-800 mb-4"
                >
                  {isEdit ? "Edit Application" : "Add Application"}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Company name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Job title
                    </label>
                    <input
                      type="text"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Job type
                    </label>
                    <Select
                      options={jobTypeOptions}
                      value={jobTypeOptions.find(
                        (opt) => opt.value === formData.job_type,
                      )}
                      onChange={(selected) =>
                        handleSelectChange("job_type", selected)
                      }
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(
                        (opt) => opt.value === formData.status,
                      )}
                      onChange={(selected) =>
                        handleSelectChange("status", selected)
                      }
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Applied date
                    </label>
                    <input
                      type="date"
                      name="applied_date"
                      value={formData.applied_date}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400/60 outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                    >
                      {isEdit ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
