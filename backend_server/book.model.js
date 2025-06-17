const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  product_type: {
    type: String,
    required: true
  },
  price_excl_tax: {
    type: String,
    required: true
  },
  price_incl_tax: {
    type: String,
    required: true
  },
  tax: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  num_reviews: {
    type: String,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema, 'firstcollection');

module.exports = Book;