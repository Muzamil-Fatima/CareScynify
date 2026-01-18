import DoctorLayout from "../doctor/Layout";
import StatCard from "../doctor/StatCard";

const DrDashboard = () => {
  return (
    <DoctorLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Today's Appointments" value="8" />
        <StatCard title="Upcoming Appointments" value="24" />
        <StatCard title="Total Patients" value="120" />
        <StatCard title="Monthly Earnings" value="Rs 85,000" />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Today’s Schedule</h3>
        <p className="text-gray-500">No appointments yet</p>
      </div>
    </DoctorLayout>
  );
};

export default DrDashboard;
