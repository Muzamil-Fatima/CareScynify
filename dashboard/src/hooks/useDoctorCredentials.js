import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  addDoctorCredential,
  getDoctorCredentials,
  deleteDoctorCredential,
} from "../api/doctorApi";

const useDoctorCredentials = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Credentials
  const fetchCredentials = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDoctorCredentials();

      setDocuments(data.credentials || []);
    } catch (error) {
      console.error("Fetch Credentials Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch credentials",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload Credential
  const uploadCredential = async (formData) => {
    try {
      setLoading(true);

      const data = await addDoctorCredential(formData);

      // Backend returns newly created credential
      if (data?.credential) {
        setDocuments((prev) => [data.credential, ...prev]);
      }

      toast.success(
        data?.message || "Credential uploaded successfully",
      );

      return data;
    } catch (error) {
      console.error("Upload Credential Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload credential",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete Credential
  const removeCredential = async (id) => {
    try {
      setLoading(true);

      const data = await deleteDoctorCredential(id);

      setDocuments((prev) =>
        prev.filter((doc) => doc._id !== id),
      );

      toast.success(
        data?.message || "Credential deleted successfully",
      );

      return data;
    } catch (error) {
      console.error("Delete Credential Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete credential",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  return {
    documents,
    loading,

    // actions
    fetchCredentials,
    uploadCredential,
    removeCredential,
  };
};

export default useDoctorCredentials;