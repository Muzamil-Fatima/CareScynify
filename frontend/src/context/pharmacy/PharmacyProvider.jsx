import React, { useState } from "react";
import { PharmacyContext } from "./PharmacyContext";

const PharmacyProvider = ({ children }) => {
  const [pharmacies] = useState();
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  return (
    <PharmacyContext.Provider value={{ pharmacies, selectedPharmacy, setSelectedPharmacy }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export default PharmacyProvider;