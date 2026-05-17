import { api } from "./axios";
// GET CLINIC PROFILE
export const getDoctorProfile = async () =>{
    const res = await api.get("/api/doctor/profile");
    return res.data;
}
// Update Clinic Profile
export const updateDoctorProfile = async( payload)=>{
    const res = await api.put("api/doctor/profile", payload);
    return res.data;
}