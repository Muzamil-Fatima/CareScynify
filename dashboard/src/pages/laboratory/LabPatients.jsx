
import React, { useState } from "react";

import LabPatientsHeader from "../../components/laboratory/labPatients/LabPatientsHeader";
import LabPatientForm from "../../components/laboratory/labPatients/LabPatientForm";
import LabPatientsTable from "../../components/laboratory/labPatients/LabPatientsTable";

export default function LabPatients() {
  // Mock Data for Patients List
  const [patients, setPatients] = useState([
    {
      id: "PT-101",
      name: "Ali Khan",
      age: 28,
      gender: "Male",
      contact: "0300-1234567",
      tests: "Blood CBC",
      date: "2026-05-21",
    },
    {
      id: "PT-102",
      name: "Sara Raza",
      age: 24,
      gender: "Female",
      contact: "0321-7654321",
      tests: "Lipid Panel",
      date: "2026-05-21",
    },
    {
      id: "PT-103",
      name: "M. Hassan",
      age: 35,
      gender: "Male",
      contact: "0333-9876543",
      tests: "Thyroid Profile",
      date: "2026-05-20",
    },
    {
      id: "PT-104",
      name: "Fatima Ahmed",
      age: 42,
      gender: "Female",
      contact: "0345-4567890",
      tests: "Urine Routine",
      date: "2026-05-19",
    },
  ]);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    tests: "",
  });

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Patient
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact) {
      alert("Please fill name and contact details");
      return;
    }

    const newPatient = {
      id: `PT-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      age: parseInt(formData.age) || "N/A",
      gender: formData.gender,
      contact: formData.contact,
      tests: formData.tests || "Routine Checkup",
      date: new Date().toISOString().split("T")[0],
    };

    setPatients([newPatient, ...patients]);

    setFormData({
      name: "",
      age: "",
      gender: "Male",
      contact: "",
      tests: "",
    });
  };

  // Delete Patient
  const handleDeletePatient = (id) => {
    if (
      window.confirm("Kya aap is patient ka record delete karna chahte hain?")
    ) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  // Search Filter
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.includes(searchTerm),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-fuchsia-50">
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        <LabPatientsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <LabPatientForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />

          <LabPatientsTable
            filteredPatients={filteredPatients}
            handleDeletePatient={handleDeletePatient}
          />
        </div>
      </main>
    </div>
  );
}
