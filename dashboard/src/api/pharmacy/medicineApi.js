import { api } from "../axios";

// Add Medicine
export const addMedicine = async (medicineData) => {
  const res = await api.post(
    "/api/medicineRoutes/addMedicine",
    medicineData
  );

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
  const res = await api.put(
    `/api/medicineRoutes/${medicineId}`,
    medicineData
  );

  return res.data;
};

// Delete Medicine
export const deleteMedicine = async (medicineId) => {
  const res = await api.delete(
    `/api/medicineRoutes/${medicineId}`
  );

  return res.data;
};
// Get Medicine Stats
export const getMedicineStats = async () => {
  const res = await api.get("/api/medicineRoutes/stats");
  return res.data;
};
// Search Medicines
export const searchMedicines = async (search) => {
  const res = await api.get(
    `/api/medicineRoutes/search?search=${encodeURIComponent(search)}`
  );

  return res.data;
};