import { useState } from "react";

const UploadReportModal = ({ open, setOpen, handleUpload }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Lab");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Upload Report</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded mb-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="Lab">Lab</option>
          <option value="Radiology">Radiology</option>
          <option value="Doctor">Doctor</option>
          <option value="Vitals">Vitals</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Other">Other</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleUpload(file, category);
              setOpen(false);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadReportModal;
