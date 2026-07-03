import React from "react";

import MedicineHeader from "../../components/pharmacy/medicine/MedicineHeader";
import MedicineStats from "../../components/pharmacy/medicine/MedicineStats";
import MedicineInventory from "../../components/pharmacy/medicine/inventory/MedicineInventory";

const Medicines = () => {
  const medicines = [
    {
      _id: "1",
      image: "",
      name: "Paracetamol 500mg",
      sku: "MED-1001",
      category: "Tablet",
      price: 120,
      stock: 250,
      expiryDate: "12 Dec 2027",
      manufacturer: "ABC Pharma",
      status: "available",
    },
    {
      _id: "2",
      image: "",
      name: "Amoxicillin 250mg",
      sku: "MED-1002",
      category: "Capsule",
      price: 280,
      stock: 18,
      expiryDate: "08 Oct 2026",
      manufacturer: "HealthCare Ltd.",
      status: "low-stock",
    },
    {
      _id: "3",
      image: "",
      name: "Vitamin C Syrup",
      sku: "MED-1003",
      category: "Syrup",
      price: 350,
      stock: 0,
      expiryDate: "01 Jan 2026",
      manufacturer: "MedLife Pharma",
      status: "out-of-stock",
    },
    {
      _id: "4",
      image: "",
      name: "Ibuprofen 400mg",
      sku: "MED-1004",
      category: "Tablet",
      price: 180,
      stock: 150,
      expiryDate: "18 Mar 2028",
      manufacturer: "Global Pharma",
      status: "available",
    },
    {
      _id: "5",
      image: "",
      name: "Cough Syrup",
      sku: "MED-1005",
      category: "Syrup",
      price: 450,
      stock: 7,
      expiryDate: "15 Aug 2026",
      manufacturer: "Wellness Pharma",
      status: "low-stock",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-3 lg:px-0 space-y-6">
        <MedicineHeader />
        <MedicineStats medicines={medicines} />
        <MedicineInventory medicines={medicines} />
      </div>
    </div>
  );
};

export default Medicines;