import { createContext, useContext } from "react";

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export default PatientContext;
