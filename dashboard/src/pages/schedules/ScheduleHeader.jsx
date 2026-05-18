import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ScheduleHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">My Schedule</h2>
        <p className="text-gray-500">Manage your appointments</p>
      </div>

      <Button variant="contained" startIcon={<AddIcon />}>
        Add Slot
      </Button>
    </div>
  );
}