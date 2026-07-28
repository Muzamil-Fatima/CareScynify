import React, { useState, useCallback } from "react";
import LabSampleContext from "./LabSampleContext";
import { toast } from "react-hot-toast";

import {
  createLabSample,
  getLabSamples,
  getLabSampleById,
  updateLabSampleStatus,
  updateTestStatus,
  deleteLabSample,
} from "../../api/laboratory/labSampleApi";

export default function LabSampleProvider({ children }) {
  const [samples, setSamples] = useState([]);

  const [selectedSample, setSelectedSample] = useState(null);

  const [loading, setLoading] = useState(false);

  // Get All Samples

  const fetchLabSamples = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getLabSamples();

      setSamples(data.samples || []);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to load samples");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Single Sample
  const fetchLabSampleById = async (id) => {
    try {
      const data = await getLabSampleById(id);

      setSelectedSample(data.sample);

      return data.sample;
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to load sample");
    }
  };

  // Create Sample

  const addLabSample = async (sampleData) => {
    try {
      const data = await createLabSample(sampleData);

      toast.success("Lab sample created successfully");

      fetchLabSamples();

      return data;
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Sample creation failed");
    }
  };

  // Update Sample Status

  const changeSampleStatus = useCallback(
    async (id, status) => {
      try {
        await updateLabSampleStatus(id, status);

        toast.success("Sample status updated");

        fetchLabSamples();
      } catch (error) {
        console.log(error);

        toast.error(error.response?.data?.message || "Status update failed");
      }
    },
    [fetchLabSamples],
  );

  // Update Test Status

  const changeTestStatus = async (id, testId, status) => {
    try {
      await updateTestStatus(id, testId, status);

      toast.success("Test status updated");

      fetchLabSamples();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Test update failed");
    }
  };

  // Delete Sample

  const removeLabSample = async (id) => {
    try {
      await deleteLabSample(id);

      toast.success("Sample deleted");

      fetchLabSamples();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const value = {
    samples,

    setSamples,

    selectedSample,

    setSelectedSample,

    loading,

    fetchLabSamples,

    fetchLabSampleById,

    addLabSample,

    changeSampleStatus,

    changeTestStatus,

    removeLabSample,
  };

  return (
    <LabSampleContext.Provider value={value}>
      {children}
    </LabSampleContext.Provider>
  );
}
