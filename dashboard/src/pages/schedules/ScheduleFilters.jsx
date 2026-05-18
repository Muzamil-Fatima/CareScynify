import { TextField } from "@mui/material";

export default function ScheduleFilters({ date, setDate }) {
  return (
    <div className="flex gap-4 flex-wrap">
      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <select className="border p-2 rounded">
        <option>All Status</option>
        <option>Confirmed</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>
    </div>
  );
}