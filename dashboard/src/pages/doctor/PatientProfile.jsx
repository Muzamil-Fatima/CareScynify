import React, { useState } from "react";
import PatientProvider  from "../../context/patients/PatientProvider";
import PatientHeader from "../../components/drPatientProfile/PatientHeader";
import OverviewTab from "../../components/drPatientProfile/OverviewTab";
import MedicalInfoTab from "../../components/drPatientProfile/MedicalInfoTab";
import AppointmentHistoryTab from "../../components/drPatientProfile/AppointmentHistoryTab";
import ReportsTab from "../../components/drPatientProfile/ReportsTab";
import PrescriptionTab from "../../components/drPatientProfile/PrescriptionTab";
import DrNotesTab from "../../components/drPatientProfile/DrNotesTab";
const PatientProfileContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "medical", label: "Medical Information" },
    { id: "appointments", label: "Appointments" },
    { id: "reports", label: "Reports" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "notes", label: "Dr Notes" },
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
