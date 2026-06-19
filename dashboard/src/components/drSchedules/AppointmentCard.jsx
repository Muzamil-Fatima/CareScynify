export default function AppointmentCard({ item }) {
  return (
    <Card className="p-4 rounded-xl shadow-md flex justify-between items-center">

      <div>
        <h3 className="font-semibold text-lg">{item.patient}</h3>
        <p className="text-gray-500">Time: {item.time}</p>

        {/* NEW LINE (TYPE) */}
        <p className="text-sm text-blue-600 mt-1">
          {item.type}
        </p>
      </div>

      <Chip
        label={item.status}
        color={
          item.status === "Confirmed"
            ? "success"
            : item.status === "Pending"
            ? "warning"
            : "primary"
        }
      />
    </Card>
  );
}