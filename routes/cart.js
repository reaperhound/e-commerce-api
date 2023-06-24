const express = require("express");
const User = require("../models/User");

const router = express.Router();

// get cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findOne({ _id: userId }, "cart avatar");
    res
      .status(200)
      .json({ success: true, data, message: "Successfully fetched Cart" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to fetch Cart" });
  }
});

// add to cart
router.patch("/add/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const data = await User.updateOne(
      { _id: userId },
      { $push: { cart: { productId } } },
      { new: true }
    );
    res.status(201).json({ success: true, data, message: "Added to Cart" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to add to Cart" });
  }
});

module.exports = router;
