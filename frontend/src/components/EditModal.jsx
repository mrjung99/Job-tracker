import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import api from "../api/applicationApi";

export default function EditModal({ item, setItem, refresh }) {
  const [form, setForm] = useState(item);

  useEffect(() => {
    setForm(item);
  }, [item]);

  const submit = async (e) => {
    e.preventDefault();

    await api.patch(`/${item.id}`, form);

    setItem(null);
    refresh();
  };

  return (
    <Dialog open={true} onClose={() => setItem(null)}>
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
          <h2 className="font-bold mb-3">Edit Application</h2>

          <form onSubmit={submit} className="space-y-2">
            <input
              className="w-full border p-2"
              value={form.company_name || ""}
              onChange={(e) =>
                setForm({ ...form, company_name: e.target.value })
              }
            />

            <input
              className="w-full border p-2"
              value={form.job_title || ""}
              onChange={(e) => setForm({ ...form, job_title: e.target.value })}
            />

            <button className="bg-green-600 text-white w-full p-2">
              Update
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
