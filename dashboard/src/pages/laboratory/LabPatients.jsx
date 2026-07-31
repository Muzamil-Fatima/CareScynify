import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import LabPatientsHeader from "../../components/laboratory/labPatients/LabPatientsHeader";
import LabPatientForm from "../../components/laboratory/labPatients/LabPatientForm";
import LabPatientsTable from "../../components/laboratory/labPatients/LabPatientsTable";

import useLabAddPatients from "../../hooks/laboratory/useLabAddPatients";
import useLabTest from "../../hooks/laboratory/useLabTest";

export default function LabPatients() {
  const { patients, createPatient, editPatient, removePatient } =
    useLabAddPatients();

  const { testsList, getLabTests } = useLabTest();

  const [editingPatient, setEditingPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    gender: "",
    testId: "",
    notes: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getLabTests();
  }, [getLabTests]);

  // Input Change
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      age: "",
      gender: "",
      testId: "",
      notes: "",
    });

    setEditingPatient(null);
  };

  // Edit Click
  const handleEditPatient = (patient) => {
    console.log("Edit Patient:", patient);

    setEditingPatient(patient);

    setFormData({
      name: patient.name || "",

      mobile: patient.mobile || "",

      age: patient.age || "",

      gender: patient.gender || "",

      testId: patient.testId?._id || "",

      notes: patient.notes || "",
    });
  };

  // Add / Update Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.age ||
      !formData.gender ||
      !formData.testId
    ) {
      toast.error("Please fill all required fields.");

      return;
    }

    try {
      if (editingPatient) {
        await editPatient(editingPatient._id, formData);

        toast.success("Patient updated successfully.");
      } else {
        await createPatient(formData);

        toast.success("Patient added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Operation failed.");
    }
  };

  // Delete Patient
  // Delete Patient
  const handleDeletePatient = async (id) => {
    console.log("Delete Patient ID:", id);

    try {
      await removePatient(id);

      toast.success("Patient deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  // Search Filter
  const filteredPatients = useMemo(() => {
    return patients.filter((item) => {
      const search = searchTerm.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.mobile?.includes(searchTerm) ||
        item.testId?.name?.toLowerCase().includes(search) ||
        item._id?.toLowerCase().includes(search)
      );
    });
  }, [patients, searchTerm]);

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
            testsList={testsList}
            editingPatient={editingPatient}
            resetForm={resetForm}
          />

          <LabPatientsTable
            filteredPatients={filteredPatients}
            handleDeletePatient={handleDeletePatient}
            handleEditPatient={handleEditPatient}
          />
        </div>
      </main>
    </div>
  );
}
