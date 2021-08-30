const Record = require("../models/record");

module.exports = class RecordService {
  static async findByUserId(id, returned) {
    return Record.findAll({
      where: { UserId: id, returned },
    });
  }

  static async checkRecordReturned(UserId, BookId, returned) {
    return Record.findOne({
      where: { UserId, BookId, returned },
    });
  }

  static async checkRecordRated(UserId, BookId, rated) {
    return Record.findOne({
      where: { UserId, BookId, rated },
    });
  }

  static async createRecord(record) {
    return Record.create(record);
  }

  static async updateRecord(UserId, BookId, return_date, returned) {
    return Record.update(
      { return_date, returned },
      { where: { UserId, BookId } }
    );
  }

  static async updateRecordRated(UserId, BookId, rated) {
    return Record.update({ rated }, { where: { UserId, BookId } });
  }
};
