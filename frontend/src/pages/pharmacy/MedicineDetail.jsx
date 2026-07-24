import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMedicineDetails } from "../../hooks/pharmacy/useMedicineDetails";
import { useCart } from "../../hooks/pharmacy/useCart";
import MedicineGallery from "../../Components/pharmacy/medicines/medicineDetails/MedicineGallery";
import MedicineInfo from "../../Components/pharmacy/medicines/medicineDetails/MedicineInfo";
import QuantitySelector from "../../Components/pharmacy/medicines/medicineDetails/QuantitySelector";
import AddToCart from "../../Components/pharmacy/medicines/medicineDetails/AddToCart";
import RelatedMedicines from "../../Components/pharmacy/medicines/medicineDetails/RelatedMedicines";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
const MedicineDetails = () => {
  const { id } = useParams();
  const { addMedicineToCart } = useCart();
  const { medicine, loading, error } = useMedicineDetails(id);

  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  // Empty for now until related medicine API is available
  const [relatedMedicines] = useState([]);

  useEffect(() => {
    setQuantity(1);
  }, [medicine?._id]);

  const increaseQuantity = () => {
    if (quantity < medicine.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      const data = await addMedicineToCart(medicine._id, quantity);

      toast.success(data.message);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add medicine to cart.",
      );
    } finally {
      setCartLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="animate-pulse">
          <div className="h-8 w-52 rounded bg-gray-200"></div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-gray-200"></div>

            <div className="space-y-5">
              <div className="h-10 rounded bg-gray-200"></div>
              <div className="h-8 w-40 rounded bg-gray-200"></div>
              <div className="h-60 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold">Medicine Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Main Section */}
        <div className="grid gap-10 lg:grid-cols-2">
          <MedicineGallery
            key={medicine._id}
            images={medicine.images}
            medicineName={medicine.name}
          />

          <div className="space-y-6">
            <MedicineInfo medicine={medicine} />
            <div className="flex flex-row gap-6 ml-6">
              <QuantitySelector
                quantity={quantity}
                stock={medicine.stock}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />

              <AddToCart
                stock={medicine.stock}
                loading={cartLoading}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>

        {/* Description */}

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">Description</h2>

          <p className="leading-8 text-gray-600">
            {medicine.description || "No description available."}
          </p>
        </section>

        {/* Related Medicines */}

        <div className="mt-10">
          <RelatedMedicines
            medicines={relatedMedicines}
            loading={false}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
