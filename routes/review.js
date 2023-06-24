const express = require("express");
const Product = require("../models/Products");
const User = require("../models/User");

const router = express.Router();

// get review
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await Product.findOne({ _id: productId }, "reviews");
    res
      .status(200)
      .json({ success: true, data, message: "Review fetched successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to get reviews" });
  }
});

// post review
router.post("/add/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { title, content, rating } = req.body;
      const userData = await User.findOne({ _id: userId }, "username");
      const data = await Product.updateOne(
        { _id: productId },
        {
          $push: {
            reviews: { username: userData.username, title, content, rating },
          },
        }
      );
      res.status(201).json({
        success: true,
        data,
        userData,
        message: "Review added successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error, success: false, message: "Failed to post reviews" });
    }
  });
  

module.exports = router;
