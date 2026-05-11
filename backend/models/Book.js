const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  image:      { type: String, required: true }, // URL or path to image
  name:       { type: String, required: true },
  author:     { type: String, required: true },
  publisher:  { type: String, required: true },
  year:       { type: Number, required: true },
  price:      { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);