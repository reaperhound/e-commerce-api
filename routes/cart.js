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

// set count
router.patch("/set/:userId/:cartId", async (req, res) => {
  try {
    const { userId, cartId } = req.params;
    const { count } = req.body;

    const data = await User.updateOne(
      { _id: userId, "cart._id": cartId },
      { $set: { "cart.$.count": count } }
    );

    res.status(200).json({ success: true, data, message: "Cart count set" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to add to Cart" });
  }
});

//  increment count
router.patch("/increment/:userId/:cartId", async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    const data = await User.updateOne(
      { _id: userId, "cart._id": cartId },
      { $inc: { "cart.$.count": 1 } }
    );

    res
      .status(200)
      .json({ success: true, data, message: "Cart count incremented" });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
      message: "Failed to increment Cart count",
    });
  }
});

// decrement count
router.patch("/decrement/:userId/:cartId", async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    const data = await User.updateOne(
      { _id: userId, "cart._id": cartId },
      { $inc: { "cart.$.count": -1 } }
    );

    res
      .status(200)
      .json({ success: true, data, message: "Cart count decremented" });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
      message: "Failed to decrement Cart count",
    });
  }
});

// delete cart item
router.delete("/delete/:userId/:cartId", async (req, res) => {
  try {
    const { userId, cartId } = req.params;
    const data = await User.updateOne(
      { _id: userId },
      { $pull: { cart: { _id: cartId } } }
    );
    res
      .status(200)
      .json({ success: true, data, message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
      message: "Failed to delete cart",
    });
  }
});

module.exports = router;
