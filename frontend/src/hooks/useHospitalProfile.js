import { useEffect, useState } from "react";

const useHospitalProfile = (hospitalId) => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hospitalId) return;

    const fetchHospitalProfile = async () => {
      try {
        setLoading(true);

        // Dummy data (replace with API)
        const data = {
          id: hospitalId,
          name: "City Care Hospital",
          description:
            "A modern hospital providing 24/7 emergency and specialist care.",
          location: "Narowal",
          rating: 4.6,
          phone: "+92 300 1234567",
        };

        setHospital(data);
      } catch (err) {
        setError("Failed to load hospital profile");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalProfile();
  }, [hospitalId]);

  return { hospital, loading, error };
};

export default useHospitalProfile;