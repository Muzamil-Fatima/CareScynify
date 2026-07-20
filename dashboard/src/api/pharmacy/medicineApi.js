import { api } from "../axios";

// Add Medicine
export const addMedicine = async (medicineData) => {
  const res = await api.post("/api/medicineRoutes/addMedicine", medicineData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Get Medicines
export const getMedicines = async () => {
  const res = await api.get("/api/medicineRoutes/getMedicine");
  return res.data;
};
// Get Single Medicine
export const getMedicineById = async (medicineId) => {
  const res = await api.get(`/api/medicineRoutes/${medicineId}`);
  return res.data;
};
// Update Medicine
export const updateMedicine = async (medicineId, medicineData) => {
  const res = await api.put(`/api/medicineRoutes/${medicineId}`, medicineData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete Medicine
export const deleteMedicine = async (medicineId) => {
  const res = await api.delete(`/api/medicineRoutes/${medicineId}`);
  return res.data;
};
