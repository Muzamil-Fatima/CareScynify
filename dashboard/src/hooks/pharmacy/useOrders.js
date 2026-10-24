import { useEffect, useMemo, useState } from "react";

import { getPharmacyOrders } from "../../api/pharmacy/orderApi";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  //  Fetch Orders 

  const fetchOrders = async () => {
    try {
      setLoading(true);

      setError("");

      const res = await getPharmacyOrders();

      setOrders(res.orders || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch pharmacy orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //  Search + Filters 

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        order.deliveryInfo?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        !filters.status || order.orderStatus === filters.status;

      const paymentMatch =
        !filters.payment || order.paymentMethod === filters.payment;

      const dateMatch =
        !filters.date ||
        new Date(order.createdAt).toISOString().slice(0, 10) === filters.date;

      return (
        searchMatch &&
        statusMatch &&
        paymentMatch &&
        dateMatch
      );
    });
  }, [orders, search, filters]);

  //  Pagination 

  const totalOrders = filteredOrders.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalOrders / rowsPerPage)
  );

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const startItem =
    totalOrders === 0 ? 0 : startIndex + 1;

  const endItem = Math.min(
    startIndex + rowsPerPage,
    totalOrders
  );

  //  Statistics 

  const statistics = useMemo(() => {
    return {
      totalOrders: orders.length,

      pendingOrders: orders.filter(
        (o) => o.orderStatus === "Pending"
      ).length,

      confirmedOrders: orders.filter(
        (o) => o.orderStatus === "Confirmed"
      ).length,

      completedOrders: orders.filter(
        (o) => o.orderStatus === "Completed"
      ).length,

      cancelledOrders: orders.filter(
        (o) => o.orderStatus === "Cancelled"
      ).length,
    };
  }, [orders]);

  //  Filters 

  const handleFilterChange = (field, value) => {
    setCurrentPage(1);

    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setCurrentPage(1);

    setSearch("");

    setFilters({
      status: "",
      payment: "",
      date: "",
    });
  };

  //  Refresh 

  const handleRefresh = () => {
    fetchOrders();
  };

  const handleRetry = () => {
    fetchOrders();
  };

  // const handleExport = () => {
  //   console.log("Export Orders");
  // };

  return {
    // Data
    orders,
    filteredOrders,
    paginatedOrders,

    // States
    loading,
    error,

    // Search
    search,
    setSearch,

    // Filters
    filters,
    handleFilterChange,
    resetFilters,

    // Pagination
    currentPage,
    setCurrentPage,

    rowsPerPage,
    setRowsPerPage,

    totalOrders,
    totalPages,

    startItem,
    endItem,

    // Stats
    statistics,

    // Actions
    fetchOrders,
    handleRefresh,
    handleRetry,
    // handleExport,

    // Setter (needed after update/cancel)
    setOrders,
  };
};