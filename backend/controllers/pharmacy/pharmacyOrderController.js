placeOrder
import Cart from "../../models/pharmacy/Cart.js";
import Medicine from "../../models/pharmacy/Medicine.js";
import Patient from "../../models/patientModel.js";
import PharmacyOrder from "../../models/pharmacy/PharmacyOrder.js";
import Prescription from "../../models/prescriptionModel.js";
export const placeOrder = async (req, res) => {
  try {
    const { prescriptionId, paymentMethod } = req.body;

    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const cart = await Cart.findOne({
      patientId: patient._id,
    }).populate("items.medicineId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Check stock
    for (const item of cart.items) {
      if (item.quantity > item.medicineId.stock) {
        return res.status(400).json({
          success: false,
          message: `${item.medicineId.name} has insufficient stock.`,
        });
      }
    }

    // Create Order
    const order = await PharmacyOrder.create({
      patientId: patient._id,
      prescriptionId: prescriptionId || null,
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

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order.",
    });
  }
};
getPatientOrders
import Patient from "../models/Patient.js";
import PharmacyOrder from "../models/PharmacyOrder.js";

export const getPatientOrders = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const orders = await PharmacyOrder.find({
      patientId: patient._id,
    })
      .populate("items.medicineId")
      .populate("prescriptionId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Patient Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};
getAllOrders
import PharmacyOrder from "../models/PharmacyOrder.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await PharmacyOrder.find()
      .populate("patientId")
      .populate("prescriptionId")
      .populate("items.medicineId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};
updateOrderStatus
import PharmacyOrder from "../models/PharmacyOrder.js";

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

    const order = await PharmacyOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};
getOrder
import PharmacyOrder from "../models/PharmacyOrder.js";

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await PharmacyOrder.findById(id)
      .populate("patientId")
      .populate("prescriptionId")
      .populate("items.medicineId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
};