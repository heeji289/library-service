const express = require("express");
const router = express.Router();

const RatingController = require("../controller/rating");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post("/:id", RatingController.createRating);

router.delete("/:id", RatingController.deleteRating);

router.put("/:id", RatingController.updateRating);

module.exports = router;
