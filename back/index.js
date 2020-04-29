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

// var fonoapi = require("fonoapi-nodejs");
// fonoapi.token = "d045b6783ccbbaaf96088d427329ebd34c26682c6ee6d65e";

// get latest devices from apple (limit result to 5)
//  fonoapi.getLatest(myCallback, 100, "sony");

// function myCallback(queryString, data) {
//   Product.create(data)
//     .then((dbRes) => console.log(dbRes))
//     .catch((dbErr) => console.log(dbErr));
// }

var corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
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
