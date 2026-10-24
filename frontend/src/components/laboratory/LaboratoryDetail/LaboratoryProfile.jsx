import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  BadgeCheck,
  Building2,
  User,
} from "lucide-react";

const LaboratoryProfile = ({ laboratory }) => {
  if (!laboratory) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-200 pb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          {laboratory.user?.avatar?.url ? (
            <img
              src={laboratory.user.avatar.url}
              alt={laboratory.labName}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center">
              <Building2 size={48} />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">
                {laboratory.labName}
              </h1>

              {/* {laboratory.verificationStatus === "verified" && (
                <span className="flex items-center gap-1 bg-green-500 px-3 py-1 rounded-full text-sm font-medium">
                  <BadgeCheck size={16} />
                  Verified
                </span>
              )} */}
            </div>

            <p className="text-gray-600 mt-1">
              {laboratory.labType || "Diagnostic Laboratory"}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              {laboratory.homeSampleCollection && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  🏠 Home Collection
                </span>
              )}

              {laboratory.onlineReports && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  📄 Online Reports
                </span>
              )}

              {laboratory.emergencyTesting && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  🚨 Emergency Testing
                </span>
              )}
            </div>
            <div className="mt-3">
              {laboratory.isOpen ? (
                <span className="text-green-600 font-medium">Open Now</span>
              ) : (
                <span className="text-red-500 font-medium">Closed</span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
              <button
                onClick={() => {
                  document.getElementById("lab-tests")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
              >
                View Tests
              </button>

              <button
                onClick={() => {
                  document.getElementById("lab-contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-lg transition"
              >
                Contact Laboratory
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            About Laboratory
          </h2>

          <p className="text-gray-600 leading-7">
            {laboratory.description || "No description available."}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2
            id="lab-contact"
            className="text-lg font-semibold text-gray-800 mb-3"
          >
            Contact Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-purple-600" size={20} />
              <span>{laboratory.user?.name || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-purple-600" size={20} />
              <span>
                +{" "}
                {laboratory.user?.phone ||
                  laboratory.supportPhone ||
                  laboratory.alternatePhone ||
                  "Not Available"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-purple-600" size={20} />
              <span>{laboratory.user?.email || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="text-purple-600" size={20} />
              <span>{laboratory.website || "Not Available"}</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-purple-600 mt-1" size={20} />

              <span>
                {[
                  laboratory.address,
                  laboratory.city,
                  laboratory.province,
                  laboratory.country,
                ]
                  .filter(Boolean)
                  .join(", ") || "Address not available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="border-t border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Clock className="text-purple-600" size={20} />
          Operating Hours
        </h2>

        {laboratory.operatingHours?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {laboratory.operatingHours.map((day) => (
              <div
                key={day.day}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
              >
                <span className="font-medium">{day.day}</span>

                {day.closed ? (
                  <span className="text-red-500 font-medium">Closed</span>
                ) : (
                  <span className="text-gray-600">
                    {day.open} - {day.close}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Operating hours not available.</p>
        )}
      </div>
    </div>
  );
};

export default LaboratoryProfile;
