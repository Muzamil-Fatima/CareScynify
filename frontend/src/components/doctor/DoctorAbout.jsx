import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const DoctorAbout = ({ doctor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-5">
      {/* About */}
      <div>
        <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
          <InfoOutlinedIcon fontSize="small" />
          About Doctor
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed wrap-break-word">
          {doctor?.about || "No information available"}
        </p>
      </div>

      {/* Education */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <SchoolOutlinedIcon fontSize="small" />
          Education
        </h2>

        <ul className="text-xs sm:text-sm text-gray-600 mt-2 space-y-1 list-disc ml-5 wrap-break-word">
          {doctor?.education?.length > 0 ? (
            doctor.education.map((edu) => (
              <li key={edu._id}>
                {edu.degree} - {edu.school}
              </li>
            ))
          ) : (
            <li>No education information available</li>
          )}
        </ul>
      </div>

      {/* Languages */}
      <div>
        <h2 className="flex items-center gap-2 text-lg text-gray-800 font-semibold">
          <LanguageOutlinedIcon fontSize="small" />
          Languages
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {doctor?.user?.languages?.length > 0 ? (
            doctor.user.languages.map((lang) => (
              <span
                key={lang._id}
                className="px-2.5 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
              >
                {lang.language}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No languages added</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAbout;
