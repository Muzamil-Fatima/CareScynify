import mongoose from "mongoose";

import Medicine from "../../models/pharmacy/Medicine.js";
import Pharmacy from "../../models/pharmacy/PharmacyModel.js";
import DirectSale from "../../models/pharmacy/DirectSale.js";

/**
 * Generate a unique invoice number
 *
 * Example:
 * INV-20260824-0001
 */
const generateInvoiceNumber = async () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const datePrefix = `INV-${year}${month}${day}`;

  const lastSale = await DirectSale.findOne({
    invoiceNumber: {
      $regex: `^${datePrefix}-`,
    },
  })
    .sort({ createdAt: -1 })
    .select("invoiceNumber");

  let nextNumber = 1;

  if (lastSale?.invoiceNumber) {
    const lastNumber = parseInt(
      lastSale.invoiceNumber.split("-").pop(),
      10,
    );

    if (!Number.isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  return `${datePrefix}-${String(nextNumber).padStart(4, "0")}`;
};

/**
 * Create Direct Sale
 *
 * Flow:
 * 1. Validate pharmacy
 * 2. Validate medicines
 * 3. Check stock
 * 4. Calculate prices
 * 5. Decrease inventory
 * 6. Generate invoice number
 * 7. Create DirectSale
 */
export const createDirectSale = async (req, res) => {
  try {
    const {
      pharmacyId,
      items,
      discount = 0,
      tax = 0,
      paymentMethod = "Cash",
      paymentStatus = "Paid",
      customerName = "Walk-in Customer",
      customerPhone,
      notes,
    } = req.body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!pharmacyId) {
      return res.status(400).json({
        success: false,
        message: "Pharmacy ID is required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one medicine is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pharmacy ID.",
      });
    }

    // -----------------------------
    // Validate pharmacy
    // -----------------------------

    const pharmacy = await Pharmacy.findById(pharmacyId);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found.",
      });
    }

    // -----------------------------
    // Validate discount and tax
    // -----------------------------

    const discountAmount = Number(discount);
    const taxAmount = Number(tax);

    if (
      Number.isNaN(discountAmount) ||
      discountAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid discount amount.",
      });
    }

    if (
      Number.isNaN(taxAmount) ||
      taxAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid tax amount.",
      });
    }

    // -----------------------------
    // Process medicines
    // -----------------------------

    const saleItems = [];
    let subtotal = 0;

    for (const item of items) {
      const { medicineId, quantity } = item;

      if (!medicineId) {
        throw new Error("Medicine ID is required.");
      }

      if (!mongoose.Types.ObjectId.isValid(medicineId)) {
        throw new Error(`Invalid medicine ID: ${medicineId}`);
      }

      const saleQuantity = Number(quantity);

      if (
        Number.isNaN(saleQuantity) ||
        saleQuantity <= 0 ||
        !Number.isInteger(saleQuantity)
      ) {
        throw new Error(
          "Medicine quantity must be a positive whole number.",
        );
      }

      // -----------------------------
      // Find medicine belonging
      // to this pharmacy
      // -----------------------------

      const medicine = await Medicine.findOne({
        _id: medicineId,
        pharmacyId,
      });

      if (!medicine) {
        throw new Error(
          "Medicine not found or does not belong to this pharmacy.",
        );
      }

      // -----------------------------
      // Check active medicine
      // -----------------------------

      if (!medicine.isActive) {
        throw new Error(
          `${medicine.name} is currently inactive.`,
        );
      }

      // -----------------------------
      // Check stock
      // -----------------------------

      if (medicine.stock < saleQuantity) {
        throw new Error(
          `Insufficient stock for ${medicine.name}. Available stock: ${medicine.stock}.`,
        );
      }

      // -----------------------------
      // Calculate item total
      // -----------------------------

      const unitPrice = Number(medicine.unitPrice);

      if (Number.isNaN(unitPrice) || unitPrice < 0) {
        throw new Error(
          `Invalid unit price for ${medicine.name}.`,
        );
      }

      const itemTotal = unitPrice * saleQuantity;

      subtotal += itemTotal;

      // -----------------------------
      // Save medicine snapshot
      // -----------------------------

      saleItems.push({
        medicineId: medicine._id,
        medicineName: medicine.name,
        batchNumber: medicine.batchNumber,
        quantity: saleQuantity,
        unitPrice,
        totalPrice: itemTotal,
      });

      // -----------------------------
      // Decrease inventory
      // -----------------------------

      medicine.stock -= saleQuantity;

      await medicine.save();
    }

    // -----------------------------
    // Calculate final total
    // -----------------------------

    const totalAmount =
      subtotal - discountAmount + taxAmount;

    if (totalAmount < 0) {
      throw new Error(
        "Discount cannot be greater than the sale amount.",
      );
    }

    // -----------------------------
    // Generate invoice number
    // -----------------------------

    const invoiceNumber =
      await generateInvoiceNumber();

    // -----------------------------
    // Create DirectSale
    // -----------------------------

    const directSale = await DirectSale.create({
      pharmacyId,
      invoiceNumber,
      items: saleItems,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      totalAmount,
      paymentMethod,
      paymentStatus,
      customerName:
        customerName?.trim() || "Walk-in Customer",
      customerPhone:
        customerPhone?.trim() || undefined,
      notes: notes?.trim() || undefined,
      saleDate: new Date(),
      status: "Completed",
    });

    // -----------------------------
    // Get complete created sale
    // -----------------------------

    const createdSale = await DirectSale.findById(
      directSale._id,
    )
      .populate(
        "pharmacyId",
        "pharmacyName ownerName address city phone alternatePhone",
      )
      .populate(
        "items.medicineId",
        "name genericName brand category strength manufacturer",
      );

    // -----------------------------
    // Return response
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Direct sale completed successfully.",
      sale: createdSale,
    });
  } catch (error) {
    console.error(
      "Create Direct Sale Error:",
      error,
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to create direct sale.",
    });
  }
};

