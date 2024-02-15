const { checkStock, updateStock, getBookDetails } = require('./bookInventory');
let orders = [];

function createOrder(customerId, bookId, quantity) {
  // Guard clause for insufficient stock
  if (!checkStock(bookId, quantity)) {
    return {
      success: false,
      message: 'Book unavailable or insufficient stock',
    };
  }

  const bookDetails = getBookDetails(bookId);
  // Guard clause for missing book details
  if (!bookDetails) {
    return { success: false, message: 'Book details not found' };
  }

  // Proceed with order creation
  updateStock(bookId, quantity);
  
  const totalPrice = bookDetails.price * quantity;
  const orderId = `ORD-${Math.random().toString(16).slice(2)}`;

  orders.push({
    orderId,
    customerId,
    bookId,
    quantity,
    price: totalPrice,
    status: 'Confirmed',
  });

  // Include totalPrice in the successful return object
  return {
    success: true,
    orderId,
    status: 'Confirmed',
    totalPrice,
  };
}

module.exports = { createOrder, orders }; // Export orders for testing or other uses
