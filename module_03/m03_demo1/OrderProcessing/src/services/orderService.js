const Order = require('../models/orderModel');
const bookService = require('./bookService'); // Placeholder for actual book service import

exports.createOrder = async ({customerId, items}) => {
  let totalAmount = 0;
  for (const item of items) {
    const bookDetails = await bookService.getBookDetails(item.bookId);
    totalAmount += bookDetails.price * item.quantity;
  }

  const order = new Order({ customerId,items, totalAmount });

  // console.log('Order before save:', order); // Log the order before saving

  const savedOrder = await order.save(); // Save the order and capture the saved object

  // console.log('Order after save:', order); // Log the order after saving


  return savedOrder;
};
