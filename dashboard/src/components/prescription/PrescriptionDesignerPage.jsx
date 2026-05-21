import React, { useState } from 'react';
import SidebarControls from '../components/SidebarControls';
import PatientForm from '../components/PatientForm';
import PrescriptionCanvas from '../components/PrescriptionCanvas';

const initialElements = [
  { id: 'header', type: 'header', title: 'City Hospital & Clinic', subtitle: 'Dr. Shahzad Amin - MBBS, FCPS\nCardiologist | Reg No: 12345-P', active: true },
  { id: 'patient_info', type: 'patient_info', label: 'Patient Vital Details', active: true },
  { id: 'rx_section', type: 'rx_section', label: 'Medicines & Dosage (Rx)', active: true },
  { id: 'notes', type: 'notes', label: 'Advice / Instructions / Lab Tests', active: true },
  { id: 'footer', type: 'footer', text: 'Timing: 5:00 PM - 9:00 PM | Contact: +92 300 1234567', active: true }
];

export default function PrescriptionDesignerPage() {
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(null);
  
  const [patientData, setPatientData] = useState({
    name: 'Muhammad Ali',
    age: '34',
    gender: 'Male',
    date: new Date().toLocaleDateString(),
    weight: '75kg',
    bp: '120/80',
    medicines: [
      { name: 'Tab. Panadol 500mg', dosage: '1-0-1', duration: '5 Days', instructions: 'After food' },
    ],
    notes: '- Complete Blood Count (CBC) test\n- Avoid cold drinks and oily food.'
  });

  const toggleElement = (id) => {
    setElements(elements.map(el => el.id === id ? { ...el, active: !el.active } : el));
  };

  const updateElementText = (id, fields) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...fields } : el));
    if (selectedElement?.id === id) {
      setSelectedElement(prev => ({ ...prev, ...fields }));
    }
  };

  const handleMedChange = (index, field, value) => {
    const updatedMeds = [...patientData.medicines];
    updatedMeds[index][field] = value;
    setPatientData({ ...patientData, medicines: updatedMeds });
  };

  const addMedicineRow = () => {
    setPatientData({
      ...patientData,
      medicines: [...patientData.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800 print:bg-white print:p-0">
      
      {/* Top Main Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">Rx</div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Smart Prescription Designer</h1>
            <p className="text-xs text-slate-500">Canva-style structured framework for layouts</p>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition shadow-sm"
        >
          🖨️ Print Prescription
        </button>
      </header>

      {/* Grid Sub-Arrangement View Panels */}
      <div className="flex-1 flex overflow-hidden print:overflow-visible print:h-auto">
        <SidebarControls 
          elements={elements} 
          toggleElement={toggleElement} 
          selectedElement={selectedElement}
          updateElementText={updateElementText}
        />
        
        <PrescriptionCanvas 
          elements={elements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          patientData={patientData}
        />

        <PatientForm 
          patientData={patientData}
          setPatientData={setPatientData}
          handleMedChange={handleMedChange}
          addMedicineRow={addMedicineRow}
        />
      </div>
    </div>
  );
}