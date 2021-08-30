const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(128),
          allowNull: false,
          defaultValue: "local",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Record);
    db.Book.hasMany(db.Rating);
  }
};
