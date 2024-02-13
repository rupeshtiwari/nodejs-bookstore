class InventoryService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  // Simulate interaction with an external system that introduces a delay
  async sellBook(isbn, quantity) {
    const book = await this.bookRepository.findBookByIsbn(isbn);
    if (!book) throw new Error('Book not found');

    // Simulate delay to mimic real-world asynchronous behavior and potential race conditions
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));

    try {
      book.updateStock(-quantity); // Assuming updateStock method correctly handles stock reduction
      await this.bookRepository.save(book); // Simulate async save operation
      return { success: true, finalPrice: book.getFinalPrice() };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = InventoryService;
