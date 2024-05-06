const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    discountPercentage: Number,
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
