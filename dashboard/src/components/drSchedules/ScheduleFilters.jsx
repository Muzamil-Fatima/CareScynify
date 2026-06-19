import { TextField } from "@mui/material";

export default function ScheduleFilters({ date, setDate, status, setStatus }) {
  return (
    <div className="flex gap-4 flex-wrap">

      {/* DATE FILTER */}
      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      {/* STATUS FILTER */}
      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

    </div>
  );
}