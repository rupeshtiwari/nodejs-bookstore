class ISBN {
  constructor(value) {
    if (!/^97[89]-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(value)) {
      throw new Error('Invalid ISBN format.');
    }
    this.value = value;
  }
}
module.exports = ISBN;
