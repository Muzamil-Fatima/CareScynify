import { useState } from "react";
import { SymptomContext } from "./SymptomContext";

const SymptomProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(null);

  return (
    <SymptomContext.Provider
      value={{
        analysis,
        setAnalysis,
      }}
    >
      {children}
    </SymptomContext.Provider>
  );
};

export default SymptomProvider;