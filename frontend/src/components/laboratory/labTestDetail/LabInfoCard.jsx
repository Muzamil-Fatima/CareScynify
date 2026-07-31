import React from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Home,
  FileText,
  Siren,
} from "lucide-react";

const LabInfoCard = ({ laboratory }) => {
  console.log("Laboratory Data:", laboratory);
  if (!laboratory) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-5">
        {/* Logo */}
        {laboratory.user?.avatar?.url ? (
          <img
            src={laboratory.user.avatar.url}
            alt={laboratory.labName}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <Building2 size={38} className="text-purple-600" />
          </div>
        )}

        {/* Lab Name */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {laboratory.labName}
          </h2>

          <p className="text-gray-600">
            {laboratory.labType || "Diagnostic Laboratory"}
          </p>

          <span
            className={`inline-block mt-2 text-sm font-medium ${
              laboratory.isOpen ? "text-green-600" : "text-red-500"
            }`}
          >
            {laboratory.isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-purple-600 mt-1" size={20} />

          <span className="text-gray-600">
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

        <div className="flex items-center gap-3">
          <Phone className="text-purple-600" size={20} />

          <span className="text-gray-600">
            {laboratory.user?.phone ||
              laboratory.supportPhone ||
              laboratory.alternatePhone ||
              "Phone not available"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-purple-600" size={20} />

          <span className="text-gray-600">
            {laboratory.user?.email || "Email not available"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="text-purple-600" size={20} />

          <span className="text-gray-600">
            {laboratory.website || "Website not available"}
          </span>
        </div>
      </div>

      {/* Services */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Available Services</h3>

        <div className="flex flex-wrap gap-2">
          {laboratory.homeSampleCollection && (
            <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              <Home size={15} />
              Home Collection
            </span>
          )}

          {laboratory.onlineReports && (
            <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              <FileText size={15} />
              Online Reports
            </span>
          )}

          {laboratory.emergencyTesting && (
            <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              <Siren size={15} />
              Emergency Testing
            </span>
          )}

          {!laboratory.homeSampleCollection &&
            !laboratory.onlineReports &&
            !laboratory.emergencyTesting && (
              <span className="text-gray-500 text-sm">
                No additional services available
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default LabInfoCard;
