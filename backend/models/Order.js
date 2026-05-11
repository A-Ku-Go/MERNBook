const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  discount: { type: Number, default: 0 }, // percentage, e.g. 10 for 10%
  total: { type: Number, required: true }, // sum of all item prices before discount
  finalTotal: { type: Number, required: true }, // total after discount
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);