import React, { useState } from "react";
import { DoctorContext } from "./DoctorContext";
import doctorsData from "../data/doctorData";

const DoctorProvider = ({ children }) => {
  const [doctors] = useState(doctorsData);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <DoctorContext.Provider value={{ doctors, selectedDoctor, setSelectedDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;