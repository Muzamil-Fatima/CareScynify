import { createContext, useContext } from "react";

const LabSampleContext = createContext();

export const useLabSamples = () => useContext(LabSampleContext);

export default LabSampleContext;