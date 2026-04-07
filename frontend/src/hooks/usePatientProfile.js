// import { useEffect, useState } from "react";
// import { getPatientProfile, updatePatientProfile } from "../services/patientService";

// const usePatientProfile = () => {
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchPatient = async () => {
//     try {
//       const data = await getPatientProfile();
//       setPatient(data);
//     } catch (error) {
//       console.error("Error fetching patient profile", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePatient = async (updatedData) => {
//     const data = await updatePatientProfile(updatedData);
//     setPatient(data);
//   };

//   useEffect(() => {
//     fetchPatient();
//   }, []);

//   return { patient, loading, updatePatient };
// };

// export default usePatientProfile;