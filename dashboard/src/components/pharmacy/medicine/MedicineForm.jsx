
import React, { useEffect, useState } from "react";

import MedicineBasicInfo from "./MedicineBasicInfo";
import MedicinePricing from "./MedicinePricing";
import MedicineDescription from "./MedicineDescription";

const initialState = {
  name: "",
  genericName: "",
  brand: "",
  category: "",
  strength: "",
  manufacturer: "",
  stock: "",
  unitPrice: "",
  expiryDate: "",
  description: "",
};

const MedicineForm = ({
  editingMedicine,
  setEditingMedicine,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingMedicine) {
      setFormData({
        name: editingMedicine.name || "",
        genericName: editingMedicine.genericName || "",
        brand: editingMedicine.brand || "",
        category: editingMedicine.category || "",
        strength: editingMedicine.strength || "",
        manufacturer: editingMedicine.manufacturer || "",
        stock: editingMedicine.stock || "",
        unitPrice: editingMedicine.unitPrice || "",
        expiryDate: editingMedicine.expiryDate
          ? editingMedicine.expiryDate.substring(0, 10)
          : "",
        description: editingMedicine.description || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingMedicine]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialState);
    setEditingMedicine(null);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      return alert("Medicine name is required.");
    }

    if (!formData.category) {
      return alert("Please select a category.");
    }

    if (!formData.strength.trim()) {
      return alert("Strength is required.");
    }

    if (!formData.expiryDate) {
      return alert("Expiry date is required.");
    }

    try {
      setLoading(true);

      if (editingMedicine) {
        console.log("Update Medicine", formData);

        // await updateMedicine(editingMedicine._id, formData);
      } else {
        console.log("Add Medicine", formData);

        // await addMedicine(formData);
      }

      handleReset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <MedicineBasicInfo
        formData={formData}
        handleChange={handleChange}
      />

      <MedicinePricing
        formData={formData}
        handleChange={handleChange}
      />

      <MedicineDescription
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        editingMedicine={editingMedicine}
        loading={loading}
      />
    </div>
  );
};

export default MedicineForm;