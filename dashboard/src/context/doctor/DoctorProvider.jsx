import { useEffect, useState } from "react";
import DoctorContext from "./DoctorContext";
import { getDoctorProfile, updateDoctorProfile } from "../../api/doctorApi";
import toast from "react-hot-toast";

const DoctorProvider = ({ children }) => {
  const [dirty, setIsDirty] = useState(false);

  const [profile, setProfile] = useState({
    user: {},
    doctor: {},
  });

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getDoctorProfile();

        setProfile({
          user: data.user || {},
          doctor: data.doctor || {},
        });
      } catch (err) {
        console.error("Doctor fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // AUTO SAVE (FIXED)
  useEffect(() => {
    if (!dirty) return;

    const timeout = setTimeout(async () => {
      try {
        const payload = {
          // USER
          name: profile.user.name,
          email: profile.user.email,
          phone: profile.user.phone,
          address: profile.user.address,
          dob: profile.user.dob,
          cnic: profile.user.cnic,

          // DOCTOR (ONLY USED FIELDS)
          specialization: profile.doctor.specialization,
          experience: profile.doctor.experience,
          qualifications: profile.doctor.qualifications,
          licenseNo: profile.doctor.licenseNo,
        };

        const res = await updateDoctorProfile(payload);

        if (res?.success) {
          toast.success("Doctor profile saved");
          setIsDirty(false);
        } else {
          toast.error(res?.message || "Failed to save profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to save doctor profile");
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [dirty, profile]);

  return (
    <DoctorContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        setIsDirty,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
