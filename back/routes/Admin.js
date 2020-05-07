const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Delivery = require("../models/Delivery");
const express = require("express");
const router = new express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/phone",
  filename: function (req, file, cb) {
    cb(null, "phone-" + Date.now() + file.originalname);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.includes("jpeg") &&
      !file.mimetype.includes("jpg") &&
      !file.mimetype.includes("png")
    ) {
      return cb(null, false, new Error("Only images are allowed"));
    }
    cb(null, true);
  },
}).array("file");

/* router.get("/admin", (req, res, next) => {
  User.findById(req.user_id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch(next());
}); */

router.get("/admin/products", (req, res, err) => {
  //console.log(req.params.pageNb);
  //const ProductPerPage = 20;
  Product.find()
    //.skip(ProductPerPage * req.params.pageNb)
    //.limit(ProductPerPage)
    .sort({ _id: -1 })
    .then((products) => res.status(200).json(products))
    .catch(err);
});

router.get("/admin/products/:id", (req, res, err) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => console.log(err));
});

router.post("/admin/products", (req, res, err) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const productInfo = req.body;
    if (
      !productInfo.DeviceName ||
      !productInfo.Brand ||
      !productInfo.pricePhone ||
      !productInfo.stock
    ) {
      res
        .status(403)
        .json({ type: "error", msg: "Fill all the required fields please." });
    } else {
      Product.findOne({ DeviceName: productInfo.DeviceName }).then(
        (product) => {
          if (product) {
            res.status(403).json({
              type: "error",
              msg: "A product with this name already exist.",
            });
          } else {
            req.files.length
              ? (productInfo.image = req.files.map((file) => file.filename))
              : delete productInfo.image;
            Product.create(productInfo)
              .then((dbRes) =>
                res
                  .status(200)
                  .json({ type: "success", msg: "Product created !" })
              )
              .catch((dbErr) => {
                console.log(dbErr);
              });
          }
        }
      );
    }
  });
});

router.patch("/admin/products/:id", (req, res, err) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const productInfo = req.body;
    if (
      !productInfo.DeviceName ||
      !productInfo.Brand ||
      !productInfo.pricePhone ||
      !productInfo.stock
    ) {
      res
        .status(403)
        .json({ type: "error", msg: "Fill all the required fields please." });
    }
    req.files.length
      ? (productInfo.image = req.files.map((file) => file.filename))
      : (productInfo.image = "defaultPhone.png");
    Product.findByIdAndUpdate(req.params.id, productInfo, {
      new: true,
    })
      .then((product) =>
        res.status(200).json({ type: "success", msg: "Product updated !" })
      )
      .catch((err) => console.log(err));
  });
});

router.delete("/admin/products/delete/:id", (req, res, err) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) =>
      res.status(200).json({ type: "success", msg: "Product deleted !" })
    )
    .catch((err) => console.log(err));
});

router.get("/admin/users", (req, res, err) => {
  User.find()
    .limit(20)
    .then((user) => res.status(200).json(user))
    .catch(err);
});

module.exports = router;
