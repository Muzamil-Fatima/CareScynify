import { useState, useCallback } from "react";
import {
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionById,
  getPrescriptionByAppointment,
  getPatientPrescriptions,
} from "../api/PrescriptionApi";

const usePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [history, setHistory] = useState([]);

  // Create Prescription
  const create = useCallback(async (data) => {
    try {
      setLoading(true);
      setError("");

      // Required fields
      if (!data?.appointmentId) {
        throw new Error("Appointment is required.");
      }

      if (!data?.patientId) {
        throw new Error("Patient is required.");
      }

      if (!data?.workplaceId) {
        throw new Error("Workplace is required.");
      }

      const res = await createPrescription({
        appointmentId: data.appointmentId,
        patientId: data.patientId,
        workplaceId: data.workplaceId,

        diagnosis: data.diagnosis,
        symptoms: data.symptoms,
        medicines: data.medicines,
        labTests: data.labTests,
        advice: data.advice,
        followUpDate: data.followUpDate,
      });

      setPrescription(res.prescription);

      return res;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create prescription.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update Prescription
  const update = useCallback(async (prescriptionId, data) => {
    try {
      setLoading(true);
      setError("");

      const res = await updatePrescription(prescriptionId, data);

      setPrescription(res.prescription);

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update prescription.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete Prescription
  const remove = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError("");

      const res = await deletePrescription(prescriptionId);

      setPrescription(null);

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete prescription.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Prescription By ID
  const loadById = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPrescriptionById(prescriptionId);

      setPrescription(res.prescription);

      return res.prescription;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load prescription.");

      setPrescription(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Prescription By Appointment
  const loadByAppointment = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPrescriptionByAppointment(appointmentId);

      setPrescription(res.prescription);

      return res.prescription;
    } catch (err) {
      // 404 means prescription does not exist yet
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || "Failed to load prescription.");
      }

      setPrescription(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Patient Prescription History
  const loadHistory = useCallback(async (patientId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPatientPrescriptions(patientId);

      setHistory(res.prescriptions || []);

      return res.prescriptions || [];
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load prescription history.",
      );

      setHistory([]);

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear Prescription
  const clearPrescription = useCallback(() => {
    setPrescription(null);
  }, []);

  // Clear History
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Clear Error
  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    loading,
    error,

    prescription,
    history,

    create,
    update,
    remove,

    loadById,
    loadByAppointment,
    loadHistory,

    clearPrescription,
    clearHistory,
    clearError,
  };
};

export default usePrescription;
