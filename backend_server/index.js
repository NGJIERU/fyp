const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Book = require('./models/Book');

const corsOptions = {
  origin: ["http://localhost:5174"]
};

app.use(cors(corsOptions));

// Add JSON parsing middleware
app.use(express.json());

app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.set('Cache-Control', 'no-store'); 
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MongoDB Connection
mongoose.connect('mongodb+srv://ngjieru:ngjieru0901@bookscraper.lrjwqhm.mongodb.net/bookdb?retryWrites=true&w=majority&appName=bookscraper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`MongoDB connected at ${new Date().toLocaleString()}`);
  app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

module.exports = db;
