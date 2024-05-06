const express = require("express");
const { Product } = require("../models/product.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const getAllProducts = await Product.find({});
    res.status(200).json({
      data: getAllProducts,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

productRouter.post("/addProduct", async (req, res) => {
  try {
    const addProductResponse = await Product.create(req.body);
    res.status(201).json({
      message: "New product added to database",
      data: addProductResponse,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

productRouter.put("/:productId/edit", async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Product details updated",
      response,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = productRouter;
