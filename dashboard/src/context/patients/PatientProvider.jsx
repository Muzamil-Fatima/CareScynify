import PatientContext from "./PatientContext";
import { useParams } from "react-router-dom";
import usePatientProfile from "../../hooks/usePatientProfile";

const PatientProvider = ({ children }) => {
  const { patientId, appointmentId } = useParams();

  const { patient, reports, loading, error, refetch } =
    usePatientProfile(patientId);

  return (
    <PatientContext.Provider
      value={{
        patient,
        appointmentId,
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
