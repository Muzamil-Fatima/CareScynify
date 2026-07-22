import { createContext, useContext } from "react";

const DoctorPatientContext = createContext();

export const useDoctorPatient = () => useContext(DoctorPatientContext);

export default DoctorPatientContext;
