import { useState, useCallback } from "react";
import toast from "react-hot-toast";

import LabTestContext from "./LabTestContext";

import {
  getLabTestsApi,
  createLabTestApi,
  updateLabTestApi,
  deleteLabTestApi,
} from "../../api/laboratory/labTestApi";

const LabTestProvider = ({ children }) => {
  const [testsList, setTestsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===========================
  // Get All Lab Tests
  // ===========================

  const getLabTests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getLabTestsApi();

      setTestsList(res.tests || []);
    } catch (error) {
      console.log(error);

      setError(error.message);

      toast.error(error?.response?.data?.message || "Failed to load lab tests");
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================
  // Create Lab Test
  // ===========================

  const createTest = useCallback(async (data) => {
    try {
      setLoading(true);

      const res = await createLabTestApi(data);

      setTestsList((prev) => [res.test, ...prev]);

      toast.success(res.message || "Lab test created successfully");

      return res;
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to create lab test",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================
  // Update Lab Test
  // ===========================

  const updateTest = useCallback(async (id, data) => {
    try {
      setLoading(true);

      const res = await updateLabTestApi(id, data);

      setTestsList((prev) =>
        prev.map((test) => (test._id === id ? res.test : test)),
      );

      toast.success(res.message || "Lab test updated successfully");

      return res;
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to update lab test",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================
  // Delete Lab Test
  // ===========================

  const deleteTest = useCallback(async (id) => {
    try {
      setLoading(true);

      const res = await deleteLabTestApi(id);

      setTestsList((prev) => prev.filter((test) => test._id !== id));

      toast.success(res.message || "Lab test deleted successfully");

      return res;
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to delete lab test",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <LabTestContext.Provider
      value={{
        testsList,
        loading,
        error,
        getLabTests,
        createTest,
        updateTest,
        deleteTest,
      }}
    >
      {children}
    </LabTestContext.Provider>
  );
};

export default LabTestProvider;
