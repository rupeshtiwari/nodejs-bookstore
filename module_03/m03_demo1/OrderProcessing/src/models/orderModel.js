const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    items: [
      {
        bookId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, default: 'PLACED' },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
