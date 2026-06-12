import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const DoctorAbout = ({ doctor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      {/* About */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <InfoOutlinedIcon fontSize="small" />
          About Doctor
        </h2>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {doctor?.about ||
            "Dr. is a highly experienced medical professional dedicated to providing quality healthcare services with a patient-first approach. Focused on accurate diagnosis, modern treatment methods, and compassionate care."}
        </p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <WorkOutlineOutlinedIcon fontSize="small" />
          Experience
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          {doctor?.experience ||
            "10+ years of clinical experience in hospital and private practice settings."}
        </p>
      </div>

      {/* Education */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <SchoolOutlinedIcon fontSize="small" />
          Education
        </h2>

        <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc ml-5">
          {(
            doctor?.education || [
              "MBBS - University of Health Sciences",
              "FCPS - Specialization",
              "Certified Medical Training Program",
            ]
          ).map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </div>

      {/* Languages */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <LanguageOutlinedIcon fontSize="small" />
          Languages
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {(doctor?.user?.languages || []).map((lang) => (
            <span key={lang._id}>{lang.language}</span>
          ))}
        </div>
      </div>

      {/* Hospital */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <LocalHospitalOutlinedIcon fontSize="small" />
          Affiliated Hospital
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          {doctor?.hospital || "City Medical Complex Hospital"}
        </p>
      </div>
    </div>
  );
};

export default DoctorAbout;
