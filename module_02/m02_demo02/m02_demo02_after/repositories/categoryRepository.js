class CategoryRepository {
  constructor() {
    this.categories = [];
  }

  add(category) {
    this.categories.push(category);
  }

  findByName(name) {
    return this.categories.find((category) => category.name === name);
  }

  // Include methods for managing category-specific operations
}

module.exports = CategoryRepository;
