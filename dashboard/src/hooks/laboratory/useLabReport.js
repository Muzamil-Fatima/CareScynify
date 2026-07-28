import { useContext } from "react";
import LabReportContext from "../../context/laboratory/LabReportContext";
export default function useLabReport() {
  const context = useContext(LabReportContext);

  if (!context) {
    throw new Error(
      "useLabReport must be used inside LabReportProvider"
    );
  }

  return context;
}