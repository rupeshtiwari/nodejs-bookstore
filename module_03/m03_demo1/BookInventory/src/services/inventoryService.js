const Stock = require('../models/stockModel');

class InventoryService {
  async checkStock(bookId) {
    const stock = await Stock.findOne({ where: { bookId } });
    return stock ? stock.quantity : 0;
  }

  async updateStock(bookId, quantity) {
    const stock = await Stock.findOne({ where: { bookId } });
    if (stock) {
      stock.quantity += quantity;
      await stock.save();
    } else {
      // Handle case where book does not exist
    }
  }
}

module.exports = new InventoryService();
