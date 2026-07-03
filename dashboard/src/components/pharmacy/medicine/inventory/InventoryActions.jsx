// import React, { useState } from "react";

// import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
// import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

// const InventoryActions = ({
//   medicine,
//   onView,
//   onEdit,
//   onDelete,
//   onRestock,
// }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <>
//       {/* Desktop Actions */}
//       <div className="hidden items-center justify-center gap-2 lg:flex">
//         {/* View */}
//         <button
//           onClick={() => onView?.(medicine)}
//           className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
//           title="View"
//         >
//           <VisibilityRoundedIcon fontSize="small" />
//         </button>

//         {/* Edit */}
//         <button
//           onClick={() => onEdit?.(medicine)}
//           className="rounded-lg bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
//           title="Edit"
//         >
//           <EditRoundedIcon fontSize="small" />
//         </button>

//         {/* Restock */}
//         <button
//           onClick={() => onRestock?.(medicine)}
//           className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
//           title="Restock"
//         >
//           <Inventory2RoundedIcon fontSize="small" />
//         </button>

//         {/* Delete */}
//         <button
//           onClick={() => onDelete?.(medicine)}
//           className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
//           title="Delete"
//         >
//           <DeleteRoundedIcon fontSize="small" />
//         </button>
//       </div>

//       {/* Mobile Actions */}
//       <div className="relative flex justify-center lg:hidden">
//         <button
//           onClick={() => setShowMenu(!showMenu)}
//           className="rounded-lg bg-slate-100 p-2 transition hover:bg-slate-200"
//         >
//           <MoreVertRoundedIcon />
//         </button>

//         {showMenu && (
//           <div className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//             <button
//               onClick={() => {
//                 onView?.(medicine);
//                 setShowMenu(false);
//               }}
//               className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
//             >
//               <VisibilityRoundedIcon fontSize="small" />
//               View
//             </button>

//             <button
//               onClick={() => {
//                 onEdit?.(medicine);
//                 setShowMenu(false);
//               }}
//               className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
//             >
//               <EditRoundedIcon fontSize="small" />
//               Edit
//             </button>

//             <button
//               onClick={() => {
//                 onRestock?.(medicine);
//                 setShowMenu(false);
//               }}
//               className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-slate-100"
//             >
//               <Inventory2RoundedIcon fontSize="small" />
//               Restock
//             </button>

//             <button
//               onClick={() => {
//                 onDelete?.(medicine);
//                 setShowMenu(false);
//               }}
//               className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
//             >
//               <DeleteRoundedIcon fontSize="small" />
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default InventoryActions;
import React, { useEffect, useRef, useState } from "react";

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
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-center" ref={menuRef}>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-violet-600"
      >
        <MoreVertRoundedIcon />
      </button>

      {showMenu && (
        <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => {
              onView?.(medicine);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <VisibilityRoundedIcon fontSize="small" />
            View Details
          </button>

          <button
            onClick={() => {
              onEdit?.(medicine);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <EditRoundedIcon fontSize="small" />
            Edit Medicine
          </button>

          <button
            onClick={() => {
              onRestock?.(medicine);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-green-50 hover:text-green-600"
          >
            <Inventory2RoundedIcon fontSize="small" />
            Restock
          </button>

          <div className="border-t border-slate-100" />

          <button
            onClick={() => {
              onDelete?.(medicine);
              setShowMenu(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
          >
            <DeleteRoundedIcon fontSize="small" />
            Delete Medicine
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryActions;