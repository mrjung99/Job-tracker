export default function StatsCards({ stats }) {
  const items = [
    { label: "Applied", value: stats?.applied || 0, color: "text-blue-600" },
    {
      label: "Interviewing",
      value: stats?.interviewing || 0,
      color: "text-yellow-600",
    },
    { label: "Offer", value: stats?.offer || 0, color: "text-green-600" },
    { label: "Rejected", value: stats?.rejected || 0, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/70"
        >
          <p className="text-sm font-medium text-gray-500">{item.label}</p>
          <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
