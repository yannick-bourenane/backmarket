const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();
const secret = process.env.SECRET_SESSION;
const withAuth = require("../middleware");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/images/avatars",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
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

router.post("/api/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email, _id: user._id };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

router.post("/api/createuser", function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const {
      email,
      password,
      firstname,
      lastname,
      address,
      zipcode,
      city,
      country,
    } = req.body;

    let avatar = null;
    if (req.files.length) avatar = req.files[0].filename;

    if (!avatar) {
      res.status(400).json({ message: "Provide an avatar" });
      return;
    }

    if (!email || !password) {
      res.status(400).json({ message: "Provide username and password" });
      return;
    }
    if (password.length < 7) {
      res.status(400).json({
        message:
          "Please make your password at least 8 characters long for security purposes.",
      });
      return;
    }

    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "email check went bad." });
        return;
      }

      if (foundUser) {
        res.status(400).json({ message: "email taken. Choose another one." });
        return;
      }

      const aNewUser = new User({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        address: address,
        zipcode: zipcode,
        city: city,
        country: country,
        avatar: avatar,
      });

      aNewUser.save((err) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        }
        res.sendStatus(200);
      });
    });
  });
});

router.get("/admin/user/:id", (req, res, err) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
});

router.post("/admin/user/:id", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    let avatar = null;
    if (req.files.length) avatar = req.files[0].filename;
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      zipcode,
      city,
      country,
    } = req.body;
    
    const updatedUser = ({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      zipcode: zipcode,
      city: city,
      country: country,
      avatar: avatar,
    });
    console.log(updatedUser + "je suis le user update");
    User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
      .then((user) => {
        res.status(200).json({type: "success", msg: "User updated !" });
      })
      .catch(next);
  });
});

router.delete("/admin/users/delete/:id", (req, res, err) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) =>
      res.status(200).json({ type: "success", msg: "User deleted !" })
    )
    .catch((err) => console.log(err));
});

// router.post("/admin", withAuth, (req, res, next) => {
//   const { text } = req.body.user;
//   User.findByIdAndUpdate(req.user_id, { text: text })
//     .then((updatedUser) => {
//       res.status(200).send(updatedUser);
//     })
//     .catch(next);
// });

// router.get("/admin", withAuth, (req, res, next) => {
//   User.findById(req.user_id)
//     .then((dbRes) => res.status(200).json(dbRes))
//     .catch(next);
// });

module.exports = router;
