import React, { useState } from "react";
import { LabContext } from "./LabContext";

const LabProvider = ({ children }) => {
  const [labs] = useState();
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <LabContext.Provider value={{ labs, selectedLab, setSelectedLab }}>
      {children}
    </LabContext.Provider>
  );
};

export default LabProvider;