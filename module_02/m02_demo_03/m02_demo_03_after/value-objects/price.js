class Price {
  constructor(amount) {
    if (amount < 0) throw new Error('Price must be positive.');
    this.amount = amount;
  }

  applyDiscount(discountPercentage) {
    const discountAmount = this.amount * (discountPercentage / 100);
    const newPrice = this.amount - discountAmount;
    if (newPrice < 0) throw new Error('Price after discount must be positive.');
    return new Price(newPrice);
  }
}
module.exports = Price;
