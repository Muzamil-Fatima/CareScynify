import { useEffect, useState } from "react";

import LabAddPatientContext from "./LabAddPatientContext";

import {
  getLabPatients,
  addLabPatient,
  updateLabPatient,
  deleteLabPatient,
} from "../../api/laboratory/labAddPatientApi";

export default function LabAddPatientProvider({ children }) {
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch All Patients
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await getLabPatients();

      setPatients(res.patients || []);
    } catch (error) {
      console.error("Fetch Patients Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create Patient
  const createPatient = async (payload) => {
    try {
      const res = await addLabPatient(payload);

      // Refresh data to get populated testId
      await fetchPatients();

      return res;
    } catch (error) {
      console.error("Add Patient Error:", error);

      throw error;
    }
  };

  // Update Patient
  const editPatient = async (id, payload) => {
    try {
      const res = await updateLabPatient(id, payload);

      // Refresh data after update
      await fetchPatients();

      return res;
    } catch (error) {
      console.error("Update Patient Error:", error);

      throw error;
    }
  };

  // Delete Patient
  const removePatient = async (id) => {
    try {
      await deleteLabPatient(id);

      setPatients((prev) => prev.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Delete Patient Error:", error);

      throw error;
    }
  };

  // Initial Load
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <LabAddPatientContext.Provider
      value={{
        patients,

        loading,

        fetchPatients,

        createPatient,

        editPatient,

        removePatient,
      }}
    >
      {children}
    </LabAddPatientContext.Provider>
  );
}
