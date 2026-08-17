import React from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const DoctorExperience = ({ doctor }) => {
  const experienceList = doctor?.experienceDetails || [];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">

      <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800 mb-5">
        <WorkOutlineOutlinedIcon fontSize="small" />
        Experience
      </h2>

      <div className="space-y-5">

        {experienceList.length > 0 ? (
          experienceList.map((exp, index) => (
            <div
              key={index}
              className="border-l-2 border-purple-200 pl-4 relative"
            >

              <span className="absolute -left-[7px] top-1 w-3 h-3 bg-purple-600 rounded-full"></span>

              <h3 className="text-sm sm:text-md font-semibold text-gray-800">
                {exp.role}
              </h3>

              <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <LocalHospitalOutlinedIcon fontSize="small" />
                {exp.hospital}
              </p>

              <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <CalendarMonthOutlinedIcon fontSize="small" />
                {exp.duration}
              </p>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed wrap-break-word">
                {exp.description}
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No experience added yet.
          </p>
        )}

      </div>
    </div>
  );
};

export default DoctorExperience;