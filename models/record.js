const Sequelize = require("sequelize");

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        borrow_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        return_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        returned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        book_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        rated: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Record",
        tableName: "records",
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
