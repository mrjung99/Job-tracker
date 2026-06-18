import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/applicationApi";
import toast from "react-hot-toast";

export default function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  useEffect(() => {
    api.get(`/${id}`).then((res) => {
      setForm(res.data.application);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.patch(`/${id}`, form);
    toast.success("Updated");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-xl shadow">
      <form onSubmit={submit} className="space-y-3">
        <input
          value={form.company_name || ""}
          onChange={(e) => setForm({ ...form, company_name: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          value={form.job_title || ""}
          onChange={(e) => setForm({ ...form, job_title: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
