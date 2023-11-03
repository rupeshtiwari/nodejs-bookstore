class Price {
  constructor(amount) {
    if (amount <= 0) {
      throw new Error('Price must be positive');
    }
    this.amount = amount;
  }

  add(otherPrice) {
    return new Price(this.amount + otherPrice.amount);
  }

  subtract(otherPrice) {
    return new Price(this.amount - otherPrice.amount);
  }

  equals(otherPrice) {
    return this.amount === otherPrice.amount;
  }
}
