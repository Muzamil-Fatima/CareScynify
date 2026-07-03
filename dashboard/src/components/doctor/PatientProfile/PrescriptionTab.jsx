import React, { useState, useContext, useEffect } from "react";
import usePrescription from "../../../hooks/usePrescription";
import PatientContext from "../../../context/patients/PatientContext";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MedicineItem from "./prescription/MedicineItem";
import PrescriptionHistory from "./prescription/PrescriptionHistory";
import PrescriptionHistoryModal from "./prescription/PrescriptionHistoryModal";
const inputClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

const textareaClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none focus:outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 appearance-none";
const outerBox =
  "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all";
const PrescriptionTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { patient, appointmentId } = useContext(PatientContext);
  const { loading, history, create, update, loadHistory, loadByAppointment } =
    usePrescription();

  useEffect(() => {
    if (patient?._id) {
      loadHistory(patient._id);
    }
  }, [patient?._id, loadHistory]);
  const handleSave = async () => {
    if (!patient) return;

    try {
      const payload = {
        patientId: patient._id,
        appointmentId,

        diagnosis: formData.diagnosis,

        symptoms: formData.symptoms
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        medicines,

        labTests: formData.labTests
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        advice: formData.advice,

        followUpDate: formData.followUpDate,
      };

      if (editMode && editingId) {
        await update(editingId, payload);
      } else {
        await create(payload);
      }

      await loadHistory(patient._id);
      await loadByAppointment(appointmentId);
    } catch (err) {
      console.error(err);
    }
  };
  const handleView = (item) => {
    setSelectedPrescription(item);
    setHistoryOpen(true);
  };
  const [medicines, setMedicines] = useState([
    {
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);
  const [formData, setFormData] = useState({
    diagnosis: "",
    symptoms: "",
    labTests: "",
    advice: "",
    followUpDate: "",
  });
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (!appointmentId) return;

      const data = await loadByAppointment(appointmentId);

      if (!data) {
        setEditMode(false);
        setEditingId(null);

        setFormData({
          diagnosis: "",
          symptoms: "",
          labTests: "",
          advice: "",
          followUpDate: "",
        });
        setMedicines((prev) => [
          ...prev,
          {
            medicine: "",
            dosage: "",
            frequency: "",
            duration: "",
          },
        ]);

        return;
      }

      setEditMode(true);
      setEditingId(data._id);

      setFormData({
        diagnosis: data.diagnosis || "",
        symptoms: Array.isArray(data.symptoms) ? data.symptoms.join("\n") : "",
        labTests: Array.isArray(data.labTests) ? data.labTests.join("\n") : "",
        advice: data.advice || "",
        followUpDate: data.followUpDate
          ? data.followUpDate.substring(0, 10)
          : "",
      });

      setMedicines(
        data.medicines?.length
          ? data.medicines
          : [
              {
                medicine: "",
                dosage: "",
                frequency: "",
                duration: "",
              },
            ],
      );
    };

    load();
  }, [appointmentId, loadByAppointment]);
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicine: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };
  return (
    <div className="space-y-6">
      {/* Diagnosis */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Diagnosis</h2>
        </div>

        <textarea
          rows="4"
          value={formData.diagnosis}
          onChange={(e) =>
            setFormData({
              ...formData,
              diagnosis: e.target.value,
            })
          }
          placeholder="Enter diagnosis..."
          className={textareaClass}
        />
      </div>

      {/* Symptoms */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Symptoms</h2>
        </div>
        <textarea
          rows="4"
          value={formData.symptoms}
          onChange={(e) =>
            setFormData({
              ...formData,
              symptoms: e.target.value,
            })
          }
          placeholder="Enter symptoms..."
          className={textareaClass}
        />
      </div>

      {/* Medicines */}
      <div className={outerBox}>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <MedicationRoundedIcon className="text-green-600" />
            <h2 className="font-semibold text-lg">Medicines</h2>
          </div>

          <button
            onClick={addMedicine}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            <AddRoundedIcon fontSize="small" />
            Add Medicine
          </button>
        </div>

        <div className="space-y-5">
          {medicines.map((item, index) => (
            <MedicineItem
              key={index}
              index={index}
              medicine={item}
              onChange={handleChange}
              onRemove={removeMedicine}
              canRemove={medicines.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Lab Tests */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <BiotechRoundedIcon className="text-blue-600" />
          <h2 className="font-semibold text-lg">Recommended Lab Tests</h2>
        </div>

        <textarea
          rows="3"
          value={formData.labTests}
          onChange={(e) =>
            setFormData({
              ...formData,
              labTests: e.target.value,
            })
          }
          placeholder="CBC, Blood Sugar, X-Ray..."
          className={textareaClass}
        />
      </div>

      {/* Advice */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-orange-600" />
          <h2 className="font-semibold text-lg">Advice</h2>
        </div>

        <textarea
          rows="4"
          value={formData.advice}
          onChange={(e) =>
            setFormData({
              ...formData,
              advice: e.target.value,
            })
          }
          placeholder="Write advice..."
          className={textareaClass}
        />
      </div>

      {/* Follow Up */}
      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <EventRoundedIcon className="text-purple-600" />
          <h2 className="font-semibold text-lg">Follow-up Date</h2>
        </div>

        <input
          type="date"
          value={formData.followUpDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              followUpDate: e.target.value,
            })
          }
          className={inputClass}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`text-white px-8 py-3 rounded-xl font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {loading ? "Saving..." : "Save Prescription"}
        </button>
      </div>
      <PrescriptionHistory
        prescriptions={history}
        loading={loading}
        onView={handleView}
      />
      <PrescriptionHistoryModal
        open={historyOpen}
        prescription={selectedPrescription}
        onClose={() => setHistoryOpen(false)}
        onUseTemplate={(item) => {
          setHistoryOpen(false);

          setFormData({
            diagnosis: item.diagnosis || "",
            symptoms: item.symptoms?.join("\n") || "",
            labTests: item.labTests?.join("\n") || "",
            advice: item.advice || "",
            followUpDate: "",
          });

          setMedicines(
            item.medicines?.length
              ? item.medicines
              : [{ medicine: "", dosage: "", frequency: "", duration: "" }],
          );

          setEditMode(true);
          setEditingId(item._id);
        }}
      />
    </div>
  );
};

export default PrescriptionTab;
