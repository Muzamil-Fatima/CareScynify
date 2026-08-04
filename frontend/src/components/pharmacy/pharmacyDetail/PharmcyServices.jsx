import React from "react";
import {
  Home,
  Truck,
  Video,
  FileCheck,
  Siren,
} from "lucide-react";

const PharmacyServices = ({ pharmacy }) => {
  if (!pharmacy) return null;

  const services = [
    {
      title: "Home Delivery",
      available: pharmacy.homeDelivery,
      icon: <Truck size={22} />,
    },
    {
      title: "Prescription Accepted",
      available: pharmacy.acceptPrescription,
      icon: <FileCheck size={22} />,
    },
    {
      title: "Online Consultation",
      available: pharmacy.onlineConsultationSupport,
      icon: <Video size={22} />,
    },
    {
      title: "Emergency Service",
      available: pharmacy.emergencyService,
      icon: <Siren size={22} />,
    },
    {
      title: "Cash on Delivery",
      available: pharmacy.cashOnDelivery,
      icon: <Home size={22} />,
    },
  ];

  const hasServices = services.some((service) => service.available);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Pharmacy Services
        </h2>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
          {services.filter((service) => service.available).length} Available
        </span>
      </div>

      {!hasServices ? (
        <div className="py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
            💊
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Additional Services
          </h3>

          <p className="mt-2 text-gray-500">
            This pharmacy has not enabled any additional services yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services
            .filter((service) => service.available)
            .map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-purple-200 bg-purple-50 p-5 transition hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                    {service.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {service.title}
                    </h3>

                    <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
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

export default PharmacyServices;