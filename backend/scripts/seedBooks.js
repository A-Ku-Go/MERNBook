const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
  {
    image: 'https://covers.openlibrary.org/b/id/8231857-L.jpg',
    name: 'Ramayana',
    author: 'Valmiki',
    publisher: 'Penguin Classics',
    year: 2016,
    price: 399
  },
  {
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    name: 'Nineteen Eighty-Four',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    year: 1949,
    price: 299
  },
  {
    image: 'https://covers.openlibrary.org/b/id/10523338-L.jpg',
    name: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Penguin Random House',
    year: 2018,
    price: 350
  },
  {
    image: 'https://covers.openlibrary.org/b/id/10523339-L.jpg',
    name: 'Psychology of Money',
    author: 'Morgan Housel',
    publisher: 'Harriman House',
    year: 2020,
    price: 320
  },
  {
    image: 'https://covers.openlibrary.org/b/id/8231858-L.jpg',
    name: 'Bhagavad Gita',
    author: 'Vyasa',
    publisher: 'Penguin Classics',
    year: 2014,
    price: 275
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Books seeded!');
  mongoose.disconnect();
}

seed();