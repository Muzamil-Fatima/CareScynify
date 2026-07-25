import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderContext } from "../../context/pharmacy/OrderContext";

const OrderDetails = () => {
  const { orderId } = useParams();

  const { order, loading, fetchOrderById } = useOrderContext();

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100">
        <div className="rounded-2xl bg-white px-8 py-6 text-lg font-semibold shadow-lg">
          Loading...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100">
        <div className="rounded-2xl bg-white px-8 py-6 text-lg font-semibold shadow-lg">
          Order not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100 py-8 px-4">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-medium text-purple-700 shadow transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-600 hover:text-white hover:shadow-lg"
        >
          ← Back to Orders
        </Link>

        {/* Order Summary */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Order #{order.orderId}
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-medium text-gray-500"> Order Status</span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                {order.orderStatus}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-medium text-gray-500">Payment</span>
              <span className="font-semibold text-gray-800">
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-medium text-gray-500">Payment Status</span>
              <span className="font-semibold text-gray-800">
                {order.paymentStatus}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 text-xl font-bold">
              <span>Total</span>
              <span className="text-purple-700">Rs. {order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="mb-6 border-b border-gray-200 pb-3 text-2xl font-bold text-gray-800">
            Delivery Information
          </h2>

          <div className="space-y-3">
            <p className="rounded-xl bg-gray-50 p-4 text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {order.deliveryInfo.fullName}
            </p>

            <p className="rounded-xl bg-gray-50 p-4 text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {order.deliveryInfo.phone}
            </p>

            <p className="rounded-xl bg-gray-50 p-4 text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {order.deliveryInfo.address}
            </p>

            <p className="rounded-xl bg-gray-50 p-4 text-gray-700">
              <span className="font-semibold">City:</span>{" "}
              {order.deliveryInfo.city}
            </p>

            {order.deliveryInfo.notes && (
              <p className="rounded-xl bg-purple-50 p-4 text-purple-700">
                <span className="font-semibold">Notes:</span>{" "}
                {order.deliveryInfo.notes}
              </p>
            )}
          </div>
        </div>

        {/* Medicines */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="mb-6 border-b border-gray-200 pb-3 text-2xl font-bold text-gray-800">
            Medicines
          </h2>

          <div className="space-y-5">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:flex-row sm:items-center"
              >
                <img
                  src={item.medicineId.images?.[0]?.url}
                  alt={item.medicineId.name}
                  className="h-24 w-24 rounded-2xl border object-cover shadow"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.medicineId.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-sm text-gray-500">
                    Price: Rs. {item.price}
                  </p>
                </div>

                <div className="self-start rounded-xl bg-purple-100 px-5 py-3 text-lg font-bold text-purple-700 sm:self-center">
                  Rs. {item.subtotal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
