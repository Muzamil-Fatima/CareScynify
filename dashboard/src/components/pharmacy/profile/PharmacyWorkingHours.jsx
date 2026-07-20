import React, { useEffect } from "react";
import { usePharmacy } from "../../../context/pharmacy/PharmacyContext";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PharmacyWorkingHours = () => {
  const { profile, setProfile, setIsDirty } = usePharmacy();

  // Initialize working hours if empty
  // useEffect(() => {
  //   if (
  //     !profile?.pharmacy?.operatingHours ||
  //     profile.pharmacy.operatingHours.length === 0
  //   ) {
  //     const defaultHours = DAYS.map((day) => ({
  //       day,
  //       open: "09:00",
  //       close: "21:00",
  //       closed: false,
  //     }));

  //     setProfile((prev) => ({
  //       ...prev,
  //       pharmacy: {
  //         ...prev.pharmacy,
  //         operatingHours: defaultHours,
  //       },
  //     }));
  //   }
  // }, []);

  const hours = profile?.pharmacy?.operatingHours || [];

  const updateHour = (index, field, value) => {
    const updated = [...hours];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setProfile((prev) => ({
      ...prev,
      pharmacy: {
        ...prev.pharmacy,
        operatingHours: updated,
      },
    }));

    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Working Hours
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Configure your pharmacy's weekly operating schedule.
        </p>
      </div>

      <div className="space-y-4">
        {hours.map((item, index) => (
          <div
            key={item.day}
            className="border border-gray-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            {/* Day */}
            <div className="w-full lg:w-40">
              <h3 className="font-semibold text-gray-800">{item.day}</h3>
            </div>

            {/* Time Inputs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
              <div className="w-full">
                <label className="text-xs text-gray-500 block mb-1">
                  Opening Time
                </label>

                <input
                  type="time"
                  disabled={item.closed}
                  value={item.open}
                  onChange={(e) =>
                    updateHour(index, "open", e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                />
              </div>

              <div className="w-full">
                <label className="text-xs text-gray-500 block mb-1">
                  Closing Time
                </label>

                <input
                  type="time"
                  disabled={item.closed}
                  value={item.close}
                  onChange={(e) =>
                    updateHour(index, "close", e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Closed Switch */}
            <div className="flex items-center justify-between lg:justify-end gap-4">
              <span className="text-sm font-medium text-gray-700">
                Closed
              </span>

              <button
                onClick={() =>
                  updateHour(index, "closed", !item.closed)
                }
                className={`relative w-14 h-7 rounded-full transition ${
                  item.closed ? "bg-red-500" : "bg-purple-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                    item.closed ? "left-1" : "left-8"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 rounded-xl bg-purple-50 border border-purple-100 p-4">
        <p className="text-sm text-purple-700">
          💡 These working hours will be shown to customers when they
          search for your pharmacy.
        </p>
      </div>
    </div>
  );
};

export default PharmacyWorkingHours;