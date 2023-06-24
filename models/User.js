const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String || Buffer,
  },
  cart: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", autopopulate: true }],
  },
  productsOwned: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", autopopulate: true }],
  },
});

userSchema.plugin(require('mongoose-autopopulate'))

const User = mongoose.model("User", userSchema);

module.exports = User;
