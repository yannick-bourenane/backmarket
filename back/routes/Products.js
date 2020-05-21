const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

router.get("/products/", (req, res, err) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => console.log(err));
});

router.get("/products/highlight", (req, res, err) => {
  Product.find({ highlight: true })
    .then((productsHigh) => res.status(200).json(productsHigh))
    .catch((err) => console.log(err));
});

module.exports = router;
