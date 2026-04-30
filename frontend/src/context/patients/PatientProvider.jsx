import React, { useEffect, useState } from "react";
import PatientContext from "./PatientContext";
import { getPatientProfile, updatePatientProfile } from "../../api/patientApi";

const PatientProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getPatientProfile();

        console.log("API DATA:", data);

        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // AUTO SAVE
  useEffect(() => {
    if (!profile) return;

    const timeout = setTimeout(async () => {
      try {
        await updatePatientProfile(profile);
      } catch (err) {
        console.error("Auto-save error:", err);
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [profile]);

  return (
    <PatientContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;