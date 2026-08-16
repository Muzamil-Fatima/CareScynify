import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import AIExplanation from "./AIExplanation";
import { getReportById } from "../../../../api/doctor/reportApi";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReportViewer = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchReport = async () => {
      try {
        const data = await getReportById(reportId);
        if (isMounted) setReport(data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        if (isMounted) setError("Failed to load report.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [reportId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !report) {
    return <div className="p-6">{error || "No report found"}</div>;
  }

  const { fileUrl, mimeType, title, explanation } = report;

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowBackIcon />
        </button>

        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {mimeType === "application/pdf" ? (
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.log("PDF Error:", err)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={index + 1} pageNumber={index + 1} width={800} />
          ))}
        </Document>
      ) : (
        <img src={fileUrl} alt={title} className="max-w-full" />
      )}

      <div className="mt-8">
        <AIExplanation explanation={explanation} />
      </div>
    </div>
  );
};

export default ReportViewer;
