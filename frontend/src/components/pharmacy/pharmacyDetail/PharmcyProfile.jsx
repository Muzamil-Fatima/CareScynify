import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Building2,
  User,
} from "lucide-react";

const PharmacyProfile = ({ pharmacy }) => {
  if (!pharmacy) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="flex flex-col items-center gap-6 border-b border-gray-200 pb-6 md:flex-row">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Logo */}

          {pharmacy.logo ? (
            <img
              src={pharmacy.logo}
              alt={pharmacy.pharmacyName}
              className="h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
              <Building2 size={48} className="text-purple-600" />
            </div>
          )}

          {/* Info */}

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">
              {pharmacy.pharmacyName}
            </h1>

            <p className="mt-1 text-gray-600">
              {pharmacy.pharmacyType || "Retail Pharmacy"}
            </p>

            {/* Services */}

            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {pharmacy.homeDelivery && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  🚚 Home Delivery
                </span>
              )}

              {pharmacy.acceptPrescription && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  📋 Prescription Accepted
                </span>
              )}

              {pharmacy.onlineConsultationSupport && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  💻 Online Consultation
                </span>
              )}

              {pharmacy.cashOnDelivery && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  💵 Cash on Delivery
                </span>
              )}

              {pharmacy.emergencyService && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  🚨 Emergency Service
                </span>
              )}
            </div>

            {/* Status */}

            <div className="mt-3">
              {pharmacy.isOpen ? (
                <span className="font-medium text-green-600">Open Now</span>
              ) : (
                <span className="font-medium text-red-500">Closed</span>
              )}
            </div>

            {/* Buttons */}

            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <button className="rounded-lg bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700">
                View Medicines
              </button>

              <button className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100">
                Contact Pharmacy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        {/* About */}

        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            About Pharmacy
          </h2>

          <p className="leading-7 text-gray-600">
            {pharmacy.description || "No description available."}
          </p>
        </div>

        {/* Contact */}

        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Contact Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-purple-600" size={20} />
              <span>{pharmacy.ownerName || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-purple-600" size={20} />
              <span>{pharmacy.alternatePhone || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-purple-600" size={20} />
              <span>{pharmacy.user?.email || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="text-purple-600" size={20} />
              <span>{pharmacy.website || "Not Available"}</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-purple-600" size={20} />

              <span>
                {[
                  pharmacy.address,
                  pharmacy.city,
                  pharmacy.province,
                  pharmacy.country,
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
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Clock className="text-purple-600" size={20} />
          Operating Hours
        </h2>

        {pharmacy.operatingHours?.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pharmacy.operatingHours.map((day) => (
              <div
                key={day.day}
                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
              >
                <span className="font-medium">{day.day}</span>

                {day.closed ? (
                  <span className="font-medium text-red-500">Closed</span>
                ) : (
                  <span className="text-gray-600">
                    {day.open} - {day.close}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Operating hours not available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PharmacyProfile;