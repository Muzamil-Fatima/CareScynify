import React from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const DoctorExperience = ({ doctor }) => {
  const experienceList = doctor?.experienceList || [
    {
      role: "Senior Cardiologist",
      hospital: "City Medical Complex Hospital",
      duration: "2020 - Present",
      description:
        "Leading cardiology department with focus on heart disease diagnosis and treatment.",
    },
    {
      role: "Cardiology Specialist",
      hospital: "General Hospital Lahore",
      duration: "2016 - 2020",
      description:
        "Worked in emergency and outpatient cardiology cases.",
    },
    {
      role: "Junior Doctor",
      hospital: "Allied Medical Hospital",
      duration: "2013 - 2016",
      description:
        "Initial training and patient care in general medicine.",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-5">
        <WorkOutlineOutlinedIcon fontSize="small" />
        Experience
      </h2>

      {/* Timeline */}
      <div className="space-y-5">
        {experienceList.map((exp, index) => (
          <div key={index} className="border-l-2 border-purple-200 pl-4 relative">
            
            {/* Dot */}
            <span className="absolute -left-[7px] top-1 w-3 h-3 bg-purple-600 rounded-full"></span>

            {/* Role */}
            <h3 className="text-md font-semibold text-gray-800">
              {exp.role}
            </h3>

            {/* Hospital */}
            <p className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <LocalHospitalOutlinedIcon fontSize="small" />
              {exp.hospital}
            </p>

            {/* Duration */}
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <CalendarMonthOutlinedIcon fontSize="small" />
              {exp.duration}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorExperience;