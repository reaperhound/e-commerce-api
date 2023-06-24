const express = require("express");
const Product = require("../models/Products");

const router = express.Router();

// get by category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const data = await Product.find({ category: category });
    res
      .status(200)
      .json({ sucess: true, data, message: "Products fetched succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to fetch products" });
  }
});

// get categories
router.get("/", async (req, res) => {
  try {
    const data = await Product.distinct("category");
    res
      .status(200)
      .json({
        success: true,
        data,
        message: "Categories fetched successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to fetch categories" });
  }
});

module.exports = router;
