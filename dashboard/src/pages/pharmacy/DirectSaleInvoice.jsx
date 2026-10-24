import React, { useEffect } from "react";

import {
  ArrowLeft,
  Printer,
  Download,
  Receipt,
  Loader2,
  AlertCircle,
  Phone,
  MapPin,
  User,
  CreditCard,
} from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDirectSale } from "../../context/pharmacy/DirectSaleContext";

const DirectSaleInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoice, loading, error, fetchInvoice, clearInvoice, clearError } =
    useDirectSale();

  // Load Invoice

  useEffect(() => {
    if (!id) {
      toast.error("Invoice ID is missing.");
      return;
    }

    clearInvoice();
    clearError();

    const loadInvoice = async () => {
      try {
        await fetchInvoice(id);
      } catch (err) {
        console.error("Failed to load invoice:", err);

        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load invoice.",
        );
      }
    };

    loadInvoice();
  }, [id, fetchInvoice, clearInvoice, clearError]);

  // Show Context Error

  useEffect(() => {
    if (error && !loading) {
      console.error("Direct sale invoice error:", error);
    }
  }, [error, loading]);

  // Format Date

  const formatDate = (date) => {
    if (!date) return "-";

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
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Print

  const handlePrint = () => {
    const invoiceElement = document.getElementById("invoice");

    if (!invoiceElement) {
      toast.error("Invoice content is not ready.");
      return;
    }

    // Make sure browser has finished rendering the invoice
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
      }, 150);
    });
  };

  // Download / Save as PDF

  const handleDownload = () => {
    const invoiceElement = document.getElementById("invoice");

    if (!invoiceElement) {
      toast.error("Invoice content is not ready.");
      return;
    }

    // Browser will show Print dialog.
    // Select "Save as PDF" to download the invoice.
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
      }, 150);
    });
  };

  // Loading

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 size={25} className="animate-spin" />
          <span>Loading invoice...</span>
        </div>
      </div>
    );
  }

  // Invoice Not Found

  if (!invoice) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto flex min-h-125 max-w-3xl flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600">
            <AlertCircle size={40} />
          </div>

          <h1 className="text-xl font-bold text-slate-800">
            Invoice Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error || "The requested invoice could not be found."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Invoice Data

  const pharmacy = invoice?.pharmacy || {};
  const customer = invoice?.customer || {};
  const items = Array.isArray(invoice?.items) ? invoice.items : [];

  const subtotal = Number(invoice?.subtotal || 0);
  const discount = Number(invoice?.discount || 0);
  const tax = Number(invoice?.tax || 0);
  const totalAmount = Number(invoice?.totalAmount || 0);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 print:bg-white print:p-0">
      {/* ---------------------------------------- */}
      {/* Top Actions */}
      {/* ---------------------------------------- */}

      <div className="mx-auto mb-5 flex max-w-4xl items-center justify-between print:hidden">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Download size={17} />
            Download
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <Printer size={17} />
            Print
          </button>
        </div>
      </div>

      {/* ---------------------------------------- */}
      {/* Invoice */}
      {/* ---------------------------------------- */}

      <div
        id="invoice"
        className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:mx-0 print:max-w-none print:w-full print:rounded-none print:border-0 print:shadow-none"
      >
        {/* Invoice Header */}

        <div className="border-b border-slate-200 p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Pharmacy */}

            <div className="flex items-start gap-4">
              {pharmacy.logo ? (
                <img
                  src={pharmacy.logo}
                  alt={pharmacy.pharmacyName || "Pharmacy"}
                  className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Receipt size={30} />
                </div>
              )}

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {pharmacy.pharmacyName || "Pharmacy"}
                </h1>

                {pharmacy.ownerName && (
                  <p className="mt-1 text-sm text-slate-500">
                    Owner: {pharmacy.ownerName}
                  </p>
                )}

                {pharmacy.address && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={15} className="mt-0.5 shrink-0" />

                    <span>
                      {pharmacy.address}
                      {pharmacy.city ? `, ${pharmacy.city}` : ""}
                      {pharmacy.province ? `, ${pharmacy.province}` : ""}
                    </span>
                  </div>
                )}

                {pharmacy.alternatePhone && (
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Phone size={15} />
                    <span>{pharmacy.alternatePhone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Invoice Info */}

            <div className="sm:text-right">
              <div className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2 text-purple-700">
                <Receipt size={18} />
                <span className="text-sm font-bold">INVOICE</span>
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                {invoice.invoiceNumber || "-"}
              </h2>

              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <p>
                  Date:{" "}
                  <span className="font-medium text-slate-700">
                    {formatDate(invoice.saleDate)}
                  </span>
                </p>

                <p>
                  Time:{" "}
                  <span className="font-medium text-slate-700">
                    {formatTime(invoice.saleDate)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer / Payment */}

        <div className="grid grid-cols-1 gap-4 border-b border-slate-200 p-6 md:grid-cols-2 md:p-8">
          {/* Customer */}

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <User size={17} className="text-purple-600" />

              <h3 className="text-sm font-semibold text-slate-700">Customer</h3>
            </div>

            <p className="font-semibold text-slate-800">
              {customer.name || "Walk-in Customer"}
            </p>

            {customer.phone && (
              <p className="mt-1 text-sm text-slate-500">{customer.phone}</p>
            )}
          </div>

          {/* Payment */}

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <CreditCard size={17} className="text-purple-600" />

              <h3 className="text-sm font-semibold text-slate-700">Payment</h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-800">
                {invoice.paymentMethod || "Cash"}
              </span>

              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  invoice.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : invoice.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {invoice.paymentStatus || "Paid"}
              </span>
            </div>
          </div>
        </div>

        {/* Medicines Table */}

        <div className="p-6 md:p-8">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-162.5">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Medicine
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Batch
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Qty
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Unit Price
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-sm text-slate-500"
                    >
                      No medicines found.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => {
                    const quantity = Number(item.quantity || 0);
                    const unitPrice = Number(item.unitPrice || 0);

                    const itemTotal = Number(
                      item.totalPrice ?? quantity * unitPrice,
                    );

                    const medicineId =
                      item.medicineId?._id || item.medicineId || index;

                    return (
                      <tr
                        key={`${medicineId}-${index}`}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-4 text-sm text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.medicineName ||
                                item.medicineId?.name ||
                                "Medicine"}
                            </p>

                            {item.medicineId?.genericName && (
                              <p className="mt-1 text-xs text-slate-400">
                                {item.medicineId.genericName}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {item.batchNumber || "-"}
                        </td>

                        <td className="px-4 py-4 text-center text-sm font-semibold text-slate-700">
                          {quantity}
                        </td>

                        <td className="px-4 py-4 text-right text-sm text-slate-600">
                          Rs. {unitPrice.toLocaleString()}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-semibold text-slate-800">
                          Rs. {itemTotal.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}

          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm">
              <div className="space-y-3 rounded-xl bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Tax</span>
                  <span>+ Rs. {tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-800">
                      Grand Total
                    </span>

                    <span className="text-xl font-bold text-purple-600">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}

          {invoice.notes && (
            <div className="mt-6 rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes
              </p>

              <p className="mt-2 text-sm text-slate-600">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-6 text-center md:px-8">
          <p className="text-sm font-semibold text-slate-700">
            Thank you for your purchase!
          </p>

          <p className="mt-1 text-xs text-slate-500">
            This is a computer-generated invoice and does not require a
            signature.
          </p>

          {pharmacy.licenseNumber && (
            <p className="mt-2 text-xs text-slate-400">
              License No: {pharmacy.licenseNumber}
            </p>
          )}
        </div>
      </div>

      {/* ---------------------------------------- */}
      {/* Print CSS */}
      {/* ---------------------------------------- */}

      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }

            html,
            body {
              width: 100%;
              min-height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }

            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /*
              Hide everything except the invoice.
              This also protects against global print CSS
              from the dashboard/sidebar/layout.
            */
            body * {
              visibility: hidden !important;
            }

            #invoice,
            #invoice * {
              visibility: visible !important;
            }

            #invoice {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;

              width: 100% !important;
              max-width: none !important;

              margin: 0 !important;
              padding: 0 !important;

              overflow: visible !important;

              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;

              background: white !important;
            }

            #invoice table {
              width: 100% !important;
              min-width: 0 !important;
            }

            #invoice .overflow-x-auto {
              overflow: visible !important;
            }

            #invoice img {
              max-width: 100% !important;
            }

            button,
            nav,
            aside,
            header {
              display: none !important;
            }

            tr {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }

            table {
              break-inside: auto !important;
            }

            thead {
              display: table-header-group !important;
            }

            tfoot {
              display: table-footer-group !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DirectSaleInvoice;
