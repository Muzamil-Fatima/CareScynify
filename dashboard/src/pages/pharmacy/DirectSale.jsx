import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Receipt,
  User,
  Phone,
  CreditCard,
  Banknote,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import { getMedicines } from "../../api/pharmacy/medicineApi.js";

import { useDirectSale } from "../../context/pharmacy/DirectSaleContext";

const DirectSale = () => {
  // Direct Sale Context

  const { createDirectSale, loading: saleLoading } = useDirectSale();

  // State

  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [search, setSearch] = useState("");

  const [customerName, setCustomerName] = useState("Walk-in Customer");

  const [customerPhone, setCustomerPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [successSale, setSuccessSale] = useState(null);

  // Load Medicines

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        setLoading(true);

        const res = await getMedicines();

        const medicineData = res?.medicines || res?.data || res || [];

        setMedicines(Array.isArray(medicineData) ? medicineData : []);
      } catch (error) {
        console.error("Failed to load medicines:", error);

        toast.error(
          error?.response?.data?.message || "Failed to load medicines.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMedicines();
  }, []);

  // Filter Medicines

  const filteredMedicines = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return medicines;
    }

    return medicines.filter((medicine) => {
      return (
        medicine?.name?.toLowerCase().includes(value) ||
        medicine?.genericName?.toLowerCase().includes(value) ||
        medicine?.brand?.toLowerCase().includes(value) ||
        medicine?.batchNumber?.toLowerCase().includes(value)
      );
    });
  }, [medicines, search]);

  // Add Medicine

  const handleAddMedicine = (medicine) => {
    if (!medicine?._id) {
      toast.error("Invalid medicine.");
      return;
    }

    if (Number(medicine.stock) <= 0) {
      toast.error(`${medicine.name} is out of stock.`);
      return;
    }

    const alreadyAdded = selectedItems.find(
      (item) => item.medicineId === medicine._id,
    );

    if (alreadyAdded) {
      if (alreadyAdded.quantity >= Number(medicine.stock)) {
        toast.error(
          `Only ${medicine.stock} units of ${medicine.name} are available.`,
        );
        return;
      }

      setSelectedItems((previous) =>
        previous.map((item) =>
          item.medicineId === medicine._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );

      return;
    }

    setSelectedItems((previous) => [
      ...previous,
      {
        medicineId: medicine._id,
        medicineName: medicine.name,
        batchNumber: medicine.batchNumber || "",
        quantity: 1,
        unitPrice: Number(medicine.unitPrice) || 0,
        stock: Number(medicine.stock) || 0,
        pharmacyId: medicine.pharmacyId || null,
      },
    ]);
  };

  // Increase Quantity

  const handleIncreaseQuantity = (medicineId) => {
    setSelectedItems((previous) =>
      previous.map((item) => {
        if (item.medicineId !== medicineId) {
          return item;
        }

        if (item.quantity >= item.stock) {
          toast.error(`Only ${item.stock} units are available.`);

          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  // Decrease Quantity

  const handleDecreaseQuantity = (medicineId) => {
    setSelectedItems((previous) =>
      previous
        .map((item) => {
          if (item.medicineId !== medicineId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  // Manual Quantity Change

  const handleQuantityChange = (medicineId, value) => {
    const quantity = Number(value);

    if (!Number.isInteger(quantity)) {
      return;
    }

    setSelectedItems((previous) =>
      previous.map((item) => {
        if (item.medicineId !== medicineId) {
          return item;
        }

        if (quantity <= 0) {
          return item;
        }

        if (quantity > item.stock) {
          toast.error(`Only ${item.stock} units are available.`);

          return {
            ...item,
            quantity: item.stock,
          };
        }

        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  // Remove Medicine

  const handleRemoveMedicine = (medicineId) => {
    setSelectedItems((previous) =>
      previous.filter((item) => item.medicineId !== medicineId),
    );
  };

  // Calculations

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + Number(item.unitPrice) * Number(item.quantity),
      0,
    );
  }, [selectedItems]);

  const discountAmount = Math.max(Number(discount) || 0, 0);

  const taxAmount = Math.max(Number(tax) || 0, 0);

  const totalAmount = Math.max(subtotal - discountAmount + taxAmount, 0);

  const totalItems = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + Number(item.quantity),
      0,
    );
  }, [selectedItems]);

  // Complete Sale

  const handleCompleteSale = async () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one medicine.");
      return;
    }

    if (discountAmount > subtotal) {
      toast.error("Discount cannot be greater than subtotal.");
      return;
    }

    for (const item of selectedItems) {
      if (item.quantity > item.stock) {
        toast.error(`Insufficient stock for ${item.medicineName}.`);
        return;
      }
    }

    // Get Pharmacy ID

    const pharmacyId =
      selectedItems[0]?.pharmacyId ||
      medicines.find(
        (medicine) => medicine?._id === selectedItems[0]?.medicineId,
      )?.pharmacyId;

    if (!pharmacyId) {
      toast.error("Pharmacy information is missing.");
      return;
    }

    // Sale Data

    const saleData = {
      pharmacyId,

      items: selectedItems.map((item) => ({
        medicineId: item.medicineId,
        quantity: Number(item.quantity),
      })),

      discount: discountAmount,
      tax: taxAmount,

      paymentMethod,
      paymentStatus: "Paid",

      customerName: customerName.trim() || "Walk-in Customer",

      customerPhone: customerPhone.trim() || "",

      notes: notes.trim() || "",
    };

    try {
      setSubmitting(true);

      const res = await createDirectSale(saleData);

      const createdSale = res?.sale || res?.data || res;

      setSuccessSale(createdSale);

      toast.success("Sale completed successfully.");

      // Reset Form

      setSelectedItems([]);
      setSearch("");
      setCustomerName("Walk-in Customer");
      setCustomerPhone("");
      setPaymentMethod("Cash");
      setDiscount(0);
      setTax(0);
      setNotes("");

      // Update Local Medicine Stock

      setMedicines((previous) =>
        previous.map((medicine) => {
          const soldItem = selectedItems.find(
            (item) => item.medicineId === medicine._id,
          );

          if (!soldItem) {
            return medicine;
          }

          return {
            ...medicine,
            stock: Number(medicine.stock) - Number(soldItem.quantity),
          };
        }),
      );
    } catch (error) {
      console.error("Complete Direct Sale Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to complete sale.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Print / View Invoice

  const handlePrintInvoice = () => {
    if (!successSale?._id) {
      return;
    }

    window.open(`/pharmacy/direct-sales/${successSale._id}/invoice`, "_blank");
  };

  // Loading

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="animate-spin" size={24} />

          <span>Loading medicines...</span>
        </div>
      </div>
    );
  }

  // UI

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Direct Sale</h1>

              <p className="mt-1 text-sm text-slate-500">
                Sell medicines directly to a walk-in customer.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <ShoppingCart size={20} className="text-purple-600" />

              <span className="text-sm font-medium text-slate-700">
                {totalItems} item
                {totalItems !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Success */}

        {successSale && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 text-green-600" size={22} />

                <div>
                  <p className="font-semibold text-green-800">
                    Sale completed successfully.
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Invoice:{" "}
                    <span className="font-semibold">
                      {successSale.invoiceNumber}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrintInvoice}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                <Receipt size={18} />
                View Invoice
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Medicines */}

          <div className="xl:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Search Header */}

              <div className="border-b border-slate-200 p-4 md:p-5">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Select Medicines
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    You can select multiple medicines for one invoice.
                  </p>
                </div>

                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search medicine by name, brand, generic name or batch..."
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* Medicine List */}

              <div className="max-h-155 overflow-y-auto p-4 md:p-5">
                {filteredMedicines.length === 0 ? (
                  <div className="flex min-h-62.5 flex-col items-center justify-center text-center">
                    <AlertCircle size={40} className="mb-3 text-slate-400" />

                    <h3 className="font-semibold text-slate-700">
                      No medicines found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another medicine name.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredMedicines.map((medicine) => {
                      const selected = selectedItems.find(
                        (item) => item.medicineId === medicine._id,
                      );

                      const stock = Number(medicine.stock) || 0;

                      const isOutOfStock = stock <= 0;

                      return (
                        <div
                          key={medicine._id}
                          className={`rounded-xl border p-4 transition ${
                            selected
                              ? "border-purple-300 bg-purple-50"
                              : "border-slate-200 bg-white hover:border-purple-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-semibold text-slate-800">
                                {medicine.name}
                              </h3>

                              {medicine.genericName && (
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {medicine.genericName}
                                </p>
                              )}

                              <div className="mt-2 flex flex-wrap gap-2">
                                {medicine.brand && (
                                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                    {medicine.brand}
                                  </span>
                                )}

                                {medicine.batchNumber && (
                                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                    Batch: {medicine.batchNumber}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span
                              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                                isOutOfStock
                                  ? "bg-red-100 text-red-700"
                                  : stock <= 10
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              Stock: {stock}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs text-slate-500">
                                Unit Price
                              </p>

                              <p className="font-bold text-slate-800">
                                Rs.{" "}
                                {Number(
                                  medicine.unitPrice || 0,
                                ).toLocaleString()}
                              </p>
                            </div>

                            <button
                              type="button"
                              disabled={isOutOfStock}
                              onClick={() => handleAddMedicine(medicine)}
                              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                isOutOfStock
                                  ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                  : "bg-purple-600 text-white hover:bg-purple-700"
                              }`}
                            >
                              <Plus size={17} />

                              {selected ? "Add More" : "Add"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sale Summary */}

          <div className="xl:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Cart Header */}

              <div className="border-b border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Sale Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedItems.length} medicine
                      {selectedItems.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600">
                    <ShoppingCart size={20} />
                  </div>
                </div>
              </div>

              {/* Selected Medicines */}

              <div className="max-h-90 overflow-y-auto p-5">
                {selectedItems.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <ShoppingCart
                      size={34}
                      className="mx-auto mb-3 text-slate-300"
                    />

                    <p className="font-medium text-slate-600">
                      No medicines selected
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Select medicines from the list.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedItems.map((item) => (
                      <div
                        key={item.medicineId}
                        className="rounded-xl border border-slate-200 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {item.medicineName}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Rs. {Number(item.unitPrice).toLocaleString()} each
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveMedicine(item.medicineId)
                            }
                            className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-slate-300">
                            <button
                              type="button"
                              onClick={() =>
                                handleDecreaseQuantity(item.medicineId)
                              }
                              className="p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                              <Minus size={15} />
                            </button>

                            <input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.medicineId,
                                  e.target.value,
                                )
                              }
                              className="w-12 border-x border-slate-300 py-1.5 text-center text-sm font-semibold outline-none"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleIncreaseQuantity(item.medicineId)
                              }
                              className="p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <p className="font-semibold text-slate-800">
                            Rs.{" "}
                            {(
                              Number(item.unitPrice) * Number(item.quantity)
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer */}

              <div className="border-t border-slate-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Customer Information
                </h3>

                <div className="space-y-3">
                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer name"
                      className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}

              <div className="border-t border-slate-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      value: "Cash",
                      label: "Cash",
                      icon: Banknote,
                    },
                    {
                      value: "Card",
                      label: "Card",
                      icon: CreditCard,
                    },
                    {
                      value: "JazzCash",
                      label: "JazzCash",
                      icon: CreditCard,
                    },
                    {
                      value: "Easypaisa",
                      label: "Easypaisa",
                      icon: CreditCard,
                    },
                  ].map((method) => {
                    const Icon = method.icon;

                    const active = paymentMethod === method.value;

                    return (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => setPaymentMethod(method.value)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                          active
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-slate-200 text-slate-600 hover:border-purple-300"
                        }`}
                      >
                        <Icon size={15} />

                        {method.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Discount & Tax */}

              <div className="border-t border-slate-200 p-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Discount
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Tax
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={tax}
                      onChange={(e) => setTax(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}

              <div className="border-t border-slate-200 p-5">
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Notes
                </label>

                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Totals */}

              <div className="border-t border-slate-200 p-5">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>

                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Discount</span>

                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>

                    <span>+ Rs. {taxAmount.toLocaleString()}</span>
                  </div>

                  <div className="my-3 border-t border-slate-200" />

                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-800">
                      Total
                    </span>

                    <span className="text-xl font-bold text-purple-600">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Complete Sale */}

                <button
                  type="button"
                  disabled={
                    submitting || saleLoading || selectedItems.length === 0
                  }
                  onClick={handleCompleteSale}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    submitting || saleLoading || selectedItems.length === 0
                      ? "cursor-not-allowed bg-slate-200 text-slate-400"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {submitting || saleLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Completing Sale...
                    </>
                  ) : (
                    <>
                      <Receipt size={18} />
                      Complete Sale
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectSale;
