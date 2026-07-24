import React from "react";

const QuantitySelector = ({
  quantity = 1,
  stock = 0,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-gray-800">Quantity</h3>

      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
        {/* Decrease */}
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="flex h-12 w-12 items-center justify-center text-2xl font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        {/* Quantity */}
        <div className="flex h-12 min-w-16 items-center justify-center border-x border-gray-300 px-5 text-lg font-semibold text-gray-900">
          {quantity}
        </div>

        {/* Increase */}
        <button
          type="button"
          onClick={onIncrease}
          disabled={quantity >= stock || stock === 0}
          className="flex h-12 w-12 items-center justify-center text-2xl font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      {stock > 0 ? (
        <p className="text-sm text-gray-500">
          Maximum available:{" "}
          <span className="font-semibold">{stock}</span>
        </p>
      ) : (
        <p className="text-sm font-medium text-red-600">
          Out of Stock
        </p>
      )}
    </div>
  );
};

export default QuantitySelector;