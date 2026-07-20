import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServices";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
const MedicineDetailsModal = ({ medicine, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);
  if (!medicine) return null;

  const images = medicine.images || [];

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-6">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between  px-8 py-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Medicine Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        {/* Inventory */}

        <div className=" bg-slate-50 px-8 py-6">
          <h3 className="mb-5 text-lg font-semibold text-slate-800">
            Inventory Information
          </h3>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard
              title="Stock"
              value={medicine.stock}
              color="text-green-600"
            />

            <StatCard
              title="Price"
              value={`Rs ${medicine.unitPrice}`}
              color="text-violet-600"
            />

            <StatCard
              title="Status"
              value={medicine.isActive ? "Active" : "Inactive"}
              color={medicine.isActive ? "text-green-600" : "text-red-600"}
            />

            <StatCard
              title="Expiry"
              value={new Date(medicine.expiryDate).toLocaleDateString()}
              color="text-orange-600"
            />
          </div>
        </div>

        {/* Description */}

        <div className="px-8 py-6">
          <h3 className="mb-3 text-lg font-semibold text-slate-800">
            Description
          </h3>

          <p className="rounded-2xl bg-slate-50 p-5 leading-7 text-slate-600 shadow-sm">
            {medicine.description || "No description available."}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-6 lg:col-span-2 m-6">
          <div>
            <h3 className="text-3xl font-bold text-slate-800">
              {medicine.name}
            </h3>

            <p className="mt-1 text-slate-500">
              {medicine.genericName || "Generic name not available"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={<CategoryRoundedIcon />}
              title="Category"
              value={medicine.category}
            />
            <InfoCard
              icon={<MedicalServicesRoundedIcon />}
              title="Strength"
              value={`${medicine.strength} mg`}
            />
            <InfoCard
              icon={<LocalOfferRoundedIcon />}
              title="Brand"
              value={medicine.brand || "-"}
            />
            <InfoCard
              icon={<Inventory2RoundedIcon />}
              title="Manufacturer"
              value={medicine.manufacturer}
            />
          </div>
        </div>

        <div className="px-8 pb-8 mt-8">
          <div className="mx-auto w-full max-w-[80%] space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-md">
              <img
                src={images[currentImage]?.url}
                alt={medicine.name}
                className="h-72 w-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:bg-white"
                  >
                    <ChevronLeftRoundedIcon />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:bg-white"
                  >
                    <ChevronRightRoundedIcon />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, index) => (
                  <img
                    key={img.public_id || index}
                    src={img.url}
                    alt=""
                    onClick={() => setCurrentImage(index)}
                    className={`h-20 w-20 cursor-pointer rounded-xl object-cover border-2 transition ${
                      currentImage === index
                        ? "border-violet-600"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Footer */}
        </div>
        <div className="flex justify-end  px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsModal;

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-2 flex items-center gap-2 text-violet-600">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <p className="font-semibold text-slate-700">{value || "-"}</p>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h4 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h4>
    </div>
  );
}
