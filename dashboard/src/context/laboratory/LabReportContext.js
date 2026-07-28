import { createContext, useContext } from "react";

const LabReportContext = createContext();

export const useLabReport = () => useContext(LabReportContext);

export default LabReportContext;
