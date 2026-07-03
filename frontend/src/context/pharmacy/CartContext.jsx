import React, { useState } from "react";
import { PharmacyContext } from "./CartContext";
import pharmacyData from "../../data/pharmacyData";

const PharmacyProvider = ({ children }) => {
  const [pharmacies] = useState(pharmacyData);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  return (
    <PharmacyContext.Provider value={{ pharmacies, selectedPharmacy, setSelectedPharmacy }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export default PharmacyProvider;