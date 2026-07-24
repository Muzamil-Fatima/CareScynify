import { api } from "../axios";


// Get all pharmacies
export const getAllPharmacies = async () => {
  const res = await api.get("/api/public/pharmacies");
  return res.data;
};


// Get single pharmacy
export const getPharmacyById = async (id) => {
  const res = await api.get(`/api/public/pharmacies/${id}`);
  return res.data;
};