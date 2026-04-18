import { useEffect, useState, useCallback } from "react";
import { getPatientProfile } from "../services/patientService";
import { useAuth } from "../context/auth/useAuth";

const usePatientProfile = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPatient = useCallback(async () => {
    try {
      const data = await getPatientProfile();

      setPatient({
        ...user,
        ...data
      });

    } catch (error) {
      console.error("Error fetching patient profile:", error);

      setPatient({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        age: "",
        address: "",
        allergies: [],
        medications: [],
        emergencyContact: {}
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchPatient();
  }, [user, fetchPatient]);

  return { patient, loading };
};

export default usePatientProfile;