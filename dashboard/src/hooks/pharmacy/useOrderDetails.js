import { useState } from "react";

import {
  updateOrderStatus,
  // cancelOrder, // Add later when backend API is ready
} from "../../api/pharmacy/orderApi";

export const useOrderDetails = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");

  const [cancelReason, setCancelReason] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  // ---------------- Details ----------------

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  // ---------------- Status ----------------

  const openStatus = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.orderStatus);
    setShowStatus(true);
  };

  const closeStatus = () => {
    setShowStatus(false);
    setSelectedStatus("");
  };

  const saveStatus = async (order, status) => {
    if (!order || !status) return;

    try {
      setActionLoading(true);

      await updateOrderStatus(order._id, status);

      setSelectedOrder((prev) => ({
        ...prev,
        orderStatus: status,
      }));

      setSelectedStatus(status);

      setShowStatus(false);
    } catch (error) {
      console.error("Update Status Error:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------- Cancel ----------------

  const openCancel = (order) => {
    setSelectedOrder(order);
    setCancelReason("");
    setShowCancel(true);
  };

  const closeCancel = () => {
    setShowCancel(false);
    setCancelReason("");
  };

  const confirmCancel = async () => {
    if (!selectedOrder) return;

    try {
      setActionLoading(true);

      // await cancelOrder(
      //   selectedOrder._id,
      //   cancelReason
      // );

      setSelectedOrder((prev) => ({
        ...prev,
        orderStatus: "Cancelled",
      }));

      setShowCancel(false);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  return {
    // Selected Order
    selectedOrder,
    setSelectedOrder,

    // Details Modal
    showDetails,
    openDetails,
    closeDetails,

    // Status Modal
    showStatus,
    selectedStatus,
    setSelectedStatus,
    openStatus,
    closeStatus,
    saveStatus,

    // Cancel Modal
    showCancel,
    cancelReason,
    setCancelReason,
    openCancel,
    closeCancel,
    confirmCancel,

    // Loading
    actionLoading,
  };
};
