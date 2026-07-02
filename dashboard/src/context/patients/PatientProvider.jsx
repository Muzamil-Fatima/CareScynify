import PatientContext from "./PatientContext";
import { useParams } from "react-router-dom";
import usePatientProfile from "../../hooks/usePatientProfile";

const PatientProvider = ({ children }) => {
  const { patientId } = useParams();

  const {
    patient,
    reports,
    loading,
    error,
    refetch,
  } = usePatientProfile(patientId);

  return (
    <PatientContext.Provider
      value={{
        patient,
        reports,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;