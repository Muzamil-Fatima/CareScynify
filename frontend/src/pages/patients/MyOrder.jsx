import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../context/pharmacy/OrderContext";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
const MyOrders = () => {
  const { orders, fetchMyOrders, loading } = useOrderContext();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold">
          <ShoppingBagOutlinedIcon fontSize="large" />
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div>
                  <h2 className="text-xl font-semibold">#{order.orderId}</h2>

                  <p className="mt-1 text-gray-500">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="mt-3 text-gray-700">
                    {order.items.length} Items
                  </p>

                  <p className="mt-1 font-semibold text-purple-700">
                    Total: Rs. {order.totalAmount}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end">
                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold ${
                      order.orderStatus === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                  <div className="flex gap-3">
                    <Link
                      to={`/orders/${order._id}`}
                      className="rounded-xl border border-purple-700 px-5 py-2 font-medium text-purple-700 hover:bg-purple-50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && orders.length === 0 && (
          <div className="mt-20 text-center">
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 80 }}
              className="text-gray-300!"
            />

            <h2 className="mt-4 text-2xl font-semibold">No Orders Found</h2>

            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/pharmacy"
              className="mt-6 inline-block rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
