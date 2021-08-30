const sequelize = require("sequelize");
const Op = sequelize.Op;

const BookService = require("../services/book");
const RatingService = require("../services/rating");
const RecordService = require("../services/record");

module.exports = class BookController {
  // 책 목록을 출력 (정렬기준, 페이지에 맞게)
  static async getBookList(req, res, next) {
    try {
      if (!req.user) {
        res.redirect("/auth/login");
      } else {
        // 페이지에 맞게 offset을 결정
        let pageNum = req.query.page ? req.query.page : 1;
        let offset = pageNum > 1 ? 9 * (pageNum - 1) : 0;

        // 정렬순서를 결정
        let pageOrder = req.query.order ? req.query.order : "id";
        let books =
          pageOrder === "id"
            ? await BookService.findBooks(offset, 9, [[pageOrder, "ASC"]])
            : await BookService.findBooks(offset, 9, [[pageOrder, "DESC"]]);

        return res.render("main", { title: "main", books, pageOrder });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // 책 상세 페이지 출력
  static async getBookDetail(req, res, next) {
    const id = req.params.id;
    try {
      const book = await BookService.findByBookId(id);
      const ratings = await RatingService.findByBookId(id);

      res.render("books/detail", {
        title: "book_detail",
        book,
        ratings,
        numOfRatings: ratings.length,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // 유저의 대여기록을 출력
  static async getRecordsByUserId(req, res, next) {
    const id = req.params.id;
    const records = await RecordService.findByUserId(id, true);

    try {
      if (records) {
        res.render("record", { records });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // 유저가 빌린 책 목록을 출력
  static async getBorrowedBookByUserId(req, res) {
    const userId = req.params.userId;
    const records = await RecordService.findByUserId(userId, false);
    res.render("books/return", { records });
  }

  // 책 검색 기능 (제목, 출판사, 작가)
  static async search(req, res, next) {
    const searchParam = req.query.search;
    const books = await BookService.searchBooks({
      where: {
        [Op.or]: [
          { book_name: { [Op.like]: "%" + searchParam + "%" } },
          { publisher: { [Op.like]: "%" + searchParam + "%" } },
          { author: { [Op.like]: "%" + searchParam + "%" } },
        ],
      },
    });
    return res.render("books/search", {
      title: "search",
      books: books,
      searchParam,
    });
  }

  // 대여하기 기능
  static async borrowByBookId(req, res, next) {
    const id = req.params.id;
    const user_id = req.user.id;
    try {
      const isBorrowed = await RecordService.checkRecordReturned(
        user_id,
        id,
        false
      );

      // 이미 대여 중인 경우 예외처리
      if (isBorrowed) {
        return res.json({ message: "already" });
      }

      const book = await BookService.findByBookId(id);
      const curStock = book.stock;

      // 책 재고가 없으면 예외처리
      if (curStock <= 0) {
        return res.json({ message: "reject" });
      } else {
        // 책 재고를 1 줄이고 대여기록 생성
        await BookService.updateStockOfBook(curStock - 1, id);

        await RecordService.createRecord({
          borrow_date: Date.now(),
          return_date: Date.now(),
          returned: false,
          UserId: user_id,
          BookId: id,
          book_name: book.book_name,
        });
        return res.json({ redirect: "/" });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // 반납하기
  static async returnByBookId(req, res, next) {
    const book_id = req.params.id;
    const user_id = req.user.id;

    try {
      const isBorrowed = await RecordService.checkRecordReturned(
        user_id,
        book_id,
        false
      );

      // 대여하고 있지 않은 경우 예외 처리
      if (!isBorrowed) {
        return res.send("대여중이지 않음");
      } else {
        const book = await BookService.findByBookId(book_id);
        const curStock = book.stock;

        // 책 재고를 1 증가시키고 대여기록 업데이트 (returned = true로)
        await BookService.updateStockOfBook(curStock + 1, book_id);
        await RecordService.updateRecord(user_id, book_id, Date.now(), true);
        return res.json({ redirect: `/return/${user_id}` });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
