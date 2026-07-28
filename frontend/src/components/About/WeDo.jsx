import React from "react";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionIcon from "@mui/icons-material/Description";

const WeDo = () => {
  const imp = [
    {
      title: "AI Healthcare Insights",
      description: "Smart recommendations and health analysis using AI systems.",
      icon: <PsychologyAltIcon fontSize="large" />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Appointments System",
      description: "Seamless doctor booking and patient management workflow.",
      icon: <EventAvailableIcon fontSize="large" />,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Digital Records",
      description: "Secure and centralized patient medical history storage.",
      icon: <DescriptionIcon fontSize="large" />,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-10">
        What CareScynify Offers
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {imp.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
          >
            {/* ICON BOX */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeDo;