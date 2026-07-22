import React, { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "../../../components/PhoneInput";
import useDoctorPatient from "../../../hooks/useDoctorPatient";
const AddPatient = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    notes: "",
  });
  const { addPatient, loading } = useDoctorPatient();
  const handleSubmit = async () => {
    try {
      await addPatient(formData);

      toast.success("Patient added successfully.");

      setFormData({
        name: "",
        phone: "",
        gender: "",
        dob: "",
        address: "",
        notes: "",
      });

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-center justify-center py-6">
        <div className="w-full max-w-4xl rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Add Patient
            </h2>

            <button
              onClick={onClose}
              className="cursor-pointer text-2xl text-slate-500 transition hover:text-slate-800"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Patient Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Patient Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter patient name"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className=" block text-sm font-medium text-slate-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div
                className="
    [&_.react-tel-input]:w-full
    [&_.react-tel-input_.form-control]:h-12!
    [&_.react-tel-input_.form-control]:w-full!
    [&_.react-tel-input_.flag-dropdown]:h-12!
  "
              >
                <PhoneInput
                  label=""
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Gender
              </label>

           <select
  value={formData.gender}
  onChange={(e) =>
    setFormData({
      ...formData,
      gender: e.target.value,
    })
  }
  className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-purple-400"
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date of Birth
              </label>

           <input
  type="date"
  value={formData.dob}
  onChange={(e) =>
    setFormData({
      ...formData,
      dob: e.target.value,
    })
  }
  className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-purple-400"
/>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>
<input
  type="text"
  value={formData.address}
  onChange={(e) =>
    setFormData({
      ...formData,
      address: e.target.value,
    })
  }
  placeholder="Enter address"
  className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-purple-400"
/>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
              </label>

              <textarea
                rows={4}
                placeholder="Reason for visit or any important notes..."
                className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 transition hover:bg-gray-100 focus:ring-2 focus:ring-purple-400"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Patient"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
