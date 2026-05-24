import React, { useState } from "react";
import toast from "react-hot-toast";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const Credentials = () => {
  // Mock data for existing credentials
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "MBBS_Degree_Official.pdf",
      category: "Primary Degree",
      date: "12 Oct 2023",
      status: "Verified",
    },
    {
      id: 2,
      name: "Cardiology_Specialization_FCPS.pdf",
      category: "Specialization Certificate",
      date: "05 Jan 2024",
      status: "Verified",
    },
    {
      id: 3,
      name: "Medical_Ethics_Workshop.jpg",
      category: "Certification",
      date: "20 Feb 2024",
      status: "Pending",
    },
  ]);

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.error("Document removed from profile.");
  };

  const handleFileUpload = () => {
    toast.success("New credential uploaded for verification!");
  };

  return (
    <div className="space-y-8 w-full min-w-0">
      {/* 1. Header & Verification Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <VerifiedUserOutlinedIcon className="text-purple-600" />
            Medical Credentials & Awards
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your academic degrees, board certifications, and professional
            honors for public verification.
          </p>
        </div>

        {/* Overall Verification Badge */}
        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm shadow-sm">
            <VerifiedUserOutlinedIcon fontSize="small" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
              Profile Status
            </p>
            <p className="text-xs font-semibold text-emerald-600">
              85% Verified Practitioner
            </p>
          </div>
        </div>
      </div>

      {/* 2. Upload Section */}
      <div className="border-2 border-dashed border-purple-100 bg-purple-50/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-purple-300 transition-colors">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
          <CloudUploadOutlinedIcon fontSize="large" />
        </div>
        <h4 className="text-sm font-bold text-slate-800">
          Upload New Credential
        </h4>
        <p className="text-xs text-slate-400 mt-1 mb-6 max-w-xs">
          Upload medical degrees, fellowship certificates, or clinical awards
          (PDF, PNG or JPG).
        </p>
        <label className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer shadow-md shadow-purple-100 transition">
          Browse Files
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* 3. Document Library Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <WorkspacePremiumOutlinedIcon
            className="text-slate-400"
            fontSize="small"
          />
          Document Library
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* File Icon */}
                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0">
                  <InsertDriveFileOutlinedIcon />
                </div>

                {/* File Info */}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {doc.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Uploaded on {doc.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4 ml-4">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    doc.status === "Verified"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}
                >
                  {doc.status}
                </span>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-slate-300 hover:text-red-500 transition cursor-pointer"
                  title="Remove Document"
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Help Note */}
      <div className="bg-linear-to-r from-indigo-50/40 to-purple-50/30 border border-purple-100 rounded-2xl p-5 flex gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-xs shrink-0">
          <WorkspacePremiumOutlinedIcon fontSize="small" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Verification Standards
          </h5>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Our audit team manually verifies each document against medical board
            databases. Verification typically takes 2-4 business days.
            High-resolution scans ensure faster processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