/**
 * Get all direct sales
 *
 * Optional query:
 * ?pharmacyId=...
 * ?status=Completed
 * ?paymentStatus=Paid
 * ?search=INV-20260824
 */
export const getDirectSales = async (req, res) => {
  try {
    const {
      pharmacyId,
      status,
      paymentStatus,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    // -----------------------------
    // Pharmacy filter
    // -----------------------------

    if (pharmacyId) {
      if (
        !mongoose.Types.ObjectId.isValid(
          pharmacyId,
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid pharmacy ID.",
        });
      }

      filter.pharmacyId = pharmacyId;
    }

    // -----------------------------
    // Status filter
    // -----------------------------

    if (status) {
      filter.status = status;
    }

    // -----------------------------
    // Payment status filter
    // -----------------------------

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    // -----------------------------
    // Invoice search
    // -----------------------------

    if (search?.trim()) {
      filter.invoiceNumber = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // -----------------------------
    // Pagination
    // -----------------------------

    const pageNumber = Math.max(
      Number(page),
      1,
    );

    const limitNumber = Math.min(
      Math.max(Number(limit), 1),
      100,
    );

    const skip =
      (pageNumber - 1) * limitNumber;

    // -----------------------------
    // Get sales
    // -----------------------------

    const [sales, total] =
      await Promise.all([
        DirectSale.find(filter)
          .populate(
            "pharmacyId",
            "pharmacyName ownerName address city",
          )
          .populate(
            "items.medicineId",
            "name genericName brand category strength",
          )
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),

        DirectSale.countDocuments(filter),
      ]);

    return res.status(200).json({
      success: true,
      sales,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(
          total / limitNumber,
        ),
      },
    });
  } catch (error) {
    console.error(
      "Get Direct Sales Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch direct sales.",
    });
  }
};

/**
 * Get one Direct Sale by ID
 */
export const getDirectSaleById = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid direct sale ID.",
      });
    }

    const sale = await DirectSale.findById(id)
      .populate(
        "pharmacyId",
        "pharmacyName ownerName registrationNumber licenseNumber taxNumber address city province postalCode alternatePhone website logo",
      )
      .populate(
        "items.medicineId",
        "name genericName brand category strength manufacturer batchNumber",
      );

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Direct sale not found.",
      });
    }

    return res.status(200).json({
      success: true,
      sale,
    });
  } catch (error) {
    console.error(
      "Get Direct Sale By ID Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch direct sale.",
    });
  }
};

/**
 * Generate / get invoice for a Direct Sale
 *
 * This does NOT create another sale.
 * It simply returns the complete sale data
 * required by the frontend to display or generate
 * the invoice/receipt.
 */
export const generateInvoice = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid direct sale ID.",
      });
    }

    const sale = await DirectSale.findById(id)
      .populate(
        "pharmacyId",
        "pharmacyName ownerName registrationNumber licenseNumber taxNumber address city province postalCode alternatePhone website logo",
      )
      .populate(
        "items.medicineId",
        "name genericName brand category strength manufacturer",
      );

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Direct sale not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Invoice data generated successfully.",

      invoice: {
        invoiceNumber: sale.invoiceNumber,
        saleId: sale._id,
        saleDate: sale.saleDate,

        pharmacy: sale.pharmacyId,

        customer: {
          name: sale.customerName,
          phone: sale.customerPhone,
        },

        items: sale.items,

        subtotal: sale.subtotal,
        discount: sale.discount,
        tax: sale.tax,
        totalAmount: sale.totalAmount,

        paymentMethod: sale.paymentMethod,
        paymentStatus: sale.paymentStatus,

        notes: sale.notes,
        status: sale.status,
      },
    });
  } catch (error) {
    console.error(
      "Generate Invoice Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate invoice.",
    });
  }
};