import React, { useEffect, useState, useRef } from "react";
import PatientContext from "./PatientContext";
import {
  getPatientProfile,
  updatePatientProfile,
} from "../../api/patientApi";
import toast from "react-hot-toast";

const PatientProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    user: {},
    patient: {},
  });

  const [loading, setLoading] = useState(true);

  const firstLoad = useRef(true);

  // FETCH PROFILE
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getPatientProfile();

        console.log("API DATA:", data);

        setProfile({
          user: data.user || {},
          patient: data.patient || {},
        });
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
    // prevent save on first load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        if (!profile?.patient) return;

        await updatePatientProfile(profile.patient);

        toast.success("Information saved successfully");
      } catch (err) {
        console.error("Auto-save error:", err);

        toast.error("Failed to save information");
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [profile.patient]);

  return (
    <PatientContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        user: profile.user,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;