import React, { useState, useEffect } from 'react';
import { fetchBooksByCategory } from './services/bookService';
import { getStarValue } from './utils/ratingUtils';
import RecommendationPanel from './components/RecommendationPanel';

const categoryRelations = {
  Poetry: 'Fiction',
  Fiction: 'History',
  Business: 'Science',
  Science: 'History',
  History: 'Poetry',
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('Poetry');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [topBooks, setTopBooks] = useState([]);

  const categories = ['Poetry', 'Fiction', 'Business', 'Science', 'History'];

  useEffect(() => {
    fetchData();
    suggestRecommendation();
  }, [category]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchBooksByCategory(category);
      setBooks(data);

      const topRated = data.filter(book => getStarValue(book.stars) >= 4);
      const fallback = [...data].sort((a, b) => parseInt(b.num_reviews) - parseInt(a.num_reviews));
      setTopBooks(topRated.length > 0 ? topRated.slice(0, 3) : fallback.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const suggestRecommendation = () => {
    setRecommendation(categoryRelations[category] || '');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 Book List</h1>

      <div className="mb-4 space-x-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${cat === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <li key={book.title} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="italic">{book.product_type}</p>
              <p>Rating: {book.stars.replace('star-rating ', '')}</p>
              <p>Reviews: {book.num_reviews}</p>
              <p className="text-sm mt-1">{book.description?.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}

      <RecommendationPanel
        category={category}
        recommendation={recommendation}
        topBooks={topBooks}
      />
    </div>
  );
};

export default BookList;
