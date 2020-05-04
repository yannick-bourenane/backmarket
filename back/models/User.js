const mongoose = require("mongoose");
const moment = require("moment");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:{type: String, required : true, default:"/yannick-prison.png"},
  role: { type: String, required: true, default: "user" },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  date_register: { type: String, default: moment().format(), required: true },
  date_last_login: { type: String, default: moment().format(), required: true },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
