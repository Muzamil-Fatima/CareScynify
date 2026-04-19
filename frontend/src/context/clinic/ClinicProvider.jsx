import React, { useState } from "react";
import { ClinicContext } from "./ClinicContext";
import clinicsData from "../../data/clinicData";

const ClinicProvider = ({ children }) => {
  const [clinics] = useState(clinicsData);
  const [selectedClinic, setSelectedClinic] = useState(null);

  return (
    <ClinicContext.Provider value={{ clinics, selectedClinic, setSelectedClinic }}>
      {children}
    </ClinicContext.Provider>
  );
};

export default ClinicProvider;