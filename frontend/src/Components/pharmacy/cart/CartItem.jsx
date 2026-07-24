import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {

  const medicine = item?.medicineId;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">

        {/* Medicine Image */}
        <img
          src={
            medicine?.images?.[0]?.url ||
            "https://placehold.co/120x120?text=Medicine"
          }
          alt={medicine?.name}
          className="h-24 w-24 rounded-xl border object-cover"
        />


        {/* Details */}
        <div className="flex flex-1 flex-col justify-between">

          <div>

            <h3 className="line-clamp-2 text-base font-semibold text-gray-800">
              {medicine?.name}
            </h3>


            {medicine?.genericName && (
              <p className="mt-1 text-sm text-gray-500">
                {medicine.genericName}
              </p>
            )}


            <p className="mt-2 text-lg font-bold text-purple-700">
              Rs. {item?.price}
            </p>

          </div>


          <div className="mt-4 flex items-center justify-between">


            <div className="flex items-center overflow-hidden rounded-full border border-gray-300">

              <button
                onClick={() => onDecrease(item)}
                className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
              >
                <RemoveRoundedIcon fontSize="small" />
              </button>


              <span className="min-w-10 text-center font-semibold">
                {item?.quantity}
              </span>


              <button
                onClick={() => onIncrease(item)}
                className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
              >
                <AddRoundedIcon fontSize="small" />
              </button>

            </div>



            <div className="text-right">

              <p className="text-xs text-gray-500">
                Subtotal
              </p>

              <p className="font-semibold text-gray-800">
                Rs. {item?.subtotal}
              </p>

            </div>



            <button
              onClick={() => onRemove(item)}
              className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
              title="Remove Item"
            >
              <DeleteOutlineRoundedIcon />
            </button>


          </div>

        </div>

      </div>
    </div>
  );
};

export default CartItem;
