import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MedicineBasicInfo from "./MedicineBasicInfo";
import MedicinePricing from "./MedicinePricing";
import MedicineDescription from "./MedicineDescription";
import { usePharmacy } from "../../../context/pharmacy/PharmacyContext";
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

const MedicineForm = ({ editingMedicine, setEditingMedicine }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { createMedicine, editMedicine } = usePharmacy();
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
      return toast.error("Medicine name is required.");
    }

    if (!formData.category) {
      return toast.error("Please select a category.");
    }

    if (!formData.strength.trim()) {
      return toast.error("Strength is required.");
    }

    if (!formData.expiryDate) {
      return toast.error("Expiry date is required.");
    }

    try {
      setLoading(true);

      if (editingMedicine) {
        const data = await editMedicine(editingMedicine._id, formData);
        toast.success(data.message || "Medicine updated successfully.");
      } else {
        const data = await createMedicine(formData);
        toast.success(data.message || "Medicine added successfully.");
      }

      handleReset();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <MedicineBasicInfo formData={formData} handleChange={handleChange} />

      <MedicinePricing formData={formData} handleChange={handleChange} />

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
