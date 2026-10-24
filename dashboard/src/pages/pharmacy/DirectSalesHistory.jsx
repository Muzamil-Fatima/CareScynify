import React, { useCallback, useEffect, useState } from "react";

import {
  Search,
  Receipt,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CreditCard,
  User,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { getDirectSales } from "../../api/pharmacy/directSaleApi";

const DirectSalesHistory = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);

  // Load Sales
  const loadSales = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (status) {
        params.status = status;
      }

      if (paymentStatus) {
        params.paymentStatus = paymentStatus;
      }

      const res = await getDirectSales(params);

      setSales(Array.isArray(res?.sales) ? res.sales : []);

      if (res?.pagination) {
        setPagination({
          total: Number(res.pagination.total || 0),
          page: Number(res.pagination.page || page),
          limit: Number(res.pagination.limit || limit),
          totalPages: Number(res.pagination.totalPages || 1),
        });
      } else {
        setPagination({
          total: 0,
          page,
          limit,
          totalPages: 1,
        });
      }
    } catch (error) {
      console.error("Failed to load direct sales:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load direct sales.",
      );

      setSales([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, paymentStatus]);

  // Initial / Filter Load
  useEffect(() => {
    loadSales();
  }, [loadSales]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (page !== 1) {
      setPage(1);
      return;
    }

    loadSales();
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPaymentStatus("");
    setPage(1);
  };

  // Refresh
  const handleRefresh = () => {
    loadSales();
  };

  // Open Invoice
  const handleViewInvoice = (saleId) => {
    if (!saleId) {
      toast.error("Sale ID is missing.");
      return;
    }

    window.open(
      `/pharmacy/direct-sales/${saleId}/invoice`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // View Sale
  const handleViewSale = (saleId) => {
    if (!saleId) {
      toast.error("Sale ID is missing.");
      return;
    }

    window.open(
      `/pharmacy/direct-sales/${saleId}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Open New Direct Sale
  const handleNewDirectSale = () => {
    navigate("/pharmacy/direct-sales/new");
  };

  // Format Date
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format Time
  const formatTime = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status Badge
  const getStatusClass = (saleStatus) => {
    if (saleStatus === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (saleStatus === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // Payment Badge
  const getPaymentStatusClass = (paymentStatusValue) => {
    if (paymentStatusValue === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (paymentStatusValue === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (paymentStatusValue === "Partial") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // Items Count
  const getItemsCount = (items) => {
    if (!Array.isArray(items)) {
      return 0;
    }

    return items.reduce(
      (total, item) => total + Number(item?.quantity || 0),
      0,
    );
  };

  // Pagination
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Number(pagination.totalPages || 1)) {
      setPage((previous) => previous + 1);
    }
  };

  // Loading
  if (loading && sales.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 size={24} className="animate-spin" />
              <span>Loading direct sales...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* ---------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------- */}

        <div className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Direct Sales History
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all direct medicine sales.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleNewDirectSale}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                <Receipt size={17} />
                New Direct Sale
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* Filters */}
        {/* ---------------------------------------- */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by invoice number..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Sale Status */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            >
              <option value="">All Sale Status</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Payment Status */}
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            >
              <option value="">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
            </select>

            {/* Buttons */}
            <div className="flex gap-2 md:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                <Search size={17} />
                Search
              </button>

              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* ---------------------------------------- */}
        {/* Summary */}
        {/* ---------------------------------------- */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Receipt size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-500">Total Sales</p>

                <p className="text-xl font-bold text-slate-800">
                  {pagination.total || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Package size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-500">Current Page Sales</p>

                <p className="text-xl font-bold text-slate-800">
                  {sales.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <CreditCard size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-500">Current Page Amount</p>

                <p className="text-xl font-bold text-slate-800">
                  Rs.{" "}
                  {sales
                    .reduce(
                      (total, sale) => total + Number(sale?.totalAmount || 0),
                      0,
                    )
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* Sales Table */}
        {/* ---------------------------------------- */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Sales</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recent direct sales and invoices.
                </p>
              </div>

              {loading && (
                <Loader2 size={20} className="animate-spin text-purple-600" />
              )}
            </div>
          </div>

          {sales.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <AlertCircle size={34} className="text-slate-400" />
              </div>

              <h3 className="font-semibold text-slate-700">
                No direct sales found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                No sales match your current search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Invoice
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Medicines
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Payment
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sales.map((sale, index) => (
                      <tr
                        key={sale?._id || sale?.id || index}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        {/* Invoice */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                              <Receipt size={16} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {sale?.invoiceNumber || "-"}
                              </p>

                              <p className="text-xs text-slate-400">
                                {sale?._id || sale?.id || "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-slate-400" />

                            <div>
                              <p className="font-medium text-slate-700">
                                {sale?.customerName ||
                                  sale?.customer?.name ||
                                  "Walk-in Customer"}
                              </p>

                              {(sale?.customerPhone ||
                                sale?.customer?.phone) && (
                                <p className="text-xs text-slate-400">
                                  {sale?.customerPhone || sale?.customer?.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={16}
                              className="text-slate-400"
                            />

                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {formatDate(sale?.saleDate)}
                              </p>

                              <p className="text-xs text-slate-400">
                                {formatTime(sale?.saleDate)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Medicines */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-slate-700">
                              {Array.isArray(sale?.items)
                                ? sale.items.length
                                : 0}{" "}
                              medicine
                              {Array.isArray(sale?.items) &&
                              sale.items.length !== 1
                                ? "s"
                                : ""}
                            </p>

                            <p className="text-xs text-slate-400">
                              {getItemsCount(sale?.items)} total units
                            </p>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-800">
                            Rs.{" "}
                            {Number(sale?.totalAmount || 0).toLocaleString()}
                          </p>

                          <p className="text-xs text-slate-400">
                            {sale?.paymentMethod || "Cash"}
                          </p>
                        </td>

                        {/* Payment */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${getPaymentStatusClass(
                              sale?.paymentStatus,
                            )}`}
                          >
                            {sale?.paymentStatus || "Paid"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                              sale?.status,
                            )}`}
                          >
                            {sale?.status || "Completed"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewSale(sale?._id || sale?.id)
                              }
                              className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100"
                              title="View Sale"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleViewInvoice(sale?._id || sale?.id)
                              }
                              className="rounded-lg bg-purple-600 p-2 text-white transition hover:bg-purple-700"
                              title="View Invoice"
                            >
                              <Receipt size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Cards */}
              <div className="divide-y divide-slate-100 lg:hidden">
                {sales.map((sale, index) => (
                  <div
                    key={sale?._id || sale?.id || index}
                    className="p-4 md:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600">
                          <Receipt size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {sale?.invoiceNumber || "-"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(sale?.saleDate)} •{" "}
                            {formatTime(sale?.saleDate)}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 font-bold text-purple-600">
                        Rs. {Number(sale?.totalAmount || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {/* Customer */}
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">Customer</p>

                        <p className="mt-1 truncate text-sm font-medium text-slate-700">
                          {sale?.customerName ||
                            sale?.customer?.name ||
                            "Walk-in Customer"}
                        </p>
                      </div>

                      {/* Medicines */}
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">Medicines</p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {Array.isArray(sale?.items) ? sale.items.length : 0}{" "}
                          types / {getItemsCount(sale?.items)} units
                        </p>
                      </div>

                      {/* Payment */}
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">Payment</p>

                        <div className="mt-1">
                          <span
                            className={`inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${getPaymentStatusClass(
                              sale?.paymentStatus,
                            )}`}
                          >
                            {sale?.paymentStatus || "Paid"}
                          </span>
                        </div>
                      </div>

                      {/* Sale Status */}
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">Sale Status</p>

                        <div className="mt-1">
                          <span
                            className={`inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${getStatusClass(
                              sale?.status,
                            )}`}
                          >
                            {sale?.status || "Completed"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewSale(sale?._id || sale?.id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        View Sale
                      </button>

                      <button
                        type="button"
                        onClick={() => handleViewInvoice(sale?._id || sale?.id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                      >
                        <Receipt size={16} />
                        Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ---------------------------------------- */}
          {/* Pagination */}
          {/* ---------------------------------------- */}

          {sales.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-700">
                  {pagination.page || page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {pagination.totalPages || 1}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page <= 1 || loading}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    page >= Number(pagination.totalPages || 1) || loading
                  }
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectSalesHistory;
