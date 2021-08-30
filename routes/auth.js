const express = require("express");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const errorMessage = require("../error_message");
const UserController = require("../controller/user.js");

const router = express.Router();

// 회원가입 유효성 검사
const validateJoin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage(errorMessage.INVALID_EMAIL)
    .notEmpty()
    .withMessage(errorMessage.REQUIRED_INPUT_DATA),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(errorMessage.REQUIRED_INPUT_DATA)
    .matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/)
    .withMessage(errorMessage.INVALID_USERNAME),
  body("password")
    .notEmpty()
    .withMessage(errorMessage.REQUIRED_INPUT_DATA)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
    .withMessage(errorMessage.INVALID_PASSWORD),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.render("auth/join", { errorMessage: errors.array()[0].msg });
  },
];

// 로그인 유효성 검사
const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage(errorMessage.INVALID_EMAIL)
    .notEmpty()
    .withMessage(errorMessage.REQUIRED_INPUT_DATA),
  body("password")
    .notEmpty()
    .withMessage(errorMessage.REQUIRED_INPUT_DATA)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
    .withMessage(errorMessage.INVALID_PASSWORD),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.render("auth/login", { errorMessage: errors.array()[0].msg });
  },
];

router.post("/join", isNotLoggedIn, validateJoin, UserController.join);

router.post("/login", isNotLoggedIn, validateLogin, UserController.login);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", isLoggedIn, UserController.logout);

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login", { title: "login" });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("auth/join", { title: "join" });
});

module.exports = router;
