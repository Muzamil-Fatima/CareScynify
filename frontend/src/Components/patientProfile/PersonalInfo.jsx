import React, { useMemo } from "react";
import PhoneInput from "../PhoneInput";
import { usePatient } from "../../context/patients/PatientContext";

const PersonalInfo = () => {
  const { profile, setProfile, setIsDirty } = usePatient();

  const user = profile?.user || {};
  const patient = profile?.patient || {};

  const inputClass =
    "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm bg-white";

  const labelClass = "mb-2 text-sm font-medium text-gray-600";

  // AGE CALCULATION (DAYS + YEARS)
  const calculateAge = (dob) => {
    if (!dob) return "";

    const birth = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // if less than 1 year show days
    if (years < 1) {
      return `${months} month(s) ${days} day(s)`;
    }

    return `${years} year(s)`;
  };

  const age = useMemo(() => {
    return calculateAge(user?.dob);
  }, [user?.dob]);

  const handlePatientChange = (field, value, section = "patient") => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setIsDirty(true);
  };
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAME */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            className={inputClass}
            value={user?.name || ""}
            onChange={(e) =>
              handlePatientChange("name", e.target.value, "user")
            }
          />
        </div>

        {/* DOB */}
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            className={inputClass}
            value={user?.dob ? user.dob.split("T")[0] : ""}
            onChange={(e) => handlePatientChange("dob", e.target.value, "user")}
          />
        </div>

        {/* AGE (AUTO) */}
        <div>
          <label className={labelClass}>Age</label>
          <input
            type="text"
            className={inputClass}
            value={age || ""}
            readOnly
          />
        </div>

        {/* CNIC */}
        <div>
          <label className={labelClass}>CNIC</label>
          <input
            type="text"
            className={inputClass}
            value={user?.cnic || ""}
            onChange={(e) =>
              handlePatientChange("cnic", e.target.value, "user")
            }
          />
        </div>

        {/* PHONE */}
        <div>
          <label className={labelClass}>Phone</label>
          <PhoneInput
            value={user?.phone || ""}
            onChange={(value) => handlePatientChange("phone", value, "user")}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            readOnly
            className={inputClass}
            value={user?.email || ""}
            onChange={(e) =>
              handlePatientChange("email", e.target.value, "user")
            }
          />
        </div>

        {/* GENDER */}
        <div>
          <label className={labelClass}>Gender</label>
          <select
            className={inputClass}
            value={patient?.gender || ""}
            onChange={(e) =>
              handlePatientChange("gender", e.target.value, "patient")
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* BLOOD GROUP (MAP) */}
        <div>
          <label className={labelClass}>Blood Group</label>
          <select
            className={inputClass}
            value={patient?.bloodGroup || ""}
            onChange={(e) =>
              handlePatientChange("bloodGroup", e.target.value, "patient")
            }
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            rows={3}
            className={inputClass}
            value={patient?.address || ""}
            onChange={(e) =>
              handlePatientChange("address", e.target.value, "patient")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
