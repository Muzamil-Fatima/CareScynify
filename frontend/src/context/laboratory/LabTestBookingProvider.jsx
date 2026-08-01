import React, { useState } from "react";
import { LabTestBookingContext } from "./LabTestBookingContext";

const LabTestBookingProvider = ({ children }) => {
  const [labs] = useState();
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <LabTestBookingContext.Provider value={{ labs, selectedLab, setSelectedLab }}>
      {children}
    </LabTestBookingContext.Provider>
  );
};

export default LabTestBookingProvider;