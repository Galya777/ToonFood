// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  restaurant: { type: String, default: '' },
  categories: { type: [String], default: [] }  // Множество категории
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
