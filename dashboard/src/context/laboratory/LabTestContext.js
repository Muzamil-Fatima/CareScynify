import { createContext, useContext } from "react";

const LabTestContext = createContext();

export const useLabTest = () => useContext(LabTestContext);

export default LabTestContext;