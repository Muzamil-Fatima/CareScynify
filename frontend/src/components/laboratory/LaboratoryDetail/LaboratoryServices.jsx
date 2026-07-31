import React from "react";
import {
  Home,
  FileText,
  Siren,
  CalendarCheck,
  FileCheck,
} from "lucide-react";

const LaboratoryServices = ({ laboratory }) => {
  if (!laboratory) return null;

  const services = [
    {
      title: "Home Sample Collection",
      available: laboratory.homeSampleCollection,
      icon: <Home size={22} />,
    },
    {
      title: "Online Reports",
      available: laboratory.onlineReports,
      icon: <FileText size={22} />,
    },
    {
      title: "Emergency Testing",
      available: laboratory.emergencyTesting,
      icon: <Siren size={22} />,
    },
    {
      title: "Online Booking",
      available: laboratory.onlineBooking,
      icon: <CalendarCheck size={22} />,
    },
    {
      title: "Digital Reports",
      available: laboratory.digitalReports,
      icon: <FileCheck size={22} />,
    },
  ];

  const hasServices = services.some((service) => service.available);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Laboratory Services
        </h2>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          {services.filter((service) => service.available).length} Available
        </span>
      </div>

      {!hasServices ? (
        <div className="py-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-3xl">
            🧪
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Additional Services
          </h3>

          <p className="mt-2 text-gray-500">
            This laboratory has not enabled any additional services yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services
            .filter((service) => service.available)
            .map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-purple-200 bg-purple-50 p-5 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    {service.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {service.title}
                    </h3>

                    <span className="inline-flex mt-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LaboratoryServices;