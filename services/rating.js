const Rating = require("../models/rating");

module.exports = class RatingService {
  static async findByBookId(id) {
    return Rating.findAll({
      where: { BookId: id },
      order: [["id", "DESC"]],
    });
  }

  static async createRating(rating) {
    return Rating.create(rating);
  }

  static async deleteRating(UserId, BookId) {
    return Rating.destroy({
      where: { UserId, BookId },
    });
  }

  static async updateRating(UserId, BookId, comment) {
    return Rating.update({ comment }, { where: { UserId, BookId } });
  }
};
