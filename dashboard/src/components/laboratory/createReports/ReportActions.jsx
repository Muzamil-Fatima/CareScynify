import React from "react";
import { Save, X } from "lucide-react";

const ReportActions = ({
  onSave,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-purple-100 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row justify-end gap-3 p-6">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={18} />
          Cancel
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />

          {loading ? "Saving..." : "Save Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportActions;