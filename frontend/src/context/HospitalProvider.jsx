import React, { useState } from "react";
import { HospitalContext } from "./HospitalContext";
import hospitalsData from "../data/hospitalData";

const HospitalProvider = ({ children }) => {
  const [hospitals] = useState(hospitalsData);
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <HospitalContext.Provider value={{ hospitals, selectedHospital, setSelectedHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalProvider;