import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useNavigate } from "react-router-dom";
const ReportCard = ({ report, getStatusStyle, handleDownload }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border rounded-2xl p-5">
      <div className="flex gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-xl">
          <DescriptionOutlinedIcon />
        </div>
        <h2
          onClick={() =>
            navigate("/report-viewer", {
              state: {
                fileUrl: report.fileUrl,
                mimeType: report.mimeType,
                title: report.title,
                explanation: report.explanation,
              },
            })
          }
          className="font-semibold text-purple-600 cursor-pointer hover:underline"
        >
          {report.title}
        </h2>
      </div>

      <div className="space-y-1 text-sm">
        <p>
          <b>Date:</b> {new Date(report.createdAt).toLocaleDateString()}
        </p>

        <p>
          <b>Category:</b> {report.category}
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
            report.status,
          )}`}
        >
          {report.status}
        </span>

        <button
          onClick={() => handleDownload(report.fileUrl, report.title)}
          className="text-purple-600 flex gap-1"
        >
          <DownloadOutlinedIcon />
          Download
        </button>
      </div>
    </div>
  );
};

export default ReportCard;