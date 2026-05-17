import { createContext, useContext } from "react";

const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export default DoctorContext;