import React, { useState, useEffect } from "react";

import usePrescription from "../../../hooks/usePrescription";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";

import { usePatient } from "../../../context/patients/PatientContext";
import { useDoctor } from "../../../context/doctor/DoctorContext";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import MedicineItem from "./prescription/MedicineItem";
import PrescriptionHistory from "./prescription/PrescriptionHistory";

const inputClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

const textareaClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none focus:outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 appearance-none";

const outerBox =
  "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all";

const emptyMedicine = {
  medicine: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

const emptyForm = {
  diagnosis: "",
  symptoms: "",
  labTests: "",
  advice: "",
  followUpDate: "",
};

const PrescriptionTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { patient, appointmentId } = usePatient();
  const { profile } = useDoctor();

  const { loading, history, create, update, loadHistory, loadByAppointment } =
    usePrescription();

  const { appointments = [] } = useDoctorAppointments("all");

  const [medicines, setMedicines] = useState([
    {
      ...emptyMedicine,
    },
  ]);

  const [formData, setFormData] = useState({
    ...emptyForm,
  });

  /*
   
   * DOCTOR INFORMATION
   
   */

  const doctor = profile?.doctor || {};
  const user = profile?.user || {};

  const doctorName =
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Doctor";

  /*
   
   * CURRENT APPOINTMENT
   
   */

  const currentAppointment = appointments.find(
    (appointment) =>
      String(appointment?.appointmentId) === String(appointmentId) ||
      String(appointment?._id) === String(appointmentId),
  );

  const appointmentCustomId = currentAppointment?.appointmentId || "";
 
  /*
   
   * WORKPLACE
   
   */

  const appointmentWorkplaceId =
    currentAppointment?.workplaceId?._id ||
    currentAppointment?.workplaceId ||
    currentAppointment?.workplace?._id ||
    currentAppointment?.workplace ||
    null;

  const doctorWorkplace = doctor?.workplaces?.find(
    (workplace) => String(workplace?._id) === String(appointmentWorkplaceId),
  );

  const workplaceName =
    currentAppointment?.workplaceName ||
    currentAppointment?.workplace?.name ||
    doctorWorkplace?.name ||
    "Workplace";

  const workplaceLocation =
    currentAppointment?.workplaceLocation ||
    currentAppointment?.workplace?.location ||
    doctorWorkplace?.location ||
    "Location not available";

  /*
   
   * DIGITAL SIGNATURE
   
   */

  const signatureUrl =
    typeof doctor?.digitalSignature === "string"
      ? doctor.digitalSignature
      : doctor?.digitalSignature?.url || "";

  /*
   
   * LOAD PATIENT PRESCRIPTION HISTORY
   
   */

  useEffect(() => {
    if (!patient?._id) return;

    loadHistory(patient._id);
  }, [patient?._id, loadHistory]);

  /*
   
   * LOAD CURRENT APPOINTMENT PRESCRIPTION
   
   */

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!currentAppointment?._id) return;

      try {
        const data = await loadByAppointment(currentAppointment._id);

        if (cancelled) return;

        /*
         
         * NO EXISTING PRESCRIPTION
         
         */

        if (!data) {
          setEditMode(false);
          setEditingId(null);

          setFormData({
            ...emptyForm,
          });

          setMedicines([
            {
              ...emptyMedicine,
            },
          ]);

          return;
        }

        setEditMode(true);
        setEditingId(data?._id || null);

        /*
         
         * FORM DATA
         
         */

        setFormData({
          diagnosis: data?.diagnosis || "",

          symptoms: Array.isArray(data?.symptoms)
            ? data.symptoms.join("\n")
            : data?.symptoms || "",

          labTests: Array.isArray(data?.labTests)
            ? data.labTests.join("\n")
            : data?.labTests || "",

          advice: data?.advice || "",

          followUpDate: data?.followUpDate
            ? String(data.followUpDate).substring(0, 10)
            : "",
        });

        /*
         
         * MEDICINES
         
         */

        setMedicines(
          Array.isArray(data?.medicines) && data.medicines.length
            ? data.medicines.map((item) => ({
                medicine: item?.medicine || "",
                dosage: item?.dosage || "",
                frequency: item?.frequency || "",
                duration: item?.duration || "",
                instructions: item?.instructions || "",
              }))
            : [
                {
                  ...emptyMedicine,
                },
              ],
        );
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load appointment prescription:", error);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [currentAppointment?._id, loadByAppointment]);

  /*
   
   * SAVE PRESCRIPTION
   
   */

  const handleSave = async () => {
    if (!patient?._id) {
      console.error("Patient ID is missing");
      return;
    }

    if (!currentAppointment?._id) {
      console.error("Appointment MongoDB ID is missing");
      return;
    }

    if (!appointmentWorkplaceId) {
      console.error("Workplace ID is missing");
      return;
    }

    try {
      const payload = {
        /*
         * Appointment MongoDB ID
         */
        appointmentId: currentAppointment._id,

        /*
         * Patient MongoDB ID
         */
        patientId: patient._id,

        /*
         * Workplace MongoDB ID
         */
        workplaceId: appointmentWorkplaceId,

        /*
         * Diagnosis
         */
        diagnosis: formData.diagnosis?.trim() || "",

        /*
         * Symptoms
         */
        symptoms: formData.symptoms
          ? formData.symptoms
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],

        /*
         * Medicines
         */
        medicines: medicines
          .filter((item) => item?.medicine?.trim())
          .map((item) => ({
            medicine: item?.medicine?.trim() || "",
            dosage: item?.dosage?.trim() || "",
            frequency: item?.frequency?.trim() || "",
            duration: item?.duration?.trim() || "",
            instructions: item?.instructions?.trim() || "",
          })),

        /*
         * Lab Tests
         */
        labTests: formData.labTests
          ? formData.labTests
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],

        /*
         * Advice
         */
        advice: formData.advice?.trim() || "",

        /*
         * Follow Up
         */
        followUpDate: formData.followUpDate || "",
      };

      console.log("Prescription Payload:", payload);

      let response;

      /*
       
       * UPDATE EXISTING PRESCRIPTION
       
       */

      if (editMode && editingId) {
        response = await update(editingId, payload);
      } else {
        /*
         
         * CREATE NEW PRESCRIPTION
         
         */

        response = await create(payload);
      }

      console.log("Prescription saved:", response);

      /*
       
       * GET SAVED PRESCRIPTION
       
       */

      const savedPrescription = response?.prescription;

      /*
       
       * REMEMBER PRESCRIPTION ID
       
       *
       * No pdfUrl state is required here.
       * The PDF URL is stored in the prescription history
       * and PrescriptionHistoryCard handles opening it.
       
       */

      if (!editMode && savedPrescription?._id) {
        setEditMode(true);
        setEditingId(savedPrescription._id);
      }

      /*
       
       * REFRESH HISTORY
       
       */

      await loadHistory(patient._id);

      /*
       
       * RELOAD CURRENT APPOINTMENT PRESCRIPTION
       
       */

      const latestPrescription = await loadByAppointment(
        currentAppointment._id,
      );

      if (latestPrescription) {
        setEditMode(true);

        setEditingId(
          latestPrescription?._id || savedPrescription?._id || editingId,
        );

        /*
         * Refresh form with latest backend data
         */

        setFormData({
          diagnosis: latestPrescription?.diagnosis || "",

          symptoms: Array.isArray(latestPrescription?.symptoms)
            ? latestPrescription.symptoms.join("\n")
            : latestPrescription?.symptoms || "",

          labTests: Array.isArray(latestPrescription?.labTests)
            ? latestPrescription.labTests.join("\n")
            : latestPrescription?.labTests || "",

          advice: latestPrescription?.advice || "",

          followUpDate: latestPrescription?.followUpDate
            ? String(latestPrescription.followUpDate).substring(0, 10)
            : "",
        });

        setMedicines(
          Array.isArray(latestPrescription?.medicines) &&
            latestPrescription.medicines.length
            ? latestPrescription.medicines.map((item) => ({
                medicine: item?.medicine || "",
                dosage: item?.dosage || "",
                frequency: item?.frequency || "",
                duration: item?.duration || "",
                instructions: item?.instructions || "",
              }))
            : [
                {
                  ...emptyMedicine,
                },
              ],
        );
      }
    } catch (err) {
      console.error(
        "Failed to save prescription:",
        err?.response?.data || err?.message || err,
      );
    }
  };

  /*
   * ADD MEDICINE
   */

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        ...emptyMedicine,
      },
    ]);
  };

  /*
   * REMOVE MEDICINE
   */

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };
  /*
   * MEDICINE FIELD CHANGE
   */
  const handleChange = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };
  /*
   * RETURN
   */

  return (
    <div className="space-y-6">
      {/* DOCTOR / WORKPLACE HEADER */}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* DOCTOR INFORMATION */}

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-slate-800">
              Dr. {doctorName}
            </h1>

            {doctor?.specialization && (
              <p className="mt-1 text-purple-600 font-medium">
                {doctor.specialization}
              </p>
            )}

            {doctor?.qualifications && (
              <p className="mt-1 text-sm text-slate-500">
                {doctor.qualifications}
              </p>
            )}

            {doctor?.drId && (
              <p className="mt-2 text-sm text-slate-500">
                Doctor ID:{" "}
                <span className="font-semibold text-slate-700">
                  {doctor.drId}
                </span>
              </p>
            )}
          </div>

          {/* WORKPLACE */}

          <div className="md:text-right min-w-0">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Consultation Workplace
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-800">
              {workplaceName}
            </h2>

            <p className="mt-1 text-sm text-slate-500 wrap-break-word">
              {workplaceLocation}
            </p>

            {currentAppointment?.consultationType && (
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium capitalize">
                {String(currentAppointment.consultationType).replace("_", " ")}
              </span>
            )}
          </div>
        </div>

        {/* PATIENT + SIGNATURE */}

        <div className="border-t border-slate-100 mt-5 pt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          {/* PATIENT */}

          <div className="text-sm text-slate-500 min-w-0">
            <p>
              Patient:{" "}
              <span className="font-semibold text-slate-700">
                {patient?.name || patient?.user?.name || "Patient"}
              </span>
            </p>

            {appointmentId && (
              <p className="mt-1">
                Appointment ID:{" "}
                <span className="font-medium text-slate-700 break-all">
                  {appointmentCustomId || appointmentId}
                </span>
              </p>
            )}

            {currentAppointment?.date && (
              <p className="mt-1">
                Date:{" "}
                <span className="font-medium text-slate-700">
                  {new Date(currentAppointment.date).toLocaleDateString()}
                </span>
              </p>
            )}
          </div>

          {/* DIGITAL SIGNATURE */}

          {signatureUrl && (
            <div className="flex flex-col items-center sm:items-end">
              <img
                src={signatureUrl}
                alt="Doctor Digital Signature"
                className="h-16 max-w-40 object-contain"
              />

              <div className="w-full border-t border-slate-300 mt-1 pt-1 text-center">
                <p className="text-xs font-medium text-slate-600">
                  Dr. {doctorName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DIAGNOSIS */}

      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />

          <h2 className="font-semibold text-lg">Diagnosis</h2>
        </div>

        <textarea
          rows="4"
          value={formData.diagnosis}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              diagnosis: e.target.value,
            }))
          }
          placeholder="Enter diagnosis..."
          className={textareaClass}
        />
      </div>

      {/* SYMPTOMS */}

      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-indigo-600" />

          <h2 className="font-semibold text-lg">Symptoms</h2>
        </div>

        <textarea
          rows="4"
          value={formData.symptoms}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              symptoms: e.target.value,
            }))
          }
          placeholder="Enter symptoms..."
          className={textareaClass}
        />
      </div>

      {/* MEDICINES */}

      <div className={outerBox}>
        <div className="flex justify-between items-center mb-5 gap-3">
          <div className="flex items-center gap-2">
            <MedicationRoundedIcon className="text-green-600" />

            <h2 className="font-semibold text-lg">Medicines</h2>
          </div>

          <button
            type="button"
            onClick={addMedicine}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition shrink-0"
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

      {/* 
          LAB TESTS
      = */}

      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <BiotechRoundedIcon className="text-blue-600" />

          <h2 className="font-semibold text-lg">Recommended Lab Tests</h2>
        </div>

        <textarea
          rows="3"
          value={formData.labTests}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              labTests: e.target.value,
            }))
          }
          placeholder="CBC, Blood Sugar, X-Ray..."
          className={textareaClass}
        />
      </div>

      {/*  ADVICE */}

      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <NoteAltRoundedIcon className="text-orange-600" />

          <h2 className="font-semibold text-lg">Advice</h2>
        </div>

        <textarea
          rows="4"
          value={formData.advice}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              advice: e.target.value,
            }))
          }
          placeholder="Write advice..."
          className={textareaClass}
        />
      </div>

      {/* 
          FOLLOW UP
      = */}

      <div className={outerBox}>
        <div className="flex items-center gap-2 mb-4">
          <EventRoundedIcon className="text-purple-600" />

          <h2 className="font-semibold text-lg">Follow-up Date</h2>
        </div>

        <input
          type="date"
          value={formData.followUpDate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              followUpDate: e.target.value,
            }))
          }
          className={inputClass}
        />
      </div>

      {/* 
          SAVE PRESCRIPTION
      = */}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 cursor-pointer"
          }`}
        >
          {loading ? "Saving..." : "Save Prescription"}
        </button>
      </div>

      <PrescriptionHistory prescriptions={history} loading={loading} />
    </div>
  );
};

export default PrescriptionTab;
