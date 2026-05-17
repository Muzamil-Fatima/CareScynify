import { api } from "./axios";

// GET CLINIC PROFILE
export const getClinicProfile = async () =>{
    const res = await api.get("/api/clinic/profile");
    return res.data;
}
// Update Clinic Profile
export const updateClinicProfile = async( payload)=>{
    const res = await api.put("api/clinic/profile", payload);
    return res.data;
}
