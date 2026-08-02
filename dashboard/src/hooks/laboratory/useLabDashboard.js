import { useContext } from "react";
import LabDashboardContext from "../../context/laboratory/LabDashboardContext";
export default function useLabDashboard() {
  const context = useContext(LabDashboardContext);

  if (!context) {
    throw new Error(
      "useLabDashboard must be used inside LabDashboardProvider"
    );
  }

  return context;
}