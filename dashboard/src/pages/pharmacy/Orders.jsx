import React from "react";

import OrdersHeader from "../../components/pharmacy/orders/OrdersHeader";
import OrdersStats from "../../components/pharmacy/orders/OrdersStats";
import OrdersToolbar from "../../components/pharmacy/orders/OrdersToolbar";
import OrdersFilters from "../../components/pharmacy/orders/OrdersFilters";
import OrdersTable from "../../components/pharmacy/orders/OrdersTable";
import OrdersPagination from "../../components/pharmacy/orders/OrdersPagination";
import OrdersFooter from "../../components/pharmacy/orders/OrdersFooter";

import OrdersSkeleton from "../../components/pharmacy/orders/OrdersSkeleton";
import EmptyOrders from "../../components/pharmacy/orders/EmptyOrders";
import OrdersError from "../../components/pharmacy/orders/OrdersError";

import OrderDetailsModal from "../../components/pharmacy/orders/OrderDetailsModal";
import UpdateStatusModal from "../../components/pharmacy/orders/UpdateStatusModal";
import CancelOrderModal from "../../components/pharmacy/orders/CancelOrderModal";

import { useOrderContext } from "../../context/pharmacy/OrderContext";

const Orders = () => {
  const {
    paginatedOrders,
    loading,
    error,
    search,
    setSearch,
    filters,
    handleFilterChange,
    resetFilters,
    statistics,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    totalOrders,
    startItem,
    endItem,
    handleRefresh,
    handleExport,
    handleRetry,
    selectedOrder,
    showDetails,
    showStatus,
    showCancel,
    openDetails,
    openStatus,
    openCancel,
    closeDetails,
    closeStatus,
    closeCancel,
    saveStatus,
    confirmCancel,
  } = useOrderContext();

  return (
    <div className="space-y-6 p-6">
      <OrdersHeader />

      <OrdersStats {...statistics} />

      <OrdersToolbar
        search={search}
        onSearchChange={setSearch}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <OrdersFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {loading ? (
        <OrdersSkeleton />
      ) : error ? (
        <OrdersError onRetry={handleRetry} />
      ) : paginatedOrders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <>
          <OrdersTable
            orders={paginatedOrders}
            onView={openDetails}
            onUpdateStatus={openStatus}
            onCancel={openCancel}
          />

          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalItems={totalOrders}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />

          <OrdersFooter
            start={startItem}
            end={endItem}
            totalOrders={totalOrders}
          />
        </>
      )}

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showDetails}
        onClose={closeDetails}
      />

      <UpdateStatusModal
        key={selectedOrder?._id}
        order={selectedOrder}
        isOpen={showStatus}
        onClose={closeStatus}
        onSave={saveStatus}
      />

      <CancelOrderModal
        order={selectedOrder}
        isOpen={showCancel}
        onClose={closeCancel}
        onConfirm={confirmCancel}
      />
    </div>
  );
};

export default Orders;
