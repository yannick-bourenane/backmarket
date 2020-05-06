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
    cb(null, "IMAGE-" + Date.now() + file.originalname);
  },
});
let upload = multer({ storage: storage }).array("file");

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

// router.post("/admin/products", upload, (req, res, err) => {
  // upload(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //     return res.status(500).json(err);
  //   } else if (err) {
  //     return res.status(500).json(err);
  //   }
  //   return res.status(200).send(req.file);
  // });
//   const product = req.body.values;
//   if (
//     !product.DeviceName ||
//     !product.Brand ||
//     !product.pricePhone ||
//     !product.stock
//   ) {
//     res
//       .status(403)
//       .json({ type: "error", msg: "Fill all the required fields please." });
//   } else {
//     Product.findOne({ DeviceName: product.DeviceName }).then((product) => {
//       if (product) {
//         res.status(403).json({
//           type: "error",
//           msg: "A product with this name already exist.",
//         });
//       } else {
//         console.log(req.body);

//         Product.create(req.body.values)
//           .then((dbRes) =>
//             res.status(200).json({ type: "success", msg: "Product created !" })
//           )
//           .catch((dbErr) => {
//             console.log(dbErr);
//           });
//       }
//     });
//   }
// });

router.get("/admin/users", (req, res, err) => {
  User.find()
    .limit(20)
    .then((user) => res.status(200).json(user))
    .catch(err);
});

module.exports = router;
