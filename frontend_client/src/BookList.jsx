import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Poetry', 'Fiction', 'Business', 'Travel', 'History'];

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8080/api/books?category=${category || ""}`);
        const data = await response.json();
      console.log('First 5 books:', data.slice(0, 5));
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {/* Category Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-medium text-gray-700">Select Category:</label>
        <select
          id="category"
          name="category"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.url} className="border rounded-lg p-4">
              <img src={book.image_url} alt={book.title} className="w-full h-64 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.category}</p>
              <p className="text-gray-800">
                {/* Check if description exists, if not display fallback text */}
                {book.description ? book.description.slice(0, 100) : 'No description available...'}...
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">{book.price_excl_tax}</p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList; 