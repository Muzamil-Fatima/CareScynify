import React, { useCallback, useState } from "react";

import DirectSaleContext from "./DirectSaleContext";

import {
  createDirectSale,
  getDirectSales,
  getDirectSaleById,
  generateInvoice,
} from "../../api/pharmacy/directSaleApi";

const DirectSaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [currentSale, setCurrentSale] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear Error

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Create Direct Sale

  const handleCreateDirectSale = useCallback(async (saleData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createDirectSale(saleData);

      const createdSale = response?.sale || response?.data || response;

      if (createdSale) {
        setCurrentSale(createdSale);

        setSales((previousSales) => [createdSale, ...previousSales]);
      }

      return response;
    } catch (err) {
      console.error("Create direct sale error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create direct sale.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get All Direct Sales

  const fetchDirectSales = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDirectSales(params);

      const salesData = Array.isArray(response?.sales)
        ? response.sales
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];

      setSales(salesData);

      return response;
    } catch (err) {
      console.error("Get direct sales error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load direct sales.";

      setError(message);

      setSales([]);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Single Direct Sale

  const fetchDirectSaleById = useCallback(async (saleId) => {
    try {
      setLoading(true);
      setError(null);

      if (!saleId) {
        throw new Error("Sale ID is required.");
      }

      const response = await getDirectSaleById(saleId);

      const sale = response?.sale || response?.data || response;

      setCurrentSale(sale || null);

      return response;
    } catch (err) {
      console.error("Get direct sale by ID error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load direct sale.";

      setError(message);
      setCurrentSale(null);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate / Get Invoice

  const fetchInvoice = useCallback(async (saleId) => {
    try {
      setLoading(true);
      setError(null);

      if (!saleId) {
        throw new Error("Sale ID is required.");
      }

      const response = await generateInvoice(saleId);

      const invoiceData = response?.invoice || response?.data || response;

      setInvoice(invoiceData || null);

      return response;
    } catch (err) {
      console.error("Generate invoice error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load invoice.";

      setError(message);
      setInvoice(null);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear Current Sale

  const clearCurrentSale = useCallback(() => {
    setCurrentSale(null);
  }, []);

  // Clear Invoice

  const clearInvoice = useCallback(() => {
    setInvoice(null);
  }, []);

  // Context Value

  const value = {
    // State
    sales,
    currentSale,
    invoice,
    loading,
    error,

    // Sale functions
    createDirectSale: handleCreateDirectSale,

    fetchDirectSales,

    fetchDirectSaleById,

    // Invoice
    fetchInvoice,

    // Utility
    clearError,
    clearCurrentSale,
    clearInvoice,

    // Setters if needed
    setSales,
    setCurrentSale,
    setInvoice,
  };

  return (
    <DirectSaleContext.Provider value={value}>
      {children}
    </DirectSaleContext.Provider>
  );
};

export default DirectSaleProvider;
