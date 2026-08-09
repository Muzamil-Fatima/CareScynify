import { useState, useCallback } from "react";
import DoctorPatientContext from "./DoctorPatientContext";
import {
  addDoctorPatient,
  getDoctorPatient,
  updateDoctorPatient,
  deleteDoctorPatient,
  getManualDoctorPatients,
} from "../../api/doctorPatientApi";

export const DoctorPatientProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add Doctor Patient
  const addPatient = async (data) => {
    try {
      setLoading(true);
      setError("");

      const res = await addDoctorPatient(data);

      setPatient(res.patient);
      setPatients((prev) => [res.patient, ...prev]);

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Get All Doctor Patients
  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getManualDoctorPatients();

      setPatients(res.patients || []);

      return res.patients;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch patients");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  // Get Doctor Patient
  const getPatient = async (id) => {
    try {
      setLoading(true);
      setError("");

      const res = await getDoctorPatient(id);

      setPatient(res.patient);

      return res.patient;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Doctor Patient
  const updatePatient = async (id, data) => {
    try {
      setLoading(true);
      setError("");

      const res = await updateDoctorPatient(id, data);

      setPatient(res.patient);

      setPatients((prev) => prev.map((p) => (p._id === id ? res.patient : p)));
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete Doctor Patient
  const deletePatient = async (id) => {
    try {
      setLoading(true);
      setError("");

      const res = await deleteDoctorPatient(id);

      setPatient(null);

      setPatients((prev) => prev.filter((p) => p._id !== id));
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorPatientContext.Provider
      value={{
        patient,
        patients,
        loading,
        error,
        addPatient,
        getPatient,
        updatePatient,
        deletePatient,
        fetchPatients,
      }}
    >
      {children}
    </DoctorPatientContext.Provider>
  );
};

export default DoctorPatientProvider;
