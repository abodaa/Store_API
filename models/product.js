const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide product name"],
    trim: true,
    maxLength: [40, "Max title length should not exceed 40 Chars"],
  },
  price: {
    type: Number,
    required: [true, "You must provide product Price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: String,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

const Model = mongoose.model("Products", productSchema);

module.exports = Model;
