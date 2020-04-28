const mongoose = require("mongoose");
const moment = require("moment");

const transactionSchema = new mongoose.Schema({
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      price: { type: Number, required: true },
    },
  ],
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  purchase_date: { type: String, default: moment().format(), required: true },
  delivery_address: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
