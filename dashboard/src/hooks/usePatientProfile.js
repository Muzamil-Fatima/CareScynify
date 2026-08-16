// import { useEffect, useState, useCallback } from "react";
// import { getPatientProfile, getPatientById } from "../api/patientApi";

// const usePatientProfile = (patientId) => {
//   const [patient, setPatient] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPatient = useCallback(async () => {
//     try {
//       const data = patientId
//         ? await getPatientById(patientId)
//         : await getPatientProfile();

//       setPatient({
//         ...data.user,
//         ...data.patient,
//       });

//       setReports(data.reports || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [patientId]);

//   useEffect(() => {
//     fetchPatient();
//   }, [fetchPatient]);

//   return {
//     patient,
//     reports,
//     loading,
//     refetch: fetchPatient,
//   };
// };

// export default usePatientProfile;
import { useEffect, useState, useCallback } from "react";
import { getPatientProfile, getPatientById } from "../api/patientApi";

const usePatientProfile = (patientId) => {
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatient = useCallback(async () => {
    try {
      const data = patientId
        ? await getPatientById(patientId)
        : await getPatientProfile();

      setPatient({
        ...data.user,
        ...data.patient,
      });

      setReports(data.reports || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patient,
    reports,
    loading,
    refetch: fetchPatient,
  };
};

export default usePatientProfile;