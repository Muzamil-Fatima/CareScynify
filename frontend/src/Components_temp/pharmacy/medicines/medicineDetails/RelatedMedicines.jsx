import React from "react";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import MedicineCard from "../MedicineCard";

const RelatedMedicines = ({
  medicines = [],
  loading = false,
  onAddToCart,
}) => {
  const relatedMedicines = Array.isArray(medicines) ? medicines : [];

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <LocalPharmacyOutlinedIcon />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Related Medicines
          </h2>
          <p className="text-sm text-gray-500">
            You may also like these medicines
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="aspect-square bg-gray-200" />

              <div className="space-y-3 p-4">
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-8 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && relatedMedicines.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <LocalPharmacyOutlinedIcon
            sx={{ fontSize: 60 }}
            className="text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Related Medicines Found
          </h3>

          <p className="mt-2 text-gray-500">
            There are currently no medicines available in this category.
          </p>
        </div>
      )}

      {/* Medicines */}
      {!loading && relatedMedicines.length > 0 && (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedMedicines.map((medicine) => (
            <MedicineCard
              key={medicine._id}
              medicine={medicine}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedMedicines;