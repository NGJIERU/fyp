import React from 'react';
import BookList from './BookList'; 

const App = () => {
  return (
    <div className="App">
      <header className="text-center py-8 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">Books crawled</h1>
        <p className="mt-2">Browse books by category</p>
      </header>

      <BookList />
    </div>
  );
};

export default App;