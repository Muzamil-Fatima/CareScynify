import React from "react";
import {
  FlaskConical,
  BadgeDollarSign,
  Clock3,
  Activity,
  BadgeCheck,
} from "lucide-react";

const LabTestHeader = ({ labtest, onBook }) => {
  if (!labtest) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Test Icon */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center">
            <FlaskConical size={52} className="text-purple-600" />
          </div>
        </div>

        {/* Test Info */}
        <div className="flex-1">
          {/* Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-800">{labtest.name}</h1>

            {labtest.status === "Active" && (
              <BadgeCheck size={22} className="text-green-600" />
            )}
          </div>

          {/* Code */}
          <p className="text-gray-500 mt-1">Test Code: {labtest.code}</p>

          {/* Category */}
          <p className="text-purple-600 font-medium mt-2">{labtest.category}</p>

          {/* Information */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <BadgeDollarSign size={20} className="text-green-600" />

              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-semibold">Rs. {labtest.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={20} className="text-blue-600" />

              <div>
                <p className="text-xs text-gray-500">Turn Around</p>
                <p className="font-semibold">{labtest.turnAround}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity size={20} className="text-purple-600" />

              <div>
                <p className="text-xs text-gray-500">Status</p>

                <p
                  className={`font-semibold ${
                    labtest.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {labtest.status}
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <button
              onClick={() => onBook?.(labtest)}
              disabled={labtest.status !== "Active"}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                labtest.status === "Active"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Book Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestHeader;
