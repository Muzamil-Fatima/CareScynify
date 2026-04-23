import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { useDoctorContext } from "../context/DoctorContext";

const useDoctorProfile = () => {
  const { doctor, setDoctor, loading, setLoading } = useDoctorContext();

  useEffect(() => {
    let isMounted = true;

    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASE_URL}/api/doctor/getDoctor/${id}`,
          { withCredentials: true }
        );

        if (isMounted) {
          setDoctor(res.data);
        }
      } catch (error) {
        console.log("Doctor fetch error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!doctor) {
      fetchDoctor();
    }

    return () => {
      isMounted = false;
    };
  }, [doctor, setDoctor, setLoading]);

  return { doctor, loading };
};

export default useDoctorProfile;