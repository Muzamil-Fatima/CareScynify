import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReportPatientCard from "../../components/laboratory/createReports/ReportPatientCard";
import ReportResultsTable from "../../components/laboratory/createReports/ReportResultsTable";
import ReportRemarks from "../../components/laboratory/createReports/ReportRemarks";
import ReportActions from "../../components/laboratory/createReports/ReportActions";

import useLabSample from "../../hooks/laboratory/useLabSamples";
import useLabReport from "../../hooks/laboratory/useLabReport";
const LabCreateReport = () => {
  const navigate = useNavigate();

  const { sampleId } = useParams();

  const { fetchLabSampleById } = useLabSample();
  const { createReport } = useLabReport();
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState(null);

  const [parameters, setParameters] = useState([
    {
      parameter: "",
      value: "",
      unit: "",
      referenceRange: "",
      remarks: "",
    },
  ]);

  const [remarks, setRemarks] = useState("");

  // Fetch Sample Data
  useEffect(() => {
    const loadSample = async () => {
      try {
        const data = await fetchLabSampleById(sampleId);

        setReport({
          patientId: data.labPatientId?._id,

          sampleObjectId: data._id,

          patientName: data.labPatientId?.name || data.patientId?.userId?.name || "Unknown Patient",

          sampleId: data.sampleId,

          reportId: "",

          testName: data.tests?.map((test) => test.testName).join(", "),

          date: new Date().toLocaleDateString(),

          status: data.sampleStatus,
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to save report");
      }
    };

    if (sampleId) {
      loadSample();
    }
  }, [sampleId, fetchLabSampleById]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const reportData = {
        sampleId: report.sampleObjectId,

        results: parameters.map((item) => ({
          testName: report.testName,
          parameter: item.parameter,
          value: item.value,
          unit: item.unit,
          referenceRange: item.referenceRange,
          remarks: item.remarks,
        })),

        overallRemarks: remarks,
      };

      await createReport(reportData);
      toast.success("Report created successfully");

      navigate("/lab/processing");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save report");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-500">Loading sample data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Laboratory Report
          </h1>

          <p className="text-gray-500 mt-1">
            Enter patient laboratory test results and generate the final report.
          </p>
        </div>

        {/* Patient Information */}

        <ReportPatientCard report={report} />

        {/* Test Results */}

        <ReportResultsTable
          parameters={parameters}
          setParameters={setParameters}
        />

        {/* Remarks */}

        <ReportRemarks remarks={remarks} setRemarks={setRemarks} />

        {/* Actions */}

        <ReportActions
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LabCreateReport;
