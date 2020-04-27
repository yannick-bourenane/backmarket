require("./config/mongo"); // database connection setup
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var cors = require("cors");
const secret = "mysecretsshhh";
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");
const userRouter = require("./routes/Users.js");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials:true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);


app.get("/", function (req, res) {
  res.sendStatus(200);
});
app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
