import React from "react";
import PhoneInput from "../../common/PhoneInput";
import { usePharmacy } from "../../../context/pharmacy/PharmacyContext";

const PharmacyContactInfo = () => {
  const { profile, setProfile, setIsDirty } = usePharmacy();

  const user = profile?.user || {};
  const pharmacy = profile?.pharmacy || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition";

  const labelClass = "block mb-2 text-sm font-medium text-gray-700";

  const handleChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Contact Information
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your pharmacy's contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Phone */}
        <div>
          <label className={labelClass}>Primary Phone</label>

          <PhoneInput
            value={user.phone || ""}
            onChange={(value) => handleChange("user", "phone", value)}
          />
        </div>

        {/* Alternate Phone */}
        <div>
          <label className={labelClass}>Alternate Phone</label>

          <PhoneInput
            value={pharmacy.alternatePhone || ""}
            onChange={(value) =>
              handleChange("pharmacy", "alternatePhone", value)
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address</label>

          <input
            type="email"
            readOnly
            value={user.email || ""}
            className={`${inputClass} bg-gray-50 cursor-not-allowed`}
          />
        </div>

        {/* Website */}
        <div>
          <label className={labelClass}>Website</label>

          <input
            type="url"
            className={inputClass}
            placeholder="https://yourpharmacy.com"
            value={pharmacy.website || ""}
            onChange={(e) =>
              handleChange("pharmacy", "website", e.target.value)
            }
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className={labelClass}>WhatsApp Number</label>

          <PhoneInput
            value={pharmacy.whatsapp || ""}
            onChange={(value) =>
              handleChange("pharmacy", "whatsapp", value)
            }
          />
        </div>

        {/* Customer Support */}
        <div>
          <label className={labelClass}>Customer Support Number</label>

          <PhoneInput
            value={pharmacy.supportPhone || ""}
            onChange={(value) =>
              handleChange("pharmacy", "supportPhone", value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyContactInfo;