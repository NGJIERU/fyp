import React from 'react';
import { getStarValue } from '../utils/ratingUtils';

const RecommendationPanel = ({ category, recommendation, topBooks }) => (
  <div className="mt-8 p-4 border-t">
    <h2 className="text-xl font-bold mb-2">🧠 System Recommendation</h2>
    {recommendation && (
      <p>
        Since you're reading <strong>{category}</strong> books, you may also like books from{' '}
        <span className="text-blue-600 font-semibold">{recommendation}</span>.
      </p>
    )}

    <h3 className="text-lg font-semibold mt-4">🔥 Top Rated Books in {category}</h3>
    <ul className="list-disc list-inside">
      {topBooks.map((book) => (
        <li key={book.title}>
          {book.title} — ⭐ {getStarValue(book.stars)} ({book.num_reviews} reviews)
        </li>
      ))}
    </ul>
  </div>
);

export default RecommendationPanel;
