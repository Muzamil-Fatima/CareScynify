import React, { useState } from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const InventoryActions = ({
  medicine,
  onView,
  onEdit,
  onDelete,
  onRestock,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden items-center justify-center gap-2 lg:flex">
        {/* View */}
        <button
          onClick={() => onView?.(medicine)}
          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
          title="View"
        >
          <VisibilityRoundedIcon fontSize="small" />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit?.(medicine)}
          className="rounded-lg bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
          title="Edit"
        >
          <EditRoundedIcon fontSize="small" />
        </button>

        {/* Restock */}
        <button
          onClick={() => onRestock?.(medicine)}
          className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
          title="Restock"
        >
          <Inventory2RoundedIcon fontSize="small" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete?.(medicine)}
          className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
          title="Delete"
        >
          <DeleteRoundedIcon fontSize="small" />
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="relative flex justify-center lg:hidden">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-lg bg-slate-100 p-2 transition hover:bg-slate-200"
        >
          <MoreVertRoundedIcon />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <button
              onClick={() => {
                onView?.(medicine);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
            >
              <VisibilityRoundedIcon fontSize="small" />
              View
            </button>

            <button
              onClick={() => {
                onEdit?.(medicine);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
            >
              <EditRoundedIcon fontSize="small" />
              Edit
            </button>

            <button
              onClick={() => {
                onRestock?.(medicine);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
            >
              <Inventory2RoundedIcon fontSize="small" />
              Restock
            </button>

            <button
              onClick={() => {
                onDelete?.(medicine);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <DeleteRoundedIcon fontSize="small" />
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryActions;