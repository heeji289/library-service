const Book = require("../models/book");

module.exports = class BookService {
  static async searchBooks(condition) {
    return Book.findAll(condition);
  }

  static async findBooks(offset, limit, order) {
    return Book.findAll({ offset, limit, order });
  }

  static async findByBookId(id) {
    return Book.findOne({ where: { id } });
  }

  static async updateStockOfBook(stock, id) {
    return Book.update({ stock }, { where: { id } });
  }

  static async updateRatingOfBook(avg_rating, id) {
    return Book.update({ avg_rating }, { where: { id } });
  }
};
