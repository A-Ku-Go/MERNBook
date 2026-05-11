const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

// Add new book
exports.addBook = async (req, res) => {
  const { image, name, author, publisher, year, price } = req.body;
  if (!image || !name || !author || !publisher || !year || !price)
    return res.status(400).json({ message: 'All fields required' });
  const book = new Book({ image, name, author, publisher, year, price });
  await book.save();
  res.status(201).json(book);
};

// Update book
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

// Delete book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted' });
};