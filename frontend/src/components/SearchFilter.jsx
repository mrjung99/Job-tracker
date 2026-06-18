import Select from "react-select";
import { statusOptions } from "../utils/selectOptions";

export default function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <input
        type="text"
        placeholder="Search by company or job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400 outline-none transition"
      />
      <div className="w-full sm:w-56">
        <Select
          options={statusOptions}
          value={
            statusOptions.find((opt) => opt.value === statusFilter) || null
          }
          onChange={(selected) =>
            setStatusFilter(selected ? selected.value : "")
          }
          placeholder="Filter by status"
          isClearable
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "0.75rem",
              padding: "1px 2px",
              borderColor: "#e2e8f0",
              boxShadow: "none",
              "&:hover": { borderColor: "#94a3b8" },
            }),
          }}
        />
      </div>
    </div>
  );
}
