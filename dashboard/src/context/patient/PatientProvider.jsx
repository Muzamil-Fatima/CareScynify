import { createContext, useEffect, useState } from "react";
import { api } from "../../api/axios"; 

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/api/patients"); 
    

      setPatients(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        error,
        fetchPatients,
        setPatients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;