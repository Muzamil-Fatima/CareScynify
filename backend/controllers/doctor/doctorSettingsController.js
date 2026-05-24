// doctorSettingsController
// │── updatePersonalInfo
// │── updateEducation
// │── updateClinicInfo
// │── updateProfessionalInfo
// │── updateNotifications
// │── updateSecurity

import Doctor from "../../models/doctorModel";
//  update education
export const updateDoctorEducation = async (req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
// Medical Credentials & Awards
export const documentDoctor = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}