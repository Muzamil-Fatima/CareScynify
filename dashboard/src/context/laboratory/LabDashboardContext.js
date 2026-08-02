import { createContext, useContext } from "react";

const LabDashboardContext = createContext();

export const useLabDashboard = () => useContext(LabDashboardContext);

export default LabDashboardContext;