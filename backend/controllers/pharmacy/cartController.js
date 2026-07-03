import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      patientId: req.user._id,
    }).populate("items.medicineId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalAmount: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart.",
    });
  }
};
addToCart
import Cart from "../models/Cart.js";
import Medicine from "../models/Medicine.js";
import Patient from "../models/Patient.js";

export const addToCart = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;

    const patient = await Patient.findOne({ userId: req.user._id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    let cart = await Cart.findOne({ patientId: patient._id });

    if (!cart) {
      cart = new Cart({
        patientId: patient._id,
        items: [],
        totalAmount: 0,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.medicineId.toString() === medicineId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].subtotal =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    } else {
      cart.items.push({
        medicineId,
        quantity,
        price: medicine.unitPrice,
        subtotal: medicine.unitPrice * quantity,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Medicine added to cart.",
      cart,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add medicine to cart.",
    });
  }
};
updateCartItem
import Cart from "../models/Cart.js";
import Patient from "../models/Patient.js";

export const updateCartItem = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

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
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (item) => item.medicineId.toString() === medicineId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found in cart.",
      });
    }

    item.quantity = quantity;
    item.subtotal = item.price * quantity;

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};
removeCartItem
import Cart from "../models/Cart.js";
import Patient from "../models/Patient.js";

export const removeCartItem = async (req, res) => {
  try {
    const { medicineId } = req.params;

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
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.medicineId.toString() === medicineId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found in cart.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.medicineId.toString() !== medicineId
    );

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Medicine removed from cart.",
      cart,
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove medicine from cart.",
    });
  }
};
clearCart
import Cart from "../models/Cart.js";
import Patient from "../models/Patient.js";

export const clearCart = async (req, res) => {
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

    const cart = await Cart.findOne({
      patientId: patient._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
      cart,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear cart.",
    });
  }
};