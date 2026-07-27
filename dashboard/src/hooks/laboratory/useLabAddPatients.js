import { useContext } from "react";
import LabAddPatientContext  from "../../context/laboratory/LabAddPatientContext";

const useLabPatient = () => {
  const context = useContext(LabAddPatientContext);

  if (!context) {
    throw new Error(
      "useLabPatient must be used within a LabPatientProvider",
    );
  }

  return context;
};

export default useLabPatient;