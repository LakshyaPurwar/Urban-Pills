const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  store_name: String,
  medicines: [String],
  // Other fields in your store_stock collection
});

module.exports = mongoose.model('Stock', stockSchema, 'store_stock');