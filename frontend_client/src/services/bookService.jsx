export const fetchBooksByCategory = async (category) => {
    const response = await fetch(`http://localhost:8080/api/books?category=${category}`);
    if (!response.ok) throw new Error("Failed to fetch books");
    return await response.json();
  };
  