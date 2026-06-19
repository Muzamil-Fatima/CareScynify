import { Card } from "@mui/material";

export default function StatsCards() {
  const stats = [
    { label: "Today", value: 8 },
    { label: "Completed", value: 5 },
    { label: "Pending", value: 2 },
    { label: "Total", value: 18 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Card key={i} className="p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">{s.label}</p>
          <h3 className="text-2xl font-bold">{s.value}</h3>
        </Card>
      ))}
    </div>
  );
}