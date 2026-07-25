import React from "react";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";

const OrdersHeader = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <LocalPharmacyRoundedIcon fontSize="large" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

          <p className="mt-1 text-gray-600">Manage medicine orders.</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
