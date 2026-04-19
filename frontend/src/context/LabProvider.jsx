import React, { useState } from "react";
import { LabContext } from "./LabContext";
import labsData from "../data/labData";

const LabProvider = ({ children }) => {
  const [labs] = useState(labsData);
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <LabContext.Provider value={{ labs, selectedLab, setSelectedLab }}>
      {children}
    </LabContext.Provider>
  );
};

export default LabProvider;