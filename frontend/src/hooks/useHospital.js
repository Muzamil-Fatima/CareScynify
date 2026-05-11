import { useEffect, useState } from "react";

const useHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy fetch (replace with API later)
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);

        // Simulated data (replace with API call)
        const data = [
          {
            id: 1,
            name: "City Care Hospital",
            location: "Narowal",
          },
          {
            id: 2,
            name: "Life Health Hospital",
            location: "Lahore",
          },
        ];

        setHospitals(data);
      } catch (err) {
        setError("Failed to load hospitals");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
};

export default useHospital;