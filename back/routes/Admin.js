const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Delivery = require("../models/Delivery");
const express = require("express");
const router = new express.Router();

/* router.get("/admin", (req, res, next) => {
  User.findById(req.user_id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch(next());
}); */

router.get("/admin/products", (req, res, err) => {
  Product.find()
    .limit(20)
    .then((products) => res.status(200).json(products))
    .catch(err);
});

module.exports = router;
