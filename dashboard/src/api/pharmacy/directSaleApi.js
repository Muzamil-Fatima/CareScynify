import { api } from "../axios";

// Create Direct Sale
export const createDirectSale = async (saleData) => {
  const res = await api.post("/api/direct-sales", saleData);

  return res.data;
};

// Get All Direct Sales
export const getDirectSales = async (params = {}) => {
  const res = await api.get("/api/direct-sales", { params });

  return res.data;
};

// Get Single Direct Sale
export const getDirectSaleById = async (saleId) => {
  const res = await api.get(`/api/direct-sales/${saleId}`);

  return res.data;
};

// Generate Invoice
export const generateInvoice = async (saleId) => {
  const res = await api.get(`/api/direct-sales/${saleId}/invoice`);

  return res.data;
};
