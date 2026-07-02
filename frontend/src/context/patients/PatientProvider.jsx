import React, { useEffect, useState } from "react";
import PatientContext from "./PatientContext";
import { getPatientProfile, updatePatientProfile } from "../../api/patientApi";
import toast from "react-hot-toast";

const PatientProvider = ({ children }) => {
  const [dirty, setIsDirty] = useState(false);

  const [profile, setProfile] = useState({
    user: {},
    patient: {},
  });

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getPatientProfile();
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
  // AUTO SAVE
  useEffect(() => {
    if (!dirty) return;

    const timeout = setTimeout(async () => {
      try {
        const payload = {
          // USER
          name: profile.user?.name,
          email: profile.user?.email,
          phone: profile.user?.phone,
          dob: profile.user?.dob,
          cnic: profile.user?.cnic,

          // PATIENT
          ...profile.patient,
        };

        // Remove empty values
        Object.keys(payload).forEach((key) => {
          if (
            payload[key] === "" ||
            payload[key] === undefined ||
            payload[key] === null
          ) {
            delete payload[key];
          }
        });
        console.log("Profile User:", profile.user);
        console.log("Payload:", payload);
        await updatePatientProfile(payload);

        setIsDirty(false);
        toast.success("Profile saved successfully");
      } catch (err) {
        console.error("Auto-save error:", err);
        toast.error("Failed to save information");
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [profile.user, profile.patient, dirty]);

  return (
    <PatientContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        user: profile.user,
        setIsDirty,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
