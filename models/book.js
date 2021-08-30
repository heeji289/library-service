const Sequelize = require("sequelize");

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        book_name: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        publisher: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        publication_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        pages: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isbn: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        link: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        stock: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        avg_rating: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Book",
        tableName: "books",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Book.hasMany(db.Record);
    db.Book.hasMany(db.Rating);
  }
};
