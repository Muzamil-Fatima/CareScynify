import { createContext, useContext } from "react";

const LabAddPatientContext = createContext();

export const useLabAddPatients = () => useContext(LabAddPatientContext);

export default LabAddPatientContext;