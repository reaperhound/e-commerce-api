const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [{
        username: String,
        title: String,
        content: String,
    }],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  cartCount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// productSchema.plugin(require('mongoose-autopopulate'))
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
