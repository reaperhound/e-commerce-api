const express = require("express");
const Product = require("../models/Products");
const User = require("../models/User");

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  try {
    const data = await Product.find({});
    res
      .status(201)
      .json({ success: true, data, message: "Products fetched successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to get products" });
  }
});

// get single Product
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const data = await Product.findById(productId);

    res
      .status(200)
      .json({ success: true, data, message: " Product fetched successfully " });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to get product" });
  }
});

// add Products
router.post("/", async (req, res) => {
  try {
    const { owner, title, description, image, category, price } = req.body;

    if (!owner || !title || !description || !image || !category || !price) {
      const missingFields = [];

      if (!owner) {
        missingFields.push("owner");
      }

      if (!title) {
        missingFields.push("title");
      }

      if (!description) {
        missingFields.push("description");
      }

      if (!image) {
        missingFields.push("image");
      }

      if (!category) {
        missingFields.push("category");
      }
      return res._construct(404).json({
        success: false,
        message: `Enter ${missingFields.map((fields) => fields)}`,
      });
    }

    const data = await new Product({
      owner,
      title,
      description,
      image,
      category,
      price
    });
    data.save();

    // Push to user
    const ownerData = await User.updateOne(
      { _id: owner },
      { $push: { productsOwned: data._id } }
    );

    res.status(201).json({
      success: true,
      data,
      updatedUser: ownerData,
      message: "Product added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to add products" });
  }
});

// updateProducts

router.patch("/:productId", async (req, res) => {
  try {
    const updateData = req.body;
    const { productId } = req.params;

    const data = await Product.updateOne({ _id: productId }, { ...updateData });

    res
      .status(200)
      .json({ success: true, data, message: "Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to Update products" });
  }
});

// delete product
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const ownerData = await Product.findById(productId);
    const deleteProduct = await Product.deleteOne({ _id: productId });
    // delete from owner
    const ownerDelete = await User.updateOne(
      { _id: ownerData._id },
      { $pull: { productsOwned: productId } }
    );

    res.status(200).json({
      success: true,
      productDelete: deleteProduct,
      ownnerProductDelete: ownerDelete,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to Delete products" });
  }
});

module.exports = router;
