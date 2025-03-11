// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   stock: { type: Number, required: true, default: 0 },
// });

// module.exports = mongoose.model('Product', productSchema);
// const mongoose = require('mongoose');

// const Products = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   Category: {
//     type: String,
//     required: true,
//   },
// });
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
