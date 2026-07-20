import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useLaboratory } from "../../../context/laboratory/LaboratoryContext";

const categories = [
  "Pathology",
  "Radiology",
  "Cardiology",
  "Microbiology",
  "Hematology",
  "Biochemistry",
  "Immunology",
  "General",
];

const inputClass =
  "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 transition";

const LabServices = () => {
  const { profile, setProfile, setIsDirty } = useLaboratory();

  const services = profile?.laboratory?.services || [];

  const updateServices = (newServices) => {
    setProfile((prev) => ({
      ...prev,
      laboratory: {
        ...prev.laboratory,
        services: newServices,
      },
    }));

    setIsDirty(true);
  };

  const addService = () => {
    updateServices([
      ...services,
      {
        name: "",
        category: "",
        price: "",
        reportTime: "",
      },
    ]);
  };

  const updateService = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    updateServices(updated);
  };

  const removeService = (index) => {
    updateServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Laboratory Services
        </h2>

        <button
          onClick={addService}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
        >
          <AddRoundedIcon fontSize="small" />
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border-2 border-dashed rounded-xl">
          No services added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 bg-gray-50 relative"
            >
              <button
                onClick={() => removeService(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <DeleteRoundedIcon />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Service Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Service Name
                  </label>

                  <input
                    className={inputClass}
                    value={service.name}
                    placeholder="CBC"
                    onChange={(e) =>
                      updateService(index, "name", e.target.value)
                    }
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Category
                  </label>

                  <select
                    className={inputClass}
                    value={service.category}
                    onChange={(e) =>
                      updateService(index, "category", e.target.value)
                    }
                  >
                    <option value="">Select</option>

                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Price (PKR)
                  </label>

                  <input
                    type="number"
                    className={inputClass}
                    placeholder="1500"
                    value={service.price}
                    onChange={(e) =>
                      updateService(index, "price", e.target.value)
                    }
                  />
                </div>

                {/* Report Time */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Report Time
                  </label>

                  <input
                    className={inputClass}
                    placeholder="4 Hours"
                    value={service.reportTime}
                    onChange={(e) =>
                      updateService(index, "reportTime", e.target.value)
                    }
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabServices;