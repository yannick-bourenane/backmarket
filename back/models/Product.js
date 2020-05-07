const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  DeviceName: { type: String, required: true, unique: true },
  Brand: { type: String, required: true },
  technology: String,
  dimensions: String,
  weight: String,
  sim: String,
  type: String,
  size: String,
  resolution: String,
  card_slot: String,
  _3_5mm_jack_: String,
  bluetooth: String,
  gps: String,
  usb: String,
  colors: String,
  cpu: String,
  internal: String,
  os: String,
  primary_: String,
  secondary: String,
  features: String,
  nfc: String,
  camera: String,
  battery_life: String,
  pricePhone: {
    type: Number,
    default: 0,
    required: true,
  },
  image: { type: [String], default: ["defaultPhone.png"] },
  reviews: [
    {
      rate: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 50,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  sale: { type: Number, default: 0, min: 0, max: 95 },
});
module.exports = mongoose.model("Product", ProductSchema);
