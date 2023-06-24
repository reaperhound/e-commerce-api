const express = require("express");
const User = require("../models/User");
const Product = require("../models/Products");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const data = await User.find({}).populate("cart");
    const productsOwned = await Product.find({ owner: data._id });
    data.productsOwned = productsOwned;
    res.status(200).json({ success: "true", data });
  } catch (error) {
    res
      .status(500)
      .json({ error, success: false, message: "Failed to get users" });
  }
});

// get one user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User not in database" });
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error, message: "Failed to get user" });
  }
});

//  update user
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patchData = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not in database" });
    }

    const data = await User.updateOne({ _id: id }, { $set: { ...patchData } });

    res
      .status(201)
      .json({ success: true, data, message: "Updated sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, error, message: "Update failed" });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not in database" });
    }

    const data = await User.deleteOne({ _id: id });
    const productDelete = await Product.deleteMany({owner: user._id});
    res
      .status(201)
      .json({ success: true, data, productDelete,  message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error, message: "Delete failed" });
  }
});

module.exports = router;
