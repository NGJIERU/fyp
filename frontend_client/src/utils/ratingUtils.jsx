export const getStarValue = (starText) => {
    const map = {
      'One': 1,
      'Two': 2,
      'Three': 3,
      'Four': 4,
      'Five': 5,
    };
    const parts = starText.split(' ');
    return map[parts[1]] || 0;
  };
  