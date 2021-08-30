"use strict";
const Sequelize = require("sequelize");
const User = require("./user.js");
const Book = require("./book.js");
const Record = require("./record.js");
const Rating = require("./rating.js");

const env = process.env.NODE_ENV || "development";
const config = require("../db.config.json")[env];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Book = Book;
db.Record = Record;
db.Rating = Rating;

User.init(sequelize);
Book.init(sequelize);
Record.init(sequelize);
Rating.init(sequelize);

User.associate(db);
Book.associate(db);
Record.associate(db);
Rating.associate(db);

module.exports = db;
