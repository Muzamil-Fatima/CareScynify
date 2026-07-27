
import React, { useState } from "react";

import LabTestsHeader from "../../components/laboratory/labTests/LabTestsHeader";
import LabTestForm from "../../components/laboratory/labTests/LabTestForm";
import LabTestsTable from "../../components/laboratory/labTests/LabTestsTable";

export default function LabTests() {
  // Mock Data for Available Lab Tests
  const [testsList, setTestsList] = useState([
    {
      code: "T-CBC",
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      price: 1200,
      turnAround: "4 Hours",
      status: "Active",
    },
    {
      code: "T-LIP",
      name: "Lipid Profile / Panel",
      category: "Biochemistry",
      price: 2500,
      turnAround: "6 Hours",
      status: "Active",
    },
    {
      code: "T-THY",
      name: "Thyroid Profile (T3, T4, TSH)",
      category: "Endocrinology",
      price: 3200,
      turnAround: "12 Hours",
      status: "Active",
    },
    {
      code: "T-RBS",
      name: "Random Blood Sugar (RBS)",
      category: "Biochemistry",
      price: 300,
      turnAround: "1 Hour",
      status: "Active",
    },
    {
      code: "T-LFT",
      name: "Liver Function Test (LFT)",
      category: "Biochemistry",
      price: 2200,
      turnAround: "8 Hours",
      status: "Active",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Biochemistry",
    price: "",
    turnAround: "",
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

  // Add Test
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.turnAround) {
      alert("Please enter test name, price, and turnaround time!");
      return;
    }

    const randomCode = `T-${formData.name
      .substring(0, 3)
      .toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

    const newTest = {
      code: randomCode,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      turnAround: formData.turnAround,
      status: "Active",
    };

    setTestsList([newTest, ...testsList]);

    setFormData({
      name: "",
      category: "Biochemistry",
      price: "",
      turnAround: "",
    });
  };

  // Delete Test
  const handleDeleteTest = (code) => {
    if (
      window.confirm(
        "Kya aap is test profile ko hamesha ke liye delete karna chahte hain?"
      )
    ) {
      setTestsList(testsList.filter((t) => t.code !== code));
    }
  };

  // Search Filter
  const filteredTests = testsList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-fuchsia-50">
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        <LabTestsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LabTestForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />

          <LabTestsTable
            filteredTests={filteredTests}
            handleDeleteTest={handleDeleteTest}
          />
        </div>
      </main>
    </div>
  );
}