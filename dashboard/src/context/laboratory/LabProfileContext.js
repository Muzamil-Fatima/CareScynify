import { createContext, useContext } from "react";

const LabProfileContext = createContext();

export const useLabProfile = () => useContext(LabProfileContext);

export default LabProfileContext;