const books = require('./bookInventory').books; // Import books from Book Inventory

let orders = []; // Keep orders specific to Order Processing

const createOrder = (req, res) => {
  const { customerId, bookId, quantity } = req.body;
  const book = books.find((book) => book.bookId === bookId);
  if (book && book.stock >= quantity) {
    book.stock -= quantity; // Update stock in the Book Inventory
    const totalPrice = book.price * quantity;
    const orderId = `ORD-${Math.random().toString(16).slice(2)}`;
    orders.push({
      orderId,
      customerId,
      bookId,
      quantity,
      price: totalPrice,
      status: 'Confirmed',
    });
    res.json({
      message: 'Order placed successfully',
      orderId,
      status: 'Confirmed',
    });
  } else {
    res.status(400).json({ message: 'Book unavailable or insufficient stock' });
  }
};

module.exports = { orders, createOrder };
