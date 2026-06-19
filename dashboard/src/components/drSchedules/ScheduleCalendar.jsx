import { Card } from "@mui/material";

export default function ScheduleCalendar() {
  return (
    <Card className="p-4 rounded-xl shadow-md">
      <h3 className="font-bold mb-3">Calendar</h3>

      <div className="text-center text-gray-500">
        📅 Calendar UI (you can integrate full calendar later)
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Working Hours</p>
        <p>09:00 AM - 06:00 PM</p>
      </div>
    </Card>
  );
}