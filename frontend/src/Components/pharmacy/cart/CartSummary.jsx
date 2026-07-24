import React from "react";

const CartSummary = ({ subtotal = 0, deliveryFee = 0, discount = 0 }) => {
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="rounded-3xl bg-linear-to-br from-gray-50 via-white to-purple-50/30 p-6 shadow-lg shadow-gray-200/40">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          Order Summary
        </h3>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          Summary
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>

          <span className="font-semibold text-gray-900">
            Rs. {subtotal}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Delivery Fee</span>

          {deliveryFee === 0 ? (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700">
              Free
            </span>
          ) : (
            <span className="font-semibold text-gray-900">
              Rs. {deliveryFee}
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Discount
            </span>

            <span className="font-semibold text-green-600">
              - Rs. {discount}
            </span>
          </div>
        )}

        <div className="my-2 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
          <span className="text-lg font-bold text-gray-900">
            Total
          </span>

          <span className="text-2xl font-extrabold text-purple-700">
            Rs. {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;