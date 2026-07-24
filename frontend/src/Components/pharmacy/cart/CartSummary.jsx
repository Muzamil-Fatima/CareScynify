import React from "react";

const CartSummary = ({ subtotal = 0, deliveryFee = 0, discount = 0 }) => {
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="border-t bg-white p-5">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>

          <span className="font-medium">
            {deliveryFee === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `Rs. ${deliveryFee}`
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>- Rs. {discount}</span>
          </div>
        )}

        <div className="my-2 border-t" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span className="text-purple-700">Rs. {total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
