
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import AIExplanation from "./AIExplanation";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReportViewer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [numPages, setNumPages] = useState(null);

  if (!state) {
    return <div>No report found</div>;
  }

  const { fileUrl, mimeType, title, explanation } = state;

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowBackIcon />
        </button>

        <h1 className="text-2xl font-semibold">
          {title}
        </h1>
      </div>

      {mimeType === "application/pdf" ? (
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => console.log("PDF Error:", error)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={index + 1}
              pageNumber={index + 1}
              width={800}
            />
          ))}
        </Document>
      ) : (
        <img
          src={fileUrl}
          alt={title}
          className="max-w-full"
        />
      )}

      <div className="mt-8">
        <AIExplanation explanation={explanation} />
      </div>
    </div>
  );
};

export default ReportViewer;