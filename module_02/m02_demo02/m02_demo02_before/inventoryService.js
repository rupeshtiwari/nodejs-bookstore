function addBook(books, categories, isbn, title, author, price, stock, genre) {
  if (stock < 0 || price < 0) {
    console.error('Stock and price must be positive.');
    return; // Early return if validation fails
  }

  let category = categories.find((c) => c.genre === genre);
  if (!category) {
    category = { genre, books: [] };
    categories.push(category);
  }

  const book = { isbn, title, author, price, stock, genre };
  category.books.push(book); // Add book to the category
  books.push(book); // Add book to the global list
}

function updateBookPrice(books, isbn, newPrice) {
  if (newPrice < 0) {
    console.error('Price must be positive.');
    return;
  }

  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    book.price = newPrice;
  } else {
    console.error(`Book with ISBN '${isbn}' not found.`);
  }
}

function updateBookStock(books, isbn, newStock) {
  if (newStock < 0) {
    console.error('Stock must be positive.');
    return;
  }

  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    book.stock = newStock;
  } else {
    console.error(`Book with ISBN '${isbn}' not found.`);
  }
}
