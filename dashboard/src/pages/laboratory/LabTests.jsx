import React, { useEffect, useState } from "react";

import LabTestsHeader from "../../components/laboratory/labTests/LabTestsHeader";
import LabTestForm from "../../components/laboratory/labTests/LabTestForm";
import LabTestsTable from "../../components/laboratory/labTests/LabTestsTable";

import useLabTest from "../../hooks/laboratory/useLabTest";

export default function LabTests() {
  const {
    testsList = [],
    getLabTests,
    createTest,
    updateTest,
    deleteTest,
  } = useLabTest();

  const [selectedTest, setSelectedTest] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Biochemistry",
    price: "",
    turnAround: "",
  });

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Load Lab Tests
  useEffect(() => {
    getLabTests();
  }, [getLabTests]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit Test
  const handleEditTest = (test) => {
    setSelectedTest(test);

    setFormData({
      name: test.name,
      category: test.category,
      price: test.price,
      turnAround: test.turnAround,
    });
  };

  // Create / Update Test
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.turnAround) {
      return;
    }

    try {
      if (selectedTest) {
        await updateTest(selectedTest._id, {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          turnAround: formData.turnAround,
        });

        setSelectedTest(null);
      } else {
        await createTest({
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          turnAround: formData.turnAround,
        });
      }

      setFormData({
        name: "",
        category: "Biochemistry",
        price: "",
        turnAround: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Test
  const handleDeleteTest = async (id) => {
    try {
      await deleteTest(id);
    } catch (error) {
      console.log(error);
    }
  };

  // Search Filter
  const filteredTests = testsList.filter((t) => {
    const name = t.name?.toLowerCase() || "";
    const code = t.code?.toLowerCase() || "";
    const category = t.category?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      code.includes(search) ||
      category.includes(search)
    );
  });

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
            selectedTest={selectedTest}
          />

          <LabTestsTable
            filteredTests={filteredTests}
            handleDeleteTest={handleDeleteTest}
            handleEditTest={handleEditTest}
          />
        </div>
      </main>
    </div>
  );
}