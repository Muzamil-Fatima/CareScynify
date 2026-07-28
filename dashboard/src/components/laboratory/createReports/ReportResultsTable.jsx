import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ReportResultsTable = ({ parameters, setParameters }) => {
  const handleChange = (index, field, value) => {
    const updated = [...parameters];
    updated[index][field] = value;
    setParameters(updated);
  };

  const addParameter = () => {
    setParameters([
      ...parameters,
      {
        parameter: "",
        value: "",
        unit: "",
        referenceRange: "",
        remarks: "",
      },
    ]);
  };

  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl border border-purple-100 shadow-sm mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Test Parameters
        </h2>

        <button
          onClick={addParameter}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Parameter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Parameter</th>
              <th className="px-4 py-3 text-left font-semibold">Value</th>
              <th className="px-4 py-3 text-left font-semibold">Unit</th>
              <th className="px-4 py-3 text-left font-semibold">
                Reference Range
              </th>
              <th className="px-4 py-3 text-left font-semibold">Remarks</th>
              <th className="px-4 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {parameters.map((item, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                {/* Parameter */}
                <td className="p-3">
                  <input
                    type="text"
                    value={item.parameter}
                    onChange={(e) =>
                      handleChange(index, "parameter", e.target.value)
                    }
                    placeholder="Hemoglobin"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>

                {/* Value */}
                <td className="p-3">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                    placeholder="13.5"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>

                {/* Unit */}
                <td className="p-3">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                    placeholder="g/dL"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>

                {/* Reference Range */}
                <td className="p-3">
                  <input
                    type="text"
                    value={item.referenceRange}
                    onChange={(e) =>
                      handleChange(index, "referenceRange", e.target.value)
                    }
                    placeholder="13 - 17"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>

                {/* Remarks */}
                <td className="p-3">
                  <input
                    type="text"
                    value={item.remarks}
                    onChange={(e) =>
                      handleChange(index, "remarks", e.target.value)
                    }
                    placeholder="Normal"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>

                {/* Delete */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeParameter(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {parameters.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No parameters added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportResultsTable;