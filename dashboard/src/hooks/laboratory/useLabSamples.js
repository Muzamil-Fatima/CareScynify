import { useContext } from "react";
import LabSampleContext from "../../context/laboratory/LabSampleContext";

export default function useLabSample() {
  const context = useContext(LabSampleContext);

  if (!context) {
    throw new Error("useLabSample must be used inside LabSampleProvider");
  }

  return context;
}
