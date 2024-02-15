// inventoryService.js (Legacy Code Example)

function addBook(books, categories, isbn, title, author, price, stock, genre) {
  // Duplicate and scattered business logic for validation
  if (stock < 0 || price < 0) {
    console.error('Stock and price must be positive.');
    return;
  }

  let category = categories.find((c) => c.genre === genre);
  if (!category) {
    category = { genre, books: [] };
    categories.push(category);
  }

  // Direct manipulation of the category's book list without any encapsulation
  const book = { isbn, title, author, price, stock, genre };
  category.books.push(book);
  books.push(book); // Duplicate addition for global search
}














function updateBookPrice(books, isbn, newPrice) {
  // Scattered business rule for price validation
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
  // Scattered business rule for stock validation
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

module.exports = { addBook, updateBookPrice, updateBookStock };
