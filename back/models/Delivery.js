const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  price_free: {
    type: Number,
    default: 150,
  },
  price_regular: { type: Number, required: true, default: 7 },
  price_express: Number,
});

module.exports = mongoose.model("Delivery", deliverySchema);
