import React, { useState } from "react";
import PatientProvider  from "../../context/patients/PatientProvider";
import PatientHeader from "../../components/doctor/PatientProfile/PatientHeader";
import OverviewTab from "../../components/doctor/PatientProfile/OverviewTab";
import MedicalInfoTab from "../../components/doctor/PatientProfile/MedicalInfoTab";
import AppointmentHistoryTab from "../../components/doctor/PatientProfile/AppointmentHistoryTab";
import ReportsTab from "../../components/doctor/PatientProfile/reports/ReportsTab";
import PrescriptionTab from "../../components/doctor/PatientProfile/PrescriptionTab";
const PatientProfileContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "medical", label: "Medical Information" },
    { id: "appointments", label: "Appointments" },
    { id: "reports", label: "Reports" },
    { id: "prescriptions", label: "Prescriptions" },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <PatientHeader />

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 whitespace-nowrap text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab />}

          {activeTab === "medical" && <MedicalInfoTab />}

          {activeTab === "appointments" && <AppointmentHistoryTab />}

          {activeTab === "reports" && <ReportsTab />}

          {activeTab === "prescriptions" && <PrescriptionTab />}

          {activeTab === "notes" && <DrNotesTab />}
        </div>
      </div>
    </div>
  );
};
const PatientProfile = () => {
  return (
    <PatientProvider>
      <PatientProfileContent />
    </PatientProvider>
  );
};
export default PatientProfile;
