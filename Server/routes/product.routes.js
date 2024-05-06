const express = require("express");
const { Product } = require("../models/product.model");
const jwt = require("jsonwebtoken");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    const getAllProducts = await Product.find({});
    res.status(200).json({
      data: getAllProducts,
      isAdmin: decoded.isAdmin,
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

productRouter.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.productId,
    });
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res
        .status(200)
        .json({ deletedProduct, message: "Product has been deleted" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = productRouter;
