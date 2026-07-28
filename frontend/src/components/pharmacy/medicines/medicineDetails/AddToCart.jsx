import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const AddToCart = ({
  stock = 0,
  loading = false,
  onAddToCart,
}) => {
  const inStock = stock > 0;

  return (
    <div className="flex items-center">
      <button
        type="button"
        disabled={!inStock || loading}
        onClick={onAddToCart}
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all duration-200 ${
          !inStock || loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-purple-600 hover:bg-purple-700 active:scale-95"
        }`}
      >
        <ShoppingCartOutlinedIcon fontSize="small" />

        {loading
          ? "Adding..."
          : inStock
          ? "Add to Cart"
          : "Out of Stock"}
      </button>
    </div>
  );
};

export default AddToCart;