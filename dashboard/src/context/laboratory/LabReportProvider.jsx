import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import LabReportContext from "./LabReportContext";

import {
  createLabReportApi,
  getLabReportsApi,
  getLabReportByIdApi,
  updateLabReportApi,
  deleteLabReportApi,
} from "../../api/laboratory/labReportApi";

export default function LabReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLabReports = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getLabReportsApi();

      setReports(res.reports || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLabReportById = useCallback(async (reportId) => {
    try {
      setLoading(true);

      const res = await getLabReportByIdApi(reportId);

      setSelectedReport(res.report);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch report.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createReport = async (reportData) => {
    try {
      const res = await createLabReportApi(reportData);

      setReports((prev) => [res.report, ...prev]);

      toast.success(res.message);
      return res.report;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create report.");
      throw error;
    }
  };

  const updateReport = async (reportId, reportData) => {
    try {
      const res = await updateLabReportApi(reportId, reportData);

      setReports((prev) =>
        prev.map((report) => (report._id === reportId ? res.report : report)),
      );

      if (selectedReport?._id === reportId) {
        setSelectedReport(res.report);
      }

      toast.success(res.message);
      return res.report;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update report.");
      throw error;
    }
  };

  const deleteReport = async (reportId) => {
    try {
      const res = await deleteLabReportApi(reportId);

      setReports((prev) => prev.filter((report) => report._id !== reportId));

      if (selectedReport?._id === reportId) {
        setSelectedReport(null);
      }

      toast.success(res.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete report.");
      throw error;
    }
  };

  return (
    <LabReportContext.Provider
      value={{
        reports,
        selectedReport,
        loading,

        fetchLabReports,
        fetchLabReportById,

        createReport,
        updateReport,
        deleteReport,
      }}
    >
      {children}
    </LabReportContext.Provider>
  );
}
