const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Place order from cart
exports.placeOrder = async (req, res) => {
  const { coupon } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const orderItems = cart.items.map(item => ({
    book: item.book._id,
    quantity: item.quantity,
    price: item.book.price
  }));

  // Calculate total price
  const total = cart.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  // Handle coupon/discount
  let discount = 0;
  if (coupon === "10percent") {
    discount = 10;
  } else if (coupon === "SUMMER25") {
    discount = 25;
  }
  // Calculate final price after discount
  const finalTotal = Math.round(total * (100 - discount) / 100);

  const order = new Order({
    user: req.user._id,
    items: orderItems,
    orderDate: new Date(),
    deliveryDate: null, // Set when delivered
    discount, // percentage
    total,
    finalTotal
  });
  await order.save();

  // Clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// Get current user's orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.book');
  res.json(orders);
};
