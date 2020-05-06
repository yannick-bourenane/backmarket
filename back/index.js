require("dotenv").config();
require("./config/mongo"); // database connection setup
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");
const userRouter = require("./routes/Users.js");
const adminRouter = require("./routes/Admin.js");
const Product = require("./models/Product");
const User = require("./models/User");

app.use(
  express.urlencoded({
    extended: true,
  })
);
var corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// var fonoapi = require("fonoapi-nodejs");
// fonoapi.token = "d045b6783ccbbaaf96088d427329ebd34c26682c6ee6d65e";

// //get latest devices from apple (limit result to 5)
// fonoapi.getLatest(myCallback, 100, "samsung");

// function myCallback(queryString, data) {
//   Product.create(data)
//     .then((dbRes) => console.log(dbRes))
//     .catch((dbErr) => console.log(dbErr));
// }

// const images = ["sony1.jpg", "sony2.jpg", "sony3.jpg"];

function updateImage() {
  Product.find({}, function (err, items) {
    items.forEach(function (item) {
      Product.update(
        {
          _id: item._id,
          // Brand: "Sony",
        },
        {
          $set: {
            stock: Math.floor(Math.random() * (1000 - 0) + 0),
          },
        }
      )
        .exec()
        .then(function (data) {
          console.log("It works");
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
}
// updateImage();

function createuser() {
  let newUser = {
    email: "toto@gmail.com",
    password: "12345678",
    role: "admin",
    firstname: "Toto",
    lastname: "Dupuis",
    address: "7 rue des tilleuls",
    zipcode: "14123",
    city: "Cormelles-le-Royal",
    country: "France",
  };
  User.create(newUser)
    .then((dbRes) => console.log(dbRes))
    .catch((dbErr) => console.log(dbErr));
}

//createuser();

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(adminRouter);

app.get("/", function (req, res) {
  res.sendStatus(200);
});
app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
