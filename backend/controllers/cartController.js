const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Get current user's cart
exports.getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.book');
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  res.json(cart);
};

// Add book to cart
exports.addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const itemIndex = cart.items.findIndex(item => item.book.equals(bookId));
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity || 1;
  } else {
    cart.items.push({ book: bookId, quantity: quantity || 1 });
  }
  await cart.save();
  res.json(cart);
};

// Remove book from cart
exports.removeFromCart = async (req, res) => {
  const { bookId } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => !item.book.equals(bookId));
  await cart.save();
  res.json(cart);
};

// Clear cart
exports.clearCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = [];
  await cart.save();
  res.json(cart);
};