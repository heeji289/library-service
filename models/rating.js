const Sequelize = require("sequelize");

module.exports = class Rating extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Rating",
        tableName: "ratings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Record.belongsTo(db.User);
    db.Record.belongsTo(db.Book);
  }
};
