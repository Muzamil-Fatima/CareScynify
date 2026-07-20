import { useState, useCallback } from "react";
import MedicineContext from "./MedicineContext";

import {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../../api/pharmacy/medicineApi";

const PharmacyProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get All Medicines
  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const data = await getMedicines();

      setMedicines(data.medicines || []);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };
  // Get Single Medicine
  const fetchMedicineById = useCallback(async (medicineId) => {
  try {
    setLoading(true);

    const data = await getMedicineById(medicineId);

    return data.medicine;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}, []);
  // Add Medicine
  const createMedicine = async (medicineData) => {
    try {
      setLoading(true);

      const data = await addMedicine(medicineData);

      setMedicines((prev) => [...prev, data.medicine]);

      return data;
    } catch (error) {
      console.error("Error adding medicine:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Medicine
  const editMedicine = async (medicineId, medicineData) => {
    try {
      setLoading(true);

      const data = await updateMedicine(medicineId, medicineData);

      setMedicines((prev) =>
        prev.map((medicine) =>
          medicine._id === medicineId ? data.medicine : medicine,
        ),
      );

      return data;
    } catch (error) {
      console.error("Error updating medicine:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete Medicine
  const removeMedicine = async (medicineId) => {
    try {
      setLoading(true);

      const data = await deleteMedicine(medicineId);

      setMedicines((prev) =>
        prev.filter((medicine) => medicine._id !== medicineId),
      );

      return data;
    } catch (error) {
      console.error("Error deleting medicine:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    medicines,
    loading,
    fetchMedicines,
    fetchMedicineById,
    createMedicine,
    editMedicine,
    removeMedicine,
  };

  return (
    <MedicineContext.Provider value={value}>
      {children}
    </MedicineContext.Provider>
  );
};

export default PharmacyProvider;
