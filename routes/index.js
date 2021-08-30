const express = require("express");
const router = express.Router();

const bookController = require("../controller/book");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/search", bookController.search);

router.get("/", bookController.getBookList);

module.exports = router;
