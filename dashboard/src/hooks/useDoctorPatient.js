import { useContext } from "react";
import DoctorPatientContext from "../context/patients/DoctorPatientContext";

const useDoctorPatient = () => {
  const context = useContext(DoctorPatientContext);

  if (!context) {
    throw new Error(
      "useDoctorPatient must be used within a DoctorPatientProvider"
    );
  }

  return context;
};

export default useDoctorPatient;