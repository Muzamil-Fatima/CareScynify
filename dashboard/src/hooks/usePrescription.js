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

  // Create
  const create = useCallback(async (data) => {
    try {
      setLoading(true);
      setError("");

      const res = await createPrescription(data);

      setPrescription(res.prescription);

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create prescription.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update
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

  // Delete
  const remove = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError("");

      const res = await deletePrescription(prescriptionId);

      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete prescription.");

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get by ID
  const loadById = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPrescriptionById(prescriptionId);

      setPrescription(res.prescription);

      return res.prescription;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load prescription.");

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get by Appointment
  const loadByAppointment = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPrescriptionByAppointment(appointmentId);

      setPrescription(res.prescription);

      return res.prescription;
    } catch (err) {
      // 404 is normal when no prescription exists yet
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || "Failed to load prescription.");
      }

      setPrescription(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Patient History
  const loadHistory = useCallback(async (patientId) => {
    try {
      setLoading(true);
      setError("");

      const res = await getPatientPrescriptions(patientId);

      setHistory(res.prescriptions || []);

      return res.prescriptions;
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
  const clearPrescription = useCallback(() => {
    setPrescription(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

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
