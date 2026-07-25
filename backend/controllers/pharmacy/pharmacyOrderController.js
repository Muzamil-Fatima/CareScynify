import Cart from "../../models/pharmacy/Cart.js";
import Medicine from "../../models/pharmacy/Medicine.js";
import Patient from "../../models/patientModel.js";
import PharmacyOrder from "../../models/pharmacy/PharmacyOrder.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
// placeOrder
export const placeOrder = async (req, res) => {
  try {
    const {
      prescriptionId,
      paymentMethod,
      fullName,
      phone,
      address,
      city,
      notes,
    } = req.body;

    // Delivery validation
    if (!fullName || !phone || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery information is required.",
      });
    }

    // Find Patient
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Get Cart
    const cart = await Cart.findOne({
      patientId: patient._id,
    }).populate("items.medicineId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Check all medicines belong to same pharmacy
    const pharmacyId = cart.items[0].medicineId.pharmacyId;

    const samePharmacy = cart.items.every(
      (item) => item.medicineId.pharmacyId.toString() === pharmacyId.toString(),
    );

    if (!samePharmacy) {
      return res.status(400).json({
        success: false,
        message: "You can only order medicines from one pharmacy at a time.",
      });
    }

    // Check Stock
    for (const item of cart.items) {
      if (item.quantity > item.medicineId.stock) {
        return res.status(400).json({
          success: false,
          message: `${item.medicineId.name} has insufficient stock.`,
        });
      }
    }

    // Generate Order ID
    const orderId = `ORD-${Date.now()}`;

    // Create Order
    const order = await PharmacyOrder.create({
      orderId,

      patientId: patient._id,

      pharmacyId,

      prescriptionId: prescriptionId || null,

      deliveryInfo: {
        fullName,

        phone,

        address,

        city,

        notes: notes || "",
      },

      items: cart.items.map((item) => ({
        medicineId: item.medicineId._id,

        quantity: item.quantity,

        price: item.price,

        subtotal: item.subtotal,
      })),

      totalAmount: cart.totalAmount,

      paymentMethod: paymentMethod || "Cash",
    });

    // Update Stock
    for (const item of cart.items) {
      await Medicine.findByIdAndUpdate(item.medicineId._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    // Clear Cart
    cart.items = [];

    cart.totalAmount = 0;

    await cart.save();

    return res.status(201).json({
      success: true,

      message: "Order placed successfully.",

      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to place order.",

      error: error.message,
    });
  }
};
// getPatientOrders
export const getPatientOrders = async (req, res) => {
  try {
    // Find logged-in patient
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Get only this patient's orders
    const orders = await PharmacyOrder.find({
      patientId: patient._id,
    })
      .populate({
        path: "pharmacyId",
        select:
          "pharmacyName ownerName address city logo alternatePhone homeDelivery",
      })
      .populate({
        path: "items.medicineId",
        select:
          "name genericName images unitPrice strength manufacturer category",
      })
      .populate({
        path: "prescriptionId",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Patient Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};
// Pharmacy Dashboard Orders
export const getMyPharmacyOrders = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found.",
      });
    }

    const orders = await PharmacyOrder.find({
      pharmacyId: pharmacy._id,
    })
      .populate("patientId")
      .populate("prescriptionId")
      .populate("items.medicineId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Pharmacy Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacy orders.",
      error: error.message,
    });
  }
};
// updateOrderStatus
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Ready",
      "Completed",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    // Logged-in pharmacy
    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found.",
      });
    }

    // Find only this pharmacy's order
    const order = await PharmacyOrder.findOne({
      _id: id,
      pharmacyId: pharmacy._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
      error: error.message,
    });
  }
};
// getOrder
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Logged-in patient
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const order = await PharmacyOrder.findOne({
      _id: id,
      patientId: patient._id,
    })
      .populate({
        path: "pharmacyId",
        select:
          "pharmacyName ownerName address city logo alternatePhone homeDelivery",
      })
      .populate("prescriptionId")
      .populate({
        path: "items.medicineId",
        select:
          "name genericName images unitPrice strength manufacturer category",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
      error: error.message,
    });
  }
};
