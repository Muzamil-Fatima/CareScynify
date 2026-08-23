import { useState, useCallback } from "react";

import {
  createPrescription,
  updatePrescription,
  getPrescriptionById,
  getPrescriptionByAppointment,
  getPatientPrescriptions,
} from "../api/doctor/PrescriptionApi";

const usePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [history, setHistory] = useState([]);

  // CREATE PRESCRIPTION

  const create = useCallback(async (data) => {
    try {
      setLoading(true);
      setError("");

      if (!data?.appointmentId) {
        throw new Error("Appointment is required.");
      }

      if (!data?.patientId) {
        throw new Error("Patient is required.");
      }

      if (!data?.workplaceId) {
        throw new Error("Workplace is required.");
      }

      const payload = {
        appointmentId: data.appointmentId,
        patientId: data.patientId,
        workplaceId: data.workplaceId,

        diagnosis: data.diagnosis || "",

        symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],

        medicines: Array.isArray(data.medicines) ? data.medicines : [],

        labTests: Array.isArray(data.labTests) ? data.labTests : [],

        advice: data.advice || "",

        followUpDate: data.followUpDate || "",
      };

      const res = await createPrescription(payload);

      setPrescription(res?.prescription || null);

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create prescription.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // UPDATE PRESCRIPTION

  const update = useCallback(async (prescriptionId, data) => {
    try {
      setLoading(true);
      setError("");

      if (!prescriptionId) {
        throw new Error("Prescription ID is required.");
      }

      const payload = {
        appointmentId: data?.appointmentId,
        patientId: data?.patientId,
        workplaceId: data?.workplaceId,

        diagnosis: data?.diagnosis || "",

        symptoms: Array.isArray(data?.symptoms) ? data.symptoms : [],

        medicines: Array.isArray(data?.medicines) ? data.medicines : [],

        labTests: Array.isArray(data?.labTests) ? data.labTests : [],

        advice: data?.advice || "",

        followUpDate: data?.followUpDate || "",
      };

      // /*
      //  * Remove undefined values.
      //  * This prevents accidentally sending undefined
      //  * fields to the backend.
      //  */
      // Object.keys(payload).forEach((key) => {
      //   if (payload[key] === undefined) {
      //     delete payload[key];
      //   }
      // });

      const res = await updatePrescription(prescriptionId, payload);

      setPrescription(res?.prescription || null);

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update prescription.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET PRESCRIPTION BY ID

  const loadById = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError("");

      if (!prescriptionId) {
        throw new Error("Prescription ID is required.");
      }

      const res = await getPrescriptionById(prescriptionId);

      setPrescription(res?.prescription || null);

      return res?.prescription || null;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load prescription.";

      setError(message);
      setPrescription(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET PRESCRIPTION BY APPOINTMENT

  const loadByAppointment = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError("");

      if (!appointmentId) {
        setPrescription(null);
        return null;
      }

      const res = await getPrescriptionByAppointment(appointmentId);

      setPrescription(res?.prescription || null);

      return res?.prescription || null;
    } catch (err) {
      if (err?.response?.status !== 404) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load prescription.";

        setError(message);
      }

      setPrescription(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET PATIENT PRESCRIPTION HISTORY

  const loadHistory = useCallback(async (patientId) => {
    try {
      setLoading(true);
      setError("");

      if (!patientId) {
        setHistory([]);
        return [];
      }

      const res = await getPatientPrescriptions(patientId);

      const prescriptions = Array.isArray(res?.prescriptions)
        ? res.prescriptions
        : [];

      setHistory(prescriptions);

      return prescriptions;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load prescription history.";

      setError(message);
      setHistory([]);

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // CLEAR CURRENT PRESCRIPTION

  const clearPrescription = useCallback(() => {
    setPrescription(null);
  }, []);

  // CLEAR HISTORY

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // CLEAR ERROR

  const clearError = useCallback(() => {
    setError("");
  }, []);

  // RETURN

  return {
    loading,
    error,

    prescription,
    history,

    create,
    update,

    loadById,
    loadByAppointment,
    loadHistory,

    clearPrescription,
    clearHistory,
    clearError,
  };
};

export default usePrescription;
