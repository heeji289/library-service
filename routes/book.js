const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const BookController = require("../controller/book");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/book/:id", BookController.getBookDetail);

router.get("/record/:id", isLoggedIn, BookController.getRecordsByUserId);

router.get("/return/:userId", BookController.getBorrowedBookByUserId);

router.post("/borrow/:id", BookController.borrowByBookId);

router.post("/return/:id", BookController.returnByBookId);

module.exports = router;
