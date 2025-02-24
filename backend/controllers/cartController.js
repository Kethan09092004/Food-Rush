import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; // Ensure userId is valid

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure cartData is initialized
    let cartData = userData.cartData || {};

    // Add item to cart
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    // Update user with new cart data
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };
