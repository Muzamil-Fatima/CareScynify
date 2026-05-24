import React, { useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ContactVerifyTab from "./ContactVerifyTab";

const VerificationTab = () => {
  const [documents, setDocuments] = useState({ front: null, back: null });

  const handleFileChange = (side, file) => {
    if (file) {
      setDocuments((prev) => ({ ...prev, [side]: file }));
    }
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Identity Verification</h3>
          <p className="text-xs text-slate-400 mt-0.5">Submit legal CNIC/ID document captures to verify doctor credential compliance parameters.</p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> Under Review
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-purple-100 hover:border-purple-300 rounded-2xl p-6 transition flex flex-col items-center justify-center text-center bg-slate-50/30">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
            <CloudUploadOutlinedIcon />
          </div>
          <p className="text-sm font-semibold text-slate-800">Front Side Upload</p>
          <p className="text-xs text-slate-400 mt-1 mb-4 truncate max-w-xs">
            {documents.front ? `Selected: ${documents.front.name}` : "Supported formats: PNG, JPG (Max 5MB)"}
          </p>
          <label className={`px-4 py-1.5 border font-medium text-xs rounded-xl cursor-pointer transition shadow-xs block ${
            documents.front ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/60" : "bg-white border-purple-100 hover:bg-purple-50/40 text-purple-700"
          }`}>
            {documents.front ? "Change Front File" : "Select Document File"}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange("front", e.target.files[0])} />
          </label>
        </div>

        <div className="border-2 border-dashed border-purple-100 hover:border-purple-300 rounded-2xl p-6 transition flex flex-col items-center justify-center text-center bg-slate-50/30">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
            <CloudUploadOutlinedIcon />
          </div>
          <p className="text-sm font-semibold text-slate-800">Back Side Upload</p>
          <p className="text-xs text-slate-400 mt-1 mb-4 truncate max-w-xs">
            {documents.back ? `Selected: ${documents.back.name}` : "Supported formats: PNG, JPG (Max 5MB)"}
          </p>
          <label className={`px-4 py-1.5 border font-medium text-xs rounded-xl cursor-pointer transition shadow-xs block ${
            documents.back ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/60" : "bg-white border-purple-100 hover:bg-purple-50/40 text-purple-700"
          }`}>
            {documents.back ? "Change Back File" : "Select Document File"}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleFileChange("back", e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="bg-purple-50/30 border border-purple-100 rounded-2xl p-4 flex gap-3 items-start">
        <CheckCircleOutlinedIcon className="text-purple-600 mt-0.5" fontSize="small" />
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Verification Standards Notice</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Ensure text overlays and identification pictures are clear. Blur or glare may lead to system non-compliance rejections.
          </p>
        </div>
      </div>
      <ContactVerifyTab />
    </div>
  );
};

export default VerificationTab;