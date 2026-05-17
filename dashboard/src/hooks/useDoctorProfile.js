import { useContext } from "react";
import DoctorContext from "../context/doctor/DoctorContext";

const useDoctor = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("useDoctor must be used inside DoctorProvider");
  }

  return context;
};

export default useDoctor;