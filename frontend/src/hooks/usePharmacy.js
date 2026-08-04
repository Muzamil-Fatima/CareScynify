import { useEffect, useState } from "react";
import { getPharmacies } from "../api/pharmacy/pharmacyApi";

export const usePharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);

        const data = await getPharmacies();

        setPharmacies(data.pharmacies || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  return {
    pharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
    loading,
  };
};
