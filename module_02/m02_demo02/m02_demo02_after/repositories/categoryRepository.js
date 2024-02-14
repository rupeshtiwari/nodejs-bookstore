class CategoryRepository {
  constructor() {
    this.categories = [];
  }

  add(category) {
    this.categories.push(category);
  }

  findByGenre(genre) {
    return this.categories.find((category) => category.genre === genre);
  }
}

module.exports = CategoryRepository;
